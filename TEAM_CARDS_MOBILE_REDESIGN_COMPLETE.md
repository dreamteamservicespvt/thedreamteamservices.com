# Team Profile Cards - Mobile UI Redesign

## Overview
This document describes the complete redesign of the "Our Team" profile cards for mobile devices, implementing a clean, professional, and modern UI/UX design.

## Changes Made

### 1. New Component: `TeamCardMobile.tsx`
**Location:** `src/components/home/TeamCardMobile.tsx`

**Features:**
- **Circular Profile Images:** Professional circular avatar with gradient border and shadow
- **Clean Layout:** Name and role displayed below the profile image
- **Interactive Bio:** Bio information appears in a full-screen overlay on tap/touch
- **Smooth Animations:** Framer Motion animations for professional transitions
- **Social Links:** Accessible social media links with touch-friendly targets
- **Responsive Design:** Optimized for all mobile screen sizes (320px - 767px)

**Key Props:**
```typescript
interface TeamCardMobileProps {
  member: TeamMember;
  index: number;
  onImageError?: (error: Error) => void;
}
```

### 2. Mobile-Specific Styles: `team-card-mobile-styles.css`
**Location:** `src/components/home/team-card-mobile-styles.css`

**Design Elements:**
- **Circular Avatar:** 160px diameter (adjusts based on screen size)
- **Gradient Borders:** Purple to green gradient with rotating animation
- **Glass-morphism:** Backdrop blur effects for modern look
- **Touch Feedback:** Active states for tap interactions
- **Bio Overlay:** Fixed full-screen modal with smooth fade-in
- **Accessibility:** Focus states, reduced motion support, high contrast mode

**Color Palette:**
- Primary: `rgba(126, 34, 206)` (Purple)
- Accent: `rgba(34, 197, 94)` (Green)
- Background: Dark gradient with transparency

### 3. Updated: `TeamSection.tsx`
**Changes:**
- Added `useIsMobile()` hook to detect mobile devices
- Imported `TeamCardMobile` component
- Conditional rendering: Mobile cards (<768px) vs Desktop cards (≥768px)
- Desktop design remains completely unchanged

**Logic:**
```typescript
const isMobile = useIsMobile();

{displayedMembers.map((member, index) => (
  isMobile ? (
    <TeamCardMobile ... />
  ) : (
    <motion.div ... /> // Original desktop card
  )
))}
```

## Design Specifications

### Mobile Card Layout
```
┌─────────────────────────┐
│                         │
│    ╭─────────────╮     │
│    │   Profile   │     │
│    │    Image    │     │
│    ╰─────────────╯     │
│                         │
│     Member Name        │
│      Role Badge        │
│                         │
│   [Social Links]       │
│                         │
│   Tap to view bio      │
│                         │
└─────────────────────────┘
```

### Bio Overlay Layout
```
┌─────────────────────────┐
│                     [×] │
│                         │
│     Member Name        │
│      Role Badge        │
│                         │
│   Bio text content...  │
│   Multiple lines...    │
│   Scrollable if long   │
│                         │
│                         │
└─────────────────────────┘
```

## Breakpoints

| Screen Size | Card Size | Image Size | Behavior |
|-------------|-----------|------------|----------|
| < 380px     | Small     | 140px      | Mobile card |
| 380px - 419px | Medium  | 160px      | Mobile card |
| 420px - 767px | Large   | 180px      | Mobile card |
| ≥ 768px     | Desktop   | 280px      | Desktop card |

## Accessibility Features

1. **Touch Targets:** Minimum 44x44px for all interactive elements
2. **Focus States:** Clear outline for keyboard navigation
3. **ARIA Labels:** Descriptive labels for screen readers
4. **Reduced Motion:** Respects `prefers-reduced-motion` preference
5. **High Contrast:** Enhanced borders in high contrast mode
6. **Semantic HTML:** Proper heading hierarchy and structure

## Performance Optimizations

1. **Lazy Loading:** Images load optimally with `OptimizedImage` component
2. **Conditional Rendering:** Mobile cards only render on mobile devices
3. **CSS Containment:** Isolated styles prevent layout thrashing
4. **Hardware Acceleration:** GPU-accelerated animations
5. **Minimal Re-renders:** React hooks optimized for performance

## User Interactions

### Tap/Touch Behavior
1. **Initial State:** Card shows profile image, name, role, and social links
2. **Tap Card:** Bio overlay fades in with smooth animation
3. **Tap Overlay Background:** Bio closes with fade-out animation
4. **Tap Close Button:** Bio closes immediately
5. **Tap Social Links:** Opens in new tab (prevents bio opening)

### Visual Feedback
- Active state on tap (scale down + glow)
- Rotating gradient ring on interaction
- Color transitions on name and role
- Social links scale up on hover/tap

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Safari (iOS 12+)
- ✅ Firefox (latest)
- ✅ Samsung Internet
- ✅ Chrome Mobile
- ✅ Safari Mobile

## Testing Checklist

- [x] Profile images display correctly in circle
- [x] Name and role are readable on all screens
- [x] Bio overlay opens on tap
- [x] Bio overlay closes properly
- [x] Social links work without opening bio
- [x] Touch targets meet 44px minimum
- [x] Animations are smooth
- [x] No horizontal scroll
- [x] Desktop cards unchanged
- [x] Reduced motion works
- [x] High contrast mode works
- [x] Screen reader accessible

## File Structure

```
src/
├── components/
│   └── home/
│       ├── TeamCardMobile.tsx          (NEW - Mobile card component)
│       ├── team-card-mobile-styles.css (NEW - Mobile-specific styles)
│       └── TeamSection.tsx              (UPDATED - Conditional rendering)
├── hooks/
│   └── use-mobile.tsx                   (EXISTING - Mobile detection)
└── types/
    └── team.ts                          (EXISTING - TypeScript types)
```

## Code Quality

- **TypeScript:** Full type safety
- **ESLint:** No linting errors
- **Component Size:** < 200 lines per file
- **CSS Size:** < 500 lines
- **Maintainability:** Clear, documented code
- **Reusability:** Modular and composable

## Future Enhancements (Optional)

1. Add swipe gestures to navigate between team members
2. Implement skeleton loading states
3. Add photo zoom on tap
4. Include team member contact buttons
5. Add team member achievements/badges
6. Implement filter/search functionality

## Related Documentation

- [Mobile Optimization Summary](../../MOBILE_OPTIMIZATION_SUMMARY.md)
- [Mobile Responsiveness](../../MOBILE_RESPONSIVENESS_COMPLETE.md)
- [Team Images Mobile Fix](../../TEAM_IMAGES_MOBILE_FINAL_FIX.md)

## Author Notes

This redesign focuses exclusively on mobile devices (< 768px) while preserving the existing desktop experience. The circular profile design with tap-to-reveal bio creates an intuitive, modern interface that's both visually appealing and highly functional.

Key design principles:
- **Mobile-first:** Optimized specifically for touch interactions
- **Clean & Minimal:** Focus on the team member without clutter
- **Professional:** Business-appropriate styling with subtle effects
- **Accessible:** Meets WCAG 2.1 AA standards
- **Performant:** Smooth 60fps animations and fast load times

---

**Last Updated:** October 12, 2025
**Version:** 1.0.0
