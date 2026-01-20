import { compile } from 'json-schema-to-typescript';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'types', 'generated');

async function generateTypes(): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const schemaFiles = fs.readdirSync(SCHEMAS_DIR).filter(f => f.endsWith('.schema.json'));
  
  console.log(`Found ${schemaFiles.length} schema files`);

  const generatedFiles: string[] = [];

  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent);
    
    const typeName = schema.title || schemaFile.replace('.schema.json', '');
    const outputFileName = schemaFile.replace('.schema.json', '.ts');
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    const tsContent = await compile(schema, typeName, {
      bannerComment: `/* eslint-disable */\n/**\n * This file was automatically generated from ${schemaFile}\n * DO NOT MODIFY IT BY HAND. Run 'npm run generate:types' to regenerate.\n */`,
      additionalProperties: false,
      strictIndexSignatures: true,
    });

    fs.writeFileSync(outputPath, tsContent);
    console.log(`Generated: ${outputFileName}`);
    generatedFiles.push(outputFileName);
  }

  const indexContent = generatedFiles
    .map(f => `export * from './${f.replace('.ts', '')}';`)
    .join('\n');
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.ts'),
    `/* eslint-disable */\n/**\n * This file was automatically generated.\n * DO NOT MODIFY IT BY HAND. Run 'npm run generate:types' to regenerate.\n */\n\n${indexContent}\n`
  );
  console.log('Generated: index.ts');

  console.log(`\nSuccessfully generated ${generatedFiles.length} TypeScript files`);
}

generateTypes().catch((err) => {
  console.error('Error generating types:', err);
  process.exit(1);
});
