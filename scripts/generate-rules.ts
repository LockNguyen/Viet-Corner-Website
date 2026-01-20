import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');
const OUTPUT_DIR = path.join(__dirname, '..', 'firestore');

interface JsonSchema {
  title: string;
  description?: string;
  properties: Record<string, PropertySchema>;
  required?: string[];
}

interface PropertySchema {
  type: string | string[];
  description?: string;
  format?: string;
}

function toCamelCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function isNullable(prop: PropertySchema): boolean {
  if (Array.isArray(prop.type)) {
    return prop.type.includes('null');
  }
  return false;
}

function getBaseType(prop: PropertySchema): string {
  if (Array.isArray(prop.type)) {
    return prop.type.find(t => t !== 'null') || 'string';
  }
  return prop.type;
}

function jsonTypeToFirestoreCheck(baseType: string): string {
  switch (baseType) {
    case 'string':
      return 'is string';
    case 'number':
    case 'integer':
      return 'is number';
    case 'boolean':
      return 'is bool';
    default:
      return 'is string';
  }
}

function generateFieldValidation(fieldName: string, prop: PropertySchema, isRequired: boolean): string {
  const baseType = getBaseType(prop);
  const nullable = isNullable(prop);
  const typeCheck = jsonTypeToFirestoreCheck(baseType);
  
  if (isRequired && !nullable) {
    return `data.${fieldName} ${typeCheck}`;
  } else {
    return `(!('${fieldName}' in data) || data.${fieldName} == null || data.${fieldName} ${typeCheck})`;
  }
}

function generateValidationFunction(schema: JsonSchema): string {
  const functionName = `isValid${schema.title}`;
  const required = schema.required || [];
  
  const validations: string[] = [];
  
  for (const [fieldName, prop] of Object.entries(schema.properties)) {
    const isRequired = required.includes(fieldName);
    validations.push(generateFieldValidation(fieldName, prop, isRequired));
  }
  
  const requiredFieldChecks = required.map(field => `'${field}' in data`);
  
  return `  // Validates ${schema.title} document structure
  // Generated from ${schema.title.toLowerCase()}.schema.json
  function ${functionName}(data) {
    return ${requiredFieldChecks.length > 0 ? requiredFieldChecks.join(' &&\n           ') + ' &&\n           ' : ''}${validations.join(' &&\n           ')};
  }`;
}

function toFunctionCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function generateHasOnlyFields(schema: JsonSchema): string {
  const functionName = `${toFunctionCamelCase(schema.title)}HasOnlyFields`;
  const fields = Object.keys(schema.properties);
  
  return `  // Checks that ${schema.title} only contains allowed fields
  function ${functionName}(data) {
    return data.keys().hasOnly([${fields.map(f => `'${f}'`).join(', ')}]);
  }`;
}

async function generateRules(): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  const schemaFiles = fs.readdirSync(SCHEMAS_DIR).filter(f => f.endsWith('.schema.json'));
  
  console.log(`Found ${schemaFiles.length} schema files`);

  const validationFunctions: string[] = [];
  const hasOnlyFunctions: string[] = [];
  const schemaNames: string[] = [];

  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent) as JsonSchema;
    
    validationFunctions.push(generateValidationFunction(schema));
    hasOnlyFunctions.push(generateHasOnlyFields(schema));
    schemaNames.push(schema.title);
    console.log(`Processed: ${schemaFile} -> isValid${schema.title}()`);
  }

  const rulesContent = `// This file was automatically generated from JSON schemas
// DO NOT MODIFY IT BY HAND. Run 'npm run generate:rules' to regenerate.
//
// These are helper validation functions to be used in your firestore.rules file.
// Copy the functions you need into your main firestore.rules file.
//
// Usage example in firestore.rules:
//   match /events/{eventId} {
//     allow write: if isValidEvent(request.resource.data) && eventHasOnlyFields(request.resource.data);
//   }

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ============================================
    // VALIDATION HELPER FUNCTIONS
    // ============================================

${validationFunctions.join('\n\n')}

    // ============================================
    // FIELD RESTRICTION FUNCTIONS
    // ============================================

${hasOnlyFunctions.join('\n\n')}

    // ============================================
    // EXAMPLE RULES (customize as needed)
    // ============================================

    // Events collection
    match /events/{eventId} {
      allow read: if true;
      allow create: if request.auth != null && 
                       isValidEvent(request.resource.data) && 
                       eventHasOnlyFields(request.resource.data);
      allow update: if request.auth != null && 
                       isValidEvent(request.resource.data) && 
                       eventHasOnlyFields(request.resource.data);
      allow delete: if request.auth != null;
    }

    // Discipleship collections
    match /discipleshipCourses/{courseId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      isValidDiscipleshipCourse(request.resource.data) && 
                      discipleshipCourseHasOnlyFields(request.resource.data);
    }

    match /discipleshipLocations/{locationId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      isValidDiscipleshipLocation(request.resource.data) && 
                      discipleshipLocationHasOnlyFields(request.resource.data);
    }

    match /discipleshipClasses/{classId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      isValidDiscipleshipClass(request.resource.data) && 
                      discipleshipClassHasOnlyFields(request.resource.data);
    }
  }
}
`;

  const outputPath = path.join(OUTPUT_DIR, 'validation.rules');
  fs.writeFileSync(outputPath, rulesContent);
  console.log(`\nGenerated: ${outputPath}`);

  const readmePath = path.join(OUTPUT_DIR, 'README.md');
  const readmeContent = `# Generated Firestore Rules

This directory contains auto-generated Firestore security rules helper functions.

## Files

- \`validation.rules\` - Contains validation helper functions generated from JSON schemas

## Generated Functions

For each schema, two functions are generated:

### Validation Functions
${schemaNames.map(name => `- \`isValid${name}(data)\` - Validates field types and required fields`).join('\n')}

### Field Restriction Functions  
${schemaNames.map(name => `- \`${toCamelCase(name)}HasOnlyFields(data)\` - Ensures only allowed fields are present`).join('\n')}

## Usage

Copy the functions you need into your main \`firestore.rules\` file:

\`\`\`javascript
match /events/{eventId} {
  allow write: if request.auth != null && 
                  isValidEvent(request.resource.data) && 
                  eventHasOnlyFields(request.resource.data);
}
\`\`\`

## Regenerating

Run \`npm run generate:rules\` to regenerate these files after modifying schemas.
`;

  fs.writeFileSync(readmePath, readmeContent);
  console.log(`Generated: ${readmePath}`);

  console.log(`\nSuccessfully generated Firestore validation rules for ${schemaNames.length} schemas`);
}

generateRules().catch((err) => {
  console.error('Error generating Firestore rules:', err);
  process.exit(1);
});
