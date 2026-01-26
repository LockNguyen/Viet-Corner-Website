# Schema-Driven Development

This project uses JSON Schema as the single source of truth for data models, generating TypeScript, Dart, and Firestore validation rules from schemas.

## Overview

```
schemas/*.schema.json
        │
        ├── npm run generate:types ──► src/types/generated/*.ts (Web)
        │
        ├── npm run generate:dart ───► church_app/lib/data/models/generated/*.dart (Mobile)
        │
        └── npm run generate:rules ──► firestore/validation.rules (Security)
```

## Generated File Locations

| Platform | Output Directory | Usage |
|----------|-----------------|-------|
| **Web (Next.js)** | `src/types/generated/` | TypeScript interfaces for API responses, forms |
| **Mobile (Flutter)** | `/Users/nl/projects/church_app/lib/data/models/generated/` | Dart classes with fromJson/toJson |
| **Firestore** | `firestore/validation.rules` | Security rules validation functions |

## Regenerating Code After Schema Changes

After modifying any schema, run:

```bash
npm run generate:all
```

This runs automatically before `npm run build` via the `prebuild` hook.

### Individual Commands

```bash
npm run generate:types   # TypeScript only
npm run generate:dart    # Dart only
npm run generate:rules   # Firestore rules only
```

---

## Adding a New Field to an Existing Schema

### Example: Add `registrationUrl` to Event

1. **Edit the schema** (`schemas/event.schema.json`):

```json
{
  "properties": {
    "registrationUrl": {
      "type": ["string", "null"],
      "format": "uri",
      "description": "URL for event registration"
    }
  }
}
```

2. **Regenerate code**:

```bash
npm run generate:all
```

3. **Update manual type extensions** (if needed):

If the field needs runtime transformation (e.g., Date parsing), update `src/types/event.types.ts`:

```typescript
export interface EventEntity extends Omit<GeneratedEvent, 'startDateTime'> {
  startDateTime: Date | null;
  // New field is automatically included from GeneratedEvent
}
```

4. **Update Firestore rules** (if needed):

Include the new validation function in `firestore.rules`:

```
match /events/{eventId} {
  allow write: if isValidEvent(request.resource.data);
}
```

---

## Creating a New Schema

### Step 1: Create the Schema File

Create `schemas/your-model.schema.json`:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://vietcorner.org/schemas/your-model.schema.json",
  "title": "YourModel",
  "description": "Description of your model",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier"
    },
    "name": {
      "type": "string",
      "description": "Display name"
    },
    "createdAt": {
      "type": ["string", "null"],
      "format": "date-time",
      "description": "Creation timestamp"
    }
  },
  "required": ["id", "name"],
  "additionalProperties": false
}
```

### Step 2: Generate Code

```bash
npm run generate:all
```

This creates:
- `src/types/generated/your-model.ts` (TypeScript)
- `church_app/.../generated/your_model.dart` (Dart)
- Validation functions in `firestore/validation.rules`

### Step 3: Export from Index (Optional)

Add to `src/types/index.ts` if you need a manual extension:

```typescript
export type { YourModel } from './generated';
```

Or create an extended type:

```typescript
import { YourModel as GeneratedYourModel } from './generated';

export interface YourModel extends Omit<GeneratedYourModel, 'createdAt'> {
  createdAt: Date | null;
}
```

---

## Schema Conventions

### Field Types

| TypeScript | Dart | JSON Schema |
|------------|------|-------------|
| `string` | `String` | `"type": "string"` |
| `string \| null` | `String?` | `"type": ["string", "null"]` |
| `number` | `num` | `"type": "number"` |
| `boolean` | `bool` | `"type": "boolean"` |
| `Date` (as string) | `DateTime` | `"type": "string", "format": "date-time"` |
| URL | `String` | `"type": "string", "format": "uri"` |

### Required vs Optional

- **Required fields**: Listed in `"required": [...]` array
- **Optional fields**: Omit from required array, use nullable type `["type", "null"]`

### Naming

- Schema files: `kebab-case.schema.json`
- Schema title: `PascalCase` (becomes TypeScript interface name)
- Properties: `camelCase`

---

## Architecture

### Why Schema-Driven?

1. **Single source of truth**: Change once, update everywhere
2. **Type safety**: Compile-time errors in both web and mobile
3. **Validation**: Firestore rules generated from same definitions
4. **Documentation**: Schemas are self-documenting

### Runtime vs Generated Types

Generated types use `string` for dates (JSON format). For runtime usage with `Date` objects:

```typescript
// Generated type (JSON boundary)
interface Event {
  startDateTime: string | null;
}

// Runtime type (used in app)
interface EventEntity extends Omit<Event, 'startDateTime'> {
  startDateTime: Date | null;
}
```

Convert when reading from/writing to Firestore:
```typescript
const eventEntity: EventEntity = {
  ...doc.data(),
  startDateTime: doc.data().startDateTime?.toDate() ?? null,
};
```

---

## Troubleshooting

### Generated Types Not Updating

```bash
rm -rf src/types/generated/*
npm run generate:types
```

### Dart Compilation Errors

Ensure the Flutter project path is correct in `scripts/generate-dart.ts`:
```typescript
const dartOutputDir = '/Users/nl/projects/church_app/lib/data/models/generated';
```

### Schema Validation Errors

Validate schemas with:
```bash
npx ajv validate -s schemas/event.schema.json -d '{"id":"1","title":"Test","isActive":true,"recurring":false,"order":1}'
```
