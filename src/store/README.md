# Store

This directory contains Redux Toolkit state management configuration.

## Structure

- `index.ts` - Store configuration and root reducer
- `slices/` - Redux Toolkit slices for different app features
  - `questionnaire.ts` - Medical questionnaire answers
  - `results.ts` - Eligibility results and recommendations
  - `user.ts` - User preferences and settings

## Guidelines

- Use Redux Toolkit for all state management
- Create separate slices for different features
- Use TypeScript for all store configuration
- Keep actions and reducers simple and predictable
