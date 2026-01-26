# PRD: Schema-Driven Development (Shared Code Opportunity)

## Introduction/Overview

This feature establishes a single source of truth for data models by defining JSON Schemas that generate TypeScript types for the website, Dart classes for the Flutter mobile app, and Firestore validation rules. Currently, the web and mobile teams maintain separate type definitions that can drift out of sync.

**Problem:** Web (`src/types/*.types.ts`) and Mobile (`lib/data/models/*.dart`) maintain separate model definitions. When a field is added or changed, both must be updated manually, risking inconsistencies.

**Solution:** Define schemas once in `/schemas/`, then auto-generate code for all platforms.

---

## Goals

- Establish JSON Schema as the single source of truth for data models
- Auto-generate TypeScript types from schemas
- Auto-generate Dart classes (compatible with existing Flutter code)
- Auto-generate Firestore security rule validation functions
- Reduce manual maintenance and prevent type drift

---

## User Stories

### US-001: Create Schemas Directory Structure
**Description:** As a developer, I need a dedicated directory for JSON schema definitions.

**Acceptance Criteria:**
- [ ] Create `/schemas` directory at project root
- [ ] Create `schemas/README.md` explaining schema structure and usage
- [ ] Document the generation workflow

---

### US-002: Define Event JSON Schema
**Description:** As a developer, I need a JSON Schema definition for the Event model.

**Acceptance Criteria:**
- [ ] Create `schemas/event.schema.json`
- [ ] Schema follows JSON Schema Draft 2020-12 specification
- [ ] Schema includes all Event fields: `id`, `title`, `subtitle`, `dateDisplay`, `heroImageUrl`, `thumbnailImageUrl`, `location`, `notes`, `startDateTime`, `endDateTime`, `isActive`, `recurring`, `order`
- [ ] Schema defines required fields: `id`, `title`, `isActive`, `recurring`, `order`
- [ ] Schema defines optional fields with `null` allowed
- [ ] Schema validates field types (string, boolean, number, date-time)

---

### US-003: Define Discipleship Course JSON Schema
**Description:** As a developer, I need JSON Schema definitions for the Discipleship data models.

**Acceptance Criteria:**
- [ ] Create `schemas/discipleship-course.schema.json`
- [ ] Create `schemas/discipleship-location.schema.json`
- [ ] Create `schemas/discipleship-class.schema.json`
- [ ] Course schema includes: `id`, `name`, `description`
- [ ] Location schema includes: `id`, `courseId`, `name`, `thumbnailImageUrl`
- [ ] Class schema includes: `id`, `courseId`, `locationId`, `startTime`, `endTime`, `contact`, `passage`
- [ ] All schemas follow JSON Schema Draft 2020-12

---

### US-004: Create TypeScript Generator Script
**Description:** As a developer, I need a script to generate TypeScript interfaces from JSON schemas.

**Acceptance Criteria:**
- [ ] Install `json-schema-to-typescript` as dev dependency
- [ ] Create `scripts/generate-types.ts`
- [ ] Script reads all `*.schema.json` files from `/schemas`
- [ ] Script outputs TypeScript interfaces to `src/types/generated/`
- [ ] Add npm script: `"generate:types": "ts-node scripts/generate-types.ts"`
- [ ] Running `npm run generate:types` creates valid TypeScript files
- [ ] Generated types match existing `event.types.ts` structure

---

### US-005: Create Dart Generator Script
**Description:** As a developer, I need a script to generate Dart classes from JSON schemas for the Flutter app.

**Acceptance Criteria:**
- [ ] Research: Choose between `quicktype` or custom generator
- [ ] Create `scripts/generate-dart.ts`
- [ ] Script outputs Dart classes to `/mobile/lib/models/generated/` (or configurable path)
- [ ] Generated classes include `fromJson()` factory constructor
- [ ] Generated classes include `toJson()` method
- [ ] Generated classes are null-safe based on required/optional fields
- [ ] Add npm script: `"generate:dart": "ts-node scripts/generate-dart.ts"`
- [ ] Running `npm run generate:dart` creates valid Dart files

---

### US-006: Create Firestore Rules Generator Script
**Description:** As a developer, I need a script to generate Firestore validation functions from schemas.

**Acceptance Criteria:**
- [ ] Create `scripts/generate-rules.ts`
- [ ] Script outputs validation helper functions
- [ ] Generated functions validate field types (string, boolean, number)
- [ ] Generated functions validate required vs optional fields
- [ ] Output format integrates with existing `firestore.rules`
- [ ] Add npm script: `"generate:rules": "ts-node scripts/generate-rules.ts"`

---

### US-007: Create Combined Generation Command
**Description:** As a developer, I need a single command to regenerate all code from schemas.

**Acceptance Criteria:**
- [ ] Add npm script: `"generate:all": "npm run generate:types && npm run generate:dart && npm run generate:rules"`
- [ ] Add npm script: `"prebuild": "npm run generate:all"` (auto-generate before build)
- [ ] Running `npm run generate:all` completes in < 10 seconds
- [ ] All three generators run successfully

---

### US-008: Migrate Existing Types to Generated Types
**Description:** As a developer, I need to replace manual type definitions with generated ones.

**Acceptance Criteria:**
- [ ] Update imports in `src/types/index.ts` to export from `generated/`
- [ ] Verify existing components still work with generated types
- [ ] Delete manual `event.types.ts` and `discipleship.types.ts` (or keep as extensions)
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes

---

### US-009: Add Schema Documentation
**Description:** As a developer, I need documentation on how to use and extend the schemas.

**Acceptance Criteria:**
- [ ] Create `docs/schema-driven-development.md`
- [ ] Document how to add a new field to an existing schema
- [ ] Document how to create a new schema
- [ ] Document how to regenerate code after schema changes
- [ ] Document the generated file locations for web and mobile

---

### US-010: Validate Schema Consistency
**Description:** As a developer, I need tests to ensure schemas are valid and generators work correctly.

**Acceptance Criteria:**
- [ ] Add schema validation to CI/build process
- [ ] Invalid schemas cause build to fail with clear error message
- [ ] Verify generated TypeScript compiles without errors
- [ ] Verify generated Dart compiles without errors (if Flutter SDK available)

---

## Functional Requirements

- **FR-1:** All data models must be defined as JSON Schema files in `/schemas/`
- **FR-2:** The TypeScript generator must produce interfaces matching the existing `event.types.ts` and `discipleship.types.ts` structure
- **FR-3:** The Dart generator must produce classes with `fromJson()` and `toJson()` methods
- **FR-4:** The Firestore rules generator must produce validation helper functions
- **FR-5:** Generation must complete in under 10 seconds
- **FR-6:** Build must fail if schemas are invalid or generators fail

---

## Non-Goals (Out of Scope)

- Generating API client code
- Schema versioning or migrations
- Real-time schema validation at runtime
- Generating forms from schemas
- Supporting languages other than TypeScript and Dart

---

## Technical Considerations

- **json-schema-to-typescript:** Preferred for TS generation (well-maintained)
- **quicktype:** Option for Dart generation (supports multiple languages)
- **Existing types:** Keep `FormData` types separate (they're UI-specific, not data models)
- **Mobile path:** Output to `/Users/nl/projects/church_app/lib/data/models/generated/` (confirmed existing location)
- **ts-node:** Used to run TypeScript scripts directly

---

## Success Metrics

- All generation scripts run successfully
- Build includes automatic regeneration (`prebuild`)
- Generated TypeScript matches existing types
- Mobile team confirms generated Dart works correctly

---

## Open Questions

1. ~~Should `FormData` types also be generated from schemas, or remain manually maintained?~~ **RESOLVED: Keep manually maintained (UI-specific)**
2. ~~What is the correct output path for Dart files?~~ **RESOLVED: `/Users/nl/projects/church_app/lib/data/models/generated/`**
3. ~~Should we use `quicktype` for both TypeScript and Dart for consistency?~~ **TBD during implementation**
