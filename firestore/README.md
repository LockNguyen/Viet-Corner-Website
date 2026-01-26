# Generated Firestore Rules

This directory contains auto-generated Firestore security rules helper functions.

## Files

- `validation.rules` - Contains validation helper functions generated from JSON schemas

## Generated Functions

For each schema, two functions are generated:

### Validation Functions
- `isValidDiscipleshipClass(data)` - Validates field types and required fields
- `isValidDiscipleshipCourse(data)` - Validates field types and required fields
- `isValidDiscipleshipLocation(data)` - Validates field types and required fields
- `isValidEvent(data)` - Validates field types and required fields

### Field Restriction Functions  
- `discipleshipclassHasOnlyFields(data)` - Ensures only allowed fields are present
- `discipleshipcourseHasOnlyFields(data)` - Ensures only allowed fields are present
- `discipleshiplocationHasOnlyFields(data)` - Ensures only allowed fields are present
- `eventHasOnlyFields(data)` - Ensures only allowed fields are present

## Usage

Copy the functions you need into your main `firestore.rules` file:

```javascript
match /events/{eventId} {
  allow write: if request.auth != null && 
                  isValidEvent(request.resource.data) && 
                  eventHasOnlyFields(request.resource.data);
}
```

## Regenerating

Run `npm run generate:rules` to regenerate these files after modifying schemas.
