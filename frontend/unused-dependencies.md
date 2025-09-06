# Unused Dependencies Analysis

## Radix UI Components - UNUSED (can be removed)
These Radix UI packages are installed but not used in the application:

- @radix-ui/react-accordion ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-alert-dialog ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-aspect-ratio ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-avatar ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-checkbox ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-collapsible ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-context-menu ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-dropdown-menu ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-hover-card ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-menubar ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-navigation-menu ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-popover ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-progress ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-radio-group ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-scroll-area ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-separator ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-slider ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-switch ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-tabs ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-toast ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-toggle ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-toggle-group ❌ (UI component exists but not imported anywhere)
- @radix-ui/react-tooltip ❌ (UI component exists but not imported anywhere)

## Other Unused Dependencies
- input-otp ❌ (UI component exists but not used)
- react-day-picker ❌ (UI component exists but not used)
- react-resizable-panels ❌ (UI component exists but not used)
- vaul ❌ (UI component exists but not used)
- sonner ❌ (UI component exists but not used)
- next-themes ❌ (ThemeProvider exists but uses custom implementation)
- embla-carousel-react ❌ (Used in carousel component but carousel not used)
- cmdk ❌ (Used in command component but command not used)
- date-fns ❌ (Not imported anywhere)

## Currently Used Dependencies (KEEP)
- @radix-ui/react-dialog ✅ (Used in Contact component)
- @radix-ui/react-label ✅ (Used in form components)
- @radix-ui/react-select ✅ (Used in Contact component)
- @radix-ui/react-slot ✅ (Used in Button and form components)
- Button, Card, Input, Textarea, Badge, Breadcrumb ✅ (All actively used)

## Potential Savings
Removing unused Radix UI packages could save approximately 25-30 KiB in the final bundle.