# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-02-08

### Added
- **New Feature: Compliance Risk Calculator (Alpha)**: Interactive glassmorphic tool for risk assessment simulation.
- **New Page: FAQ**: Accordion-style "Knowledge Base" covering Compliance, Blockchain, and Services.
- **Security Hardening**: Revoked public access to `contact_info` table and implemented email scrubbing for privacy.
- **Design System Polish**:
    - Global "Glassmorphism" card style.
    - Standardized `rounded-full` buttons with premium hover effects.
    - Enforced `Playfair Display` and `Inter` typography.
- **Chat Widget**: Redesigned with a cleaner "Pulse" button and modern chat window UI.

## [0.2.1] - 2026-02-08

### Added
- **Legal & Compliance Module**: Full suite of legal pages (`Terms`, `Privacy`, `Cookies`, `Accessibility`, `Legal Notice`) and Cookie Consent banner.
- **Privacy**: Hidden direct email addresses and replaced with contact form links.
- **Disclaimers**: Added professional financial/legal disclaimers to `LegalNotice`.

## [0.2.0] - 2026-02-08
- **Global Loader**: Premium "Pulsing Logo" splash screen for better perceived performance.
- **Custom 404 Page**: "Block Not Found" blockchain-themed error page.
- **Lazy Loading**: Route-based code splitting in `App.tsx` for faster initial load.
- **Chat Widget**: Upgraded AI Assistant widget with glass UI and smooth animations.
- **SEO & Brand**: Custom "Dark EG" SVG favicon, `robots.txt`, and `llms.txt` for AI crawlers.

### Changed
- **Typography**: Enforced `Playfair Display` (Headings) and `Inter` (Body) globally.
- **Colors**: Standardized on a deep dark theme (`#09090b`) with silver accents.
- **Layout**: Improved spacing and responsiveness for mobile devices.

### Fixed
- Removed duplicate `About` and `Contact` component files to resolve routing conflicts.
- Fixed header border issues.
