# PRD: Next.js Built-in Internationalization

## Introduction/Overview

This feature migrates the VietCorner website from a client-side language context (`LanguageContext.tsx`) to Next.js's built-in internationalization using `next-intl`. The current implementation stores ~100+ translation keys in a React Context and toggles language via localStorage. The new implementation will:

- Enable Static Site Generation (SSG) for both `/en/*` and `/vi/*` routes
- Improve SEO with proper `<html lang="">` tags and hreflang links
- Maintain the same translation keys for backwards compatibility
- Support both Server and Client Components

**Problem:** The current client-side approach doesn't provide SEO benefits (search engines see one language only) and doesn't leverage Next.js's SSG capabilities.

---

## Goals

- Migrate all translations to `next-intl` with SSG support
- Achieve Lighthouse performance score ≥ 90
- Maintain 100% feature parity with current translations
- Enable URL-based language switching (`/en/*` ↔ `/vi/*`)
- Preserve admin functionality with localized interface

---

## User Stories

### US-001: Install and Configure next-intl
**Description:** As a developer, I need to install and configure the `next-intl` library so the app can support SSG with multiple locales.

**Acceptance Criteria:**
- [ ] Install `next-intl` package
- [ ] Create `src/i18n.ts` configuration file
- [ ] Create `src/middleware.ts` for locale detection and routing
- [ ] Update `next.config.js` if needed for i18n
- [ ] `npm run build` completes without errors

---

### US-002: Create Translation JSON Files
**Description:** As a developer, I need to extract all translations from `LanguageContext.tsx` into separate JSON files.

**Acceptance Criteria:**
- [ ] Create `/messages/en.json` with all English translations
- [ ] Create `/messages/vi.json` with all Vietnamese translations
- [ ] All ~100+ translation keys from `LanguageContext.tsx` are migrated
- [ ] Keys use dot notation (e.g., `navigation.about`, `admin.events.title`)
- [ ] JSON files are valid and parseable

---

### US-003: Create Locale-Based Directory Structure
**Description:** As a developer, I need to restructure the app directory to support locale-based routing.

**Acceptance Criteria:**
- [ ] Create `src/app/[locale]/` directory structure
- [ ] Move `src/app/page.tsx` to `src/app/[locale]/page.tsx`
- [ ] Move `src/app/privacy/` to `src/app/[locale]/privacy/`
- [ ] Move `src/app/login/` to `src/app/[locale]/login/`
- [ ] Move `src/app/admin/` to `src/app/[locale]/admin/`
- [ ] Create `src/app/[locale]/layout.tsx` with proper locale handling
- [ ] `npm run build` completes without errors

---

### US-004: Implement generateStaticParams for SSG
**Description:** As a developer, I need all pages to be statically generated at build time for both locales.

**Acceptance Criteria:**
- [ ] Add `export const dynamic = 'force-static'` to public pages
- [ ] Add `generateStaticParams()` returning `[{ locale: 'en' }, { locale: 'vi' }]`
- [ ] `npm run build` shows `○ (Static)` for all non-dynamic routes
- [ ] View page source shows fully rendered HTML (proves SSG)

---

### US-005: Update Server Components to Use getTranslations
**Description:** As a developer, I need Server Components to use `next-intl`'s server-side translation function.

**Acceptance Criteria:**
- [ ] Import `getTranslations` from `next-intl/server`
- [ ] Update `src/app/[locale]/page.tsx` to use `const t = await getTranslations()`
- [ ] Update `src/app/[locale]/privacy/page.tsx` to use server translations
- [ ] All Server Components render translated content correctly
- [ ] `npm run build` completes without errors

---

### US-006: Update Client Components to Use useTranslations
**Description:** As a developer, I need Client Components to use `next-intl`'s client-side translation hook.

**Acceptance Criteria:**
- [ ] Wrap client components with `NextIntlClientProvider` in layout
- [ ] Update admin components to use `useTranslations()` hook
- [ ] Update navigation/header components to use `useTranslations()`
- [ ] All Client Components render translated content correctly
- [ ] `npm run dev` shows no console errors

---

### US-007: Implement Language Toggle with URL Routing
**Description:** As a user, I want to switch languages using a toggle that changes the URL.

**Acceptance Criteria:**
- [ ] Language toggle switches between `/en/*` and `/vi/*` routes
- [ ] Current page is preserved when switching (e.g., `/en/privacy` → `/vi/privacy`)
- [ ] Selected language persists via cookie (not just localStorage)
- [ ] Root `/` redirects to preferred locale based on browser language
- [ ] Verify in browser: toggle works on homepage
- [ ] Verify in browser: toggle works on admin pages

---

### US-008: Add SEO Metadata for Locales
**Description:** As a site owner, I want proper SEO metadata so search engines index both language versions.

**Acceptance Criteria:**
- [ ] `<html lang="en">` or `<html lang="vi">` set correctly per page
- [ ] Add hreflang alternate links in `<head>`:
  ```html
  <link rel="alternate" hreflang="en" href="https://vietcorner.org/en" />
  <link rel="alternate" hreflang="vi" href="https://vietcorner.org/vi" />
  ```
- [ ] OpenGraph metadata includes correct locale
- [ ] `npm run build` completes without errors

---

### US-009: Remove LanguageContext and Clean Up
**Description:** As a developer, I need to remove the old language context to avoid duplication.

**Acceptance Criteria:**
- [ ] Delete `src/contexts/LanguageContext.tsx`
- [ ] Remove `useLanguage()` hook usage from all components
- [ ] Remove `LanguageProvider` from `layout.tsx`
- [ ] All components use `next-intl` instead
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes

---

### US-010: Verify All Pages in Both Languages
**Description:** As a QA tester, I need to verify all pages render correctly in both languages.

**Acceptance Criteria:**
- [ ] Verify in browser: `/en` homepage renders in English
- [ ] Verify in browser: `/vi` homepage renders in Vietnamese
- [ ] Verify in browser: `/en/privacy` renders in English
- [ ] Verify in browser: `/vi/privacy` renders in Vietnamese
- [ ] Verify in browser: admin pages work in both languages
- [ ] No console errors in dev tools

---

## Functional Requirements

- **FR-1:** The system must support two locales: English (`en`) and Vietnamese (`vi`)
- **FR-2:** When a user visits `/`, the system must redirect to the default locale based on browser `Accept-Language` header
- **FR-3:** When a user clicks the language toggle, the system must navigate to the equivalent route in the other language
- **FR-4:** All pages must be statically generated at build time for both locales (SSG)
- **FR-5:** The system must set the `<html lang="">` attribute correctly based on the current locale
- **FR-6:** Server Components must use `getTranslations()` from `next-intl/server`
- **FR-7:** Client Components must use `useTranslations()` from `next-intl`

---

## Non-Goals (Out of Scope)

- Dynamic content translation (Firebase data remains as-is, stored in the language it was entered)
- Adding new languages beyond English and Vietnamese
- Translating admin-created content (events, courses)
- Right-to-left (RTL) language support

---

## Technical Considerations

- **next-intl version:** Use latest stable version (likely ^3.x)
- **Existing translations:** ~100+ keys in `LanguageContext.tsx` to migrate
- **Admin pages:** Must remain functional with translations
- **Firebase data:** Not affected; content is stored in original language

---

## Success Metrics

- Build output shows `○ (Static)` for all public routes
- Lighthouse performance score ≥ 90
- Zero console errors in production
- Language toggle works on all pages

---

## Open Questions

1. ~~Should the privacy policy page be translated to Vietnamese, or remain English-only for legal purposes?~~ **RESOLVED: Keep English-only**
2. ~~What should be the default locale for users whose browser doesn't specify a language preference?~~ **RESOLVED: Default to US English (`en`)**
