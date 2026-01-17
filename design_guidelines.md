# HeartLog Design Guidelines

## Design Philosophy
HeartLog embodies a calm, sanctuary-like digital oasis for emotional tracking. The design prioritizes serenity, simplicity, and emotional safety through soft aesthetics and minimal cognitive load.

## Color Palette
- **Sage Green** (#A8BBA3, #8FA888): Primary accent, represents growth and calm
- **Sky Blue** (#B8D8E8, #87CEEB): Secondary accent, evokes tranquility
- **Warm Sand** (#F5E6D3, #E8D5BE): Neutral backgrounds, grounding warmth
- **Soft Lavender** (#D4C5E2, #C5B3D8): Tertiary accent, gentle emotional depth
- **Neutral Tones**: Warm whites (#FDFBF7), soft grays (#E8E6E3) for text and borders
- **Text**: Deep charcoal (#3A3A3A) for primary, muted gray (#6B6B6B) for secondary

## Typography
- **Primary Font**: Inter or DM Sans (clean, readable, modern sans-serif)
- **Hierarchy**:
  - H1: 32px, font-weight 600 (page titles)
  - H2: 24px, font-weight 500 (section headers)
  - Body: 16px, font-weight 400, line-height 1.6
  - Small: 14px for helper text
  - Button text: 16px, font-weight 500

## Layout System
- **Spacing Units**: Tailwind scale of 4, 6, 8, 12, 16, 24 (p-4, mb-6, mt-8, etc.)
- **Container**: max-w-md (448px) centered for auth forms
- **Vertical Rhythm**: Consistent 6-8 units between form elements
- **Padding**: Generous internal spacing (p-6 to p-8) for breathing room

## Component Library

### Icons
- **Library**: `lucide-react`
- **Naming Convention**: Always use the `Icon` suffix when importing and using Lucide icons (e.g., `HeartIcon`, `Loader2Icon`, `AlertCircleIcon`). This ensures clarity and avoids naming collisions with components or other variables.

### Registration & Login Pages Layout
- **Full-height centered layout**: min-h-screen with flex centering
- **Subtle gradient background**: Diagonal soft gradient from warm sand to sky blue (very subtle, 5-10% opacity)
- **Floating card design**: 
  - White/warm white background (#FDFBF7)
  - Subtle shadow: shadow-lg with warm undertones
  - Rounded corners: rounded-2xl
  - Padding: p-8 to p-10
  - Max width: max-w-md

### Branding
- **Logo/App Name**: "HeartLog" in soft lavender or sage green
- Small icon or emoji (🌿 or 💙) above the name
- Placement: Top center of auth card
- Spacing: mb-8 from form

### Form Elements
- **Input Fields**:
  - Background: White with very subtle warm tint
  - Border: 1.5px solid soft gray (#E8E6E3)
  - Focus state: Border changes to sage green, subtle shadow
  - Padding: py-3 px-4
  - Border radius: rounded-lg
  - Placeholder: Muted gray with gentle wording ("Your email", "Choose a username")

- **Labels**: 
  - Above inputs, mb-2
  - Font-weight 500, text-sm
  - Color: Deep charcoal

- **Validation Messages**:
  - Below inputs, text-sm
  - Error: Soft coral (#E8A59C) instead of harsh red
  - Success: Sage green
  - Icon + text combination

### Buttons
- **Primary CTA**:
  - Background: Sage green gradient (from lighter to darker shade)
  - Text: White, font-weight 500
  - Padding: py-3 px-6
  - Border radius: rounded-lg
  - Full width: w-full
  - Hover: Slightly darker, smooth transition (200ms)
  - Loading state: Sage green with opacity, spinner icon

- **Secondary/Link Buttons**:
  - Text-only in sky blue
  - Underline on hover
  - Font-weight 500

### Navigation Between Auth Pages
- "Already have an account? Log in" / "Don't have an account? Sign up"
- Centered below form, mt-6
- Regular weight text + colored link button

### Form Structure
**Registration Page**:
1. HeartLog branding (centered, mb-8)
2. Page title: "Create Your Oasis" (h2, mb-2)
3. Subtitle: "Start your emotional wellness journey" (text-sm, mb-8, muted)
4. Email input (mb-6)
5. Username input (mb-6)
6. Password input with strength indicator (mb-6)
7. Terms agreement checkbox (mb-6, optional but recommended)
8. Sign Up button (mb-6)
9. Divider with "or" text (optional)
10. Link to login

**Login Page**:
1. HeartLog branding (centered, mb-8)
2. Page title: "Welcome Back" (h2, mb-2)
3. Subtitle: "Continue your journey to calm" (text-sm, mb-8, muted)
4. Email input (mb-6)
5. Password input (mb-6)
6. "Forgot password?" link (text-right, text-sm, mb-6)
7. Log In button (mb-6)
8. Link to registration

## Micro-Interactions
- **Minimal animations**: Extremely subtle, prioritize calm over flashy
- Input focus: Smooth 200ms border color transition
- Button hover: 150ms ease-in-out transform scale(1.01)
- Form submission: Gentle loading spinner in button
- Success/error messages: Fade in with 300ms ease
- **No** bounce effects, no jarring movements

## Responsive Behavior
- **Mobile (< 768px)**: 
  - Card becomes full-width with rounded-none or minimal rounding
  - Padding reduces to p-6
  - Background gradient remains
- **Desktop**: Centered card with generous margins

## Accessibility
- All inputs have associated labels (for screen readers even if visually hidden)
- Focus states clearly visible with sage green outline
- Color contrast meets WCAG AA standards
- Error messages announced to screen readers
- Keyboard navigation fully supported

## Images
**No hero images** for auth pages - these are utility-focused, form-centric pages where simplicity is key. The subtle gradient background provides visual interest without distraction.

## Brand Personality
Every element should whisper calm, not shout. Think peaceful morning, gentle breeze, safe harbor. Avoid sharp edges, harsh contrasts, or aggressive colors. The app should feel like a trusted friend, not a demanding task manager.