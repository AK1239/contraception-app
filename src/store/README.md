# Store

This directory contains Redux Toolkit state management configuration with persistence support.

## Structure

- `index.ts` - Store configuration and root reducer with persistence
- `persistConfig.ts` - Persistence configuration for Redux state
- `persistenceHelpers.ts` - Utility functions for managing persisted state
- `slices/` - Redux Toolkit slices for different app features
  - `questionnaire.ts` - Medical questionnaire answers
  - `results.ts` - Eligibility results and recommendations

## Persistence

The store uses `redux-persist` with `AsyncStorage` to persist user data across app restarts.

### What Gets Persisted

**Questionnaire Slice:**

- ✅ User answers (`answers`)
- ✅ Personalization data (`personalization`)
- ✅ Completion status (`isComplete`)
- ❌ Navigation state (`currentQuestionIndex`, `currentSection`) - resets on app restart
- ❌ Validation errors (`validationErrors`)

**Results Slice:**

- ✅ MEC scores (`mecScores`)
- ✅ Recommendations (`recommendation`)
- ❌ Loading state (`isCalculating`)
- ❌ Error state (`error`)

### Persistence Helpers

Use utility functions from `persistenceHelpers.ts`:

```typescript
import {
  purgePersistedState,
  flushPersistedState,
} from "../store/persistenceHelpers";

// Clear all persisted data (e.g., on logout)
await purgePersistedState();

// Flush pending writes (e.g., before app shutdown)
await flushPersistedState();
```

## Guidelines

- Use Redux Toolkit for all state management
- Create separate slices for different features
- Use TypeScript for all store configuration
- Keep actions and reducers simple and predictable
- Persist only essential data, exclude UI/navigation state
