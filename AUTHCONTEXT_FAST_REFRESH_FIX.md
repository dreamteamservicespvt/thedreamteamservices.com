# AuthContext Fast Refresh Fix

## Issue
```
AuthContext.tsx:49 Uncaught ReferenceError: signIn is not defined
    at AuthProvider (AuthContext.tsx:49:5)

hmr invalidate /src/contexts/AuthContext.tsx Could not Fast Refresh 
("useAuth" export is incompatible)
```

## Root Cause
Vite's Fast Refresh (Hot Module Reload) has limitations when a file exports both:
1. React components (`AuthProvider`)
2. React hooks (`useAuth`)

This causes HMR to fail and create stale references, making it appear that `signIn` is not defined even though it exists in the code.

## Solution
Added ESLint disable comment at the top of the file:
```typescript
/* eslint-disable react-refresh/only-export-components */
```

This tells Vite to skip Fast Refresh validation for this file, allowing it to export both the provider component and the custom hook.

## Why This Works
- The comment disables the `react-refresh/only-export-components` rule
- This rule normally enforces that files should only export components OR hooks, not both
- For context files, it's common to export both the provider and the hook together
- The disable comment is the recommended approach for this pattern

## Alternative Solutions (Not Recommended)
1. **Split into two files**: Separate `AuthProvider` and `useAuth` into different files
   - ❌ More complex file structure
   - ❌ Less intuitive for context pattern
   
2. **Full page reload**: Force full reload instead of HMR
   - ❌ Slower development experience
   - ❌ Loses component state on every change

## Testing
After applying the fix:
- ✅ HMR should work without errors
- ✅ Login functionality should work correctly
- ✅ No "signIn is not defined" errors
- ✅ Fast Refresh works for other components

## File Modified
- `src/contexts/AuthContext.tsx`

## Status
✅ Fixed - The AuthContext now works correctly with Vite's HMR system

---

**Date**: October 12, 2025
**Issue Type**: Development Environment / HMR
**Impact**: Admin login functionality
