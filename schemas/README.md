# JSON Schemas

This directory contains JSON Schema definitions that serve as the single source of truth for data models across the Viet Corner project ecosystem.

## Purpose

Schemas defined here are used to generate:
- **TypeScript interfaces** for the Next.js website (`src/types/generated/`)
- **Dart classes** for the Flutter mobile app (`church_app/lib/data/models/generated/`)
- **Firestore validation rules** for security rules validation

## Schema Files

| File | Description |
|------|-------------|
| `event.schema.json` | Event entity for church calendar/announcements |
| `discipleship-course.schema.json` | Discipleship course definitions |
| `discipleship-location.schema.json` | Location/group where courses are offered |
| `discipleship-class.schema.json` | Scheduled class instances |

## Schema Structure

All schemas follow [JSON Schema Draft 2020-12](https://json-schema.org/specification-links.html#2020-12) specification.

### Conventions

- **Required fields**: Listed in the `required` array
- **Optional nullable fields**: Use `"type": ["string", "null"]` pattern
- **Dates**: Use `"format": "date-time"` for ISO 8601 timestamps
- **IDs**: Always `string` type (Firestore document IDs)

## Generation Workflow

### Generate All Code

```bash
npm run generate:all
```

This runs all three generators in sequence.

### Individual Generators

```bash
# TypeScript interfaces only
npm run generate:types

# Dart classes only  
npm run generate:dart

# Firestore rules only
npm run generate:rules
```

### When to Regenerate

Run `npm run generate:all` after:
1. Adding a new schema file
2. Modifying field types or required status
3. Adding/removing fields from existing schemas

## Adding a New Schema

1. Create `schemas/your-model.schema.json`
2. Follow the existing schema patterns
3. Run `npm run generate:all`
4. Import generated types in your code

## Example Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "your-model.schema.json",
  "title": "YourModel",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "description": { "type": ["string", "null"] }
  },
  "required": ["id", "name"]
}
```
