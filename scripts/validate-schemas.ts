import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');

interface JSONSchema {
  $schema?: string;
  $id?: string;
  title?: string;
  type?: string | string[];
  properties?: Record<string, unknown>;
  required?: string[];
  additionalProperties?: boolean;
  [key: string]: unknown;
}

interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function validateSchema(schemaPath: string, content: string): ValidationResult {
  const fileName = path.basename(schemaPath);
  const result: ValidationResult = {
    file: fileName,
    valid: true,
    errors: [],
    warnings: [],
  };

  let schema: JSONSchema;
  try {
    schema = JSON.parse(content);
  } catch (e) {
    result.valid = false;
    result.errors.push(`Invalid JSON: ${(e as Error).message}`);
    return result;
  }

  if (!schema.$schema) {
    result.warnings.push('Missing $schema declaration');
  } else if (!schema.$schema.includes('json-schema.org')) {
    result.warnings.push(`Unexpected $schema value: ${schema.$schema}`);
  }

  if (!schema.$id) {
    result.warnings.push('Missing $id (recommended for schema identification)');
  }

  if (!schema.title) {
    result.errors.push('Missing required "title" property (needed for code generation)');
    result.valid = false;
  }

  if (schema.type !== 'object') {
    result.errors.push(`Schema type must be "object", got: ${schema.type}`);
    result.valid = false;
  }

  if (!schema.properties || Object.keys(schema.properties).length === 0) {
    result.errors.push('Schema must have at least one property');
    result.valid = false;
  }

  if (schema.additionalProperties !== false) {
    result.warnings.push('Consider setting "additionalProperties": false for strict validation');
  }

  if (schema.properties) {
    const requiredFields = schema.required || [];
    for (const propName of Object.keys(schema.properties)) {
      const prop = schema.properties[propName] as Record<string, unknown>;
      if (!prop.type && !prop.$ref && !prop.oneOf && !prop.anyOf && !prop.allOf) {
        result.errors.push(`Property "${propName}" has no type definition`);
        result.valid = false;
      }
    }

    for (const reqField of requiredFields) {
      if (!schema.properties[reqField]) {
        result.errors.push(`Required field "${reqField}" not found in properties`);
        result.valid = false;
      }
    }
  }

  return result;
}

async function validateAllSchemas(): Promise<boolean> {
  console.log('Validating JSON schemas...\n');

  const schemaFiles = fs.readdirSync(SCHEMAS_DIR).filter(f => f.endsWith('.schema.json'));
  
  if (schemaFiles.length === 0) {
    console.error('ERROR: No schema files found in /schemas directory');
    return false;
  }

  console.log(`Found ${schemaFiles.length} schema files\n`);

  const results: ValidationResult[] = [];
  let allValid = true;

  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
    const content = fs.readFileSync(schemaPath, 'utf-8');
    const result = validateSchema(schemaPath, content);
    results.push(result);

    if (!result.valid) {
      allValid = false;
    }
  }

  for (const result of results) {
    const status = result.valid ? '✓' : '✗';
    const statusColor = result.valid ? '\x1b[32m' : '\x1b[31m';
    console.log(`${statusColor}${status}\x1b[0m ${result.file}`);

    for (const error of result.errors) {
      console.log(`   \x1b[31m✗ ERROR: ${error}\x1b[0m`);
    }

    for (const warning of result.warnings) {
      console.log(`   \x1b[33m⚠ WARNING: ${warning}\x1b[0m`);
    }
  }

  console.log();

  if (allValid) {
    console.log('\x1b[32m✓ All schemas are valid\x1b[0m\n');
  } else {
    console.log('\x1b[31m✗ Schema validation failed\x1b[0m\n');
  }

  return allValid;
}

validateAllSchemas()
  .then((valid) => {
    if (!valid) {
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Error validating schemas:', err);
    process.exit(1);
  });
