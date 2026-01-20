import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');
const OUTPUT_DIR = '/Users/nl/projects/church_app/lib/data/models/generated';

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

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
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

function jsonTypeToDartType(prop: PropertySchema): string {
  const baseType = getBaseType(prop);
  const nullable = isNullable(prop);
  
  let dartType: string;
  switch (baseType) {
    case 'string':
      if (prop.format === 'date-time') {
        dartType = 'DateTime';
      } else {
        dartType = 'String';
      }
      break;
    case 'number':
      dartType = 'double';
      break;
    case 'integer':
      dartType = 'int';
      break;
    case 'boolean':
      dartType = 'bool';
      break;
    default:
      dartType = 'dynamic';
  }
  
  return nullable ? `${dartType}?` : dartType;
}

function generateFromJsonExpression(fieldName: string, prop: PropertySchema): string {
  const baseType = getBaseType(prop);
  const nullable = isNullable(prop);
  
  if (prop.format === 'date-time') {
    if (nullable) {
      return `json['${fieldName}'] != null ? DateTime.parse(json['${fieldName}'] as String) : null`;
    }
    return `DateTime.parse(json['${fieldName}'] as String)`;
  }
  
  switch (baseType) {
    case 'string':
      return nullable ? `json['${fieldName}'] as String?` : `json['${fieldName}'] as String`;
    case 'number':
      if (nullable) {
        return `(json['${fieldName}'] as num?)?.toDouble()`;
      }
      return `(json['${fieldName}'] as num).toDouble()`;
    case 'integer':
      return nullable ? `json['${fieldName}'] as int?` : `json['${fieldName}'] as int`;
    case 'boolean':
      return nullable ? `json['${fieldName}'] as bool?` : `json['${fieldName}'] as bool`;
    default:
      return `json['${fieldName}']`;
  }
}

function generateToJsonExpression(fieldName: string, prop: PropertySchema): string {
  if (prop.format === 'date-time') {
    const nullable = isNullable(prop);
    if (nullable) {
      return `${fieldName}?.toIso8601String()`;
    }
    return `${fieldName}.toIso8601String()`;
  }
  return fieldName;
}

function generateDartClass(schema: JsonSchema, schemaFileName: string): string {
  const className = schema.title;
  const properties = schema.properties;
  const required = schema.required || [];
  
  const fields: string[] = [];
  const constructorParams: string[] = [];
  const fromJsonLines: string[] = [];
  const toJsonLines: string[] = [];
  
  for (const [fieldName, prop] of Object.entries(properties)) {
    const dartType = jsonTypeToDartType(prop);
    const isRequired = required.includes(fieldName);
    const nullable = isNullable(prop) || !isRequired;
    
    const finalType = nullable && !dartType.endsWith('?') ? `${dartType}?` : dartType;
    
    fields.push(`  final ${finalType} ${fieldName};`);
    
    if (nullable && !dartType.endsWith('?')) {
      constructorParams.push(`    this.${fieldName},`);
    } else if (dartType.endsWith('?')) {
      constructorParams.push(`    this.${fieldName},`);
    } else {
      constructorParams.push(`    required this.${fieldName},`);
    }
    
    fromJsonLines.push(`      ${fieldName}: ${generateFromJsonExpression(fieldName, prop)},`);
    toJsonLines.push(`      '${fieldName}': ${generateToJsonExpression(fieldName, prop)},`);
  }
  
  return `// This file was automatically generated from ${schemaFileName}
// DO NOT MODIFY IT BY HAND. Run 'npm run generate:dart' to regenerate.

class ${className} {
${fields.join('\n')}

  const ${className}({
${constructorParams.join('\n')}
  });

  factory ${className}.fromJson(Map<String, dynamic> json) {
    return ${className}(
${fromJsonLines.join('\n')}
    );
  }

  Map<String, dynamic> toJson() {
    return {
${toJsonLines.join('\n')}
    };
  }

  ${className} copyWith({
${Object.entries(properties).map(([name, prop]) => {
  const dartType = jsonTypeToDartType(prop);
  const baseType = dartType.replace('?', '');
  return `    ${baseType}? ${name},`;
}).join('\n')}
  }) {
    return ${className}(
${Object.keys(properties).map(name => `      ${name}: ${name} ?? this.${name},`).join('\n')}
    );
  }

  @override
  String toString() {
    return '${className}(${Object.keys(properties).map(name => `${name}: \$${name}`).join(', ')})';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is ${className} &&
${Object.keys(properties).map(name => `        other.${name} == ${name}`).join(' &&\n')};
  }

  @override
  int get hashCode {
    return Object.hash(
${Object.keys(properties).map(name => `      ${name},`).join('\n')}
    );
  }
}
`;
}

async function generateDart(): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  const schemaFiles = fs.readdirSync(SCHEMAS_DIR).filter(f => f.endsWith('.schema.json'));
  
  console.log(`Found ${schemaFiles.length} schema files`);

  const generatedFiles: string[] = [];
  const exports: string[] = [];

  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent) as JsonSchema;
    
    const outputFileName = schemaFile.replace('.schema.json', '.dart').replace(/-/g, '_');
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    const dartContent = generateDartClass(schema, schemaFile);

    fs.writeFileSync(outputPath, dartContent);
    console.log(`Generated: ${outputFileName}`);
    generatedFiles.push(outputFileName);
    exports.push(`export '${outputFileName}';`);
  }

  const barrelContent = `// This file was automatically generated.
// DO NOT MODIFY IT BY HAND. Run 'npm run generate:dart' to regenerate.

${exports.join('\n')}
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'generated.dart'), barrelContent);
  console.log('Generated: generated.dart (barrel export)');

  console.log(`\nSuccessfully generated ${generatedFiles.length} Dart files to ${OUTPUT_DIR}`);
}

generateDart().catch((err) => {
  console.error('Error generating Dart classes:', err);
  process.exit(1);
});
