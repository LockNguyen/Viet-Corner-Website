# Internationalization (i18n) Issues

This document tracks issues found during i18n QA testing for discussion with the team.

---

## Issue 1: Church Name Not Translated Properly

**Location:** Header component  
**Files:** `messages/en.json`, `messages/vi.json`

### Problem

The header shows the church name inconsistently between locales:

| Locale | `church.name` | `church.subtitle` |
|--------|---------------|-------------------|
| **Vietnamese (`/vi`)** | Hội Thánh Tin Lành Việt Nam ✓ | Vietnamese Evangelical Church |
| **English (`/en`)** | Hoi Thanh Tin Lanh Viet Nam | Vietnamese Evangelical Church |

The English version simply removes the accent marks (diacritics) instead of providing a true translation. The subtitle remains identical in both languages.

### Proposed Solutions

| # | Approach | `church.name` (EN) | `church.subtitle` (EN) | Pros/Cons |
|---|----------|-------------------|----------------------|-----------|
| **1** | Keep authentic Vietnamese name with diacritics | `Hội Thánh Tin Lành Việt Nam` | Vietnamese Evangelical Church | ✅ Brand consistency ❌ May be hard to read for English speakers |
| **2** | Use English translation | `Vietnamese Evangelical Church` | *(remove or change to tagline)* | ✅ Maximum accessibility ❌ Loses Vietnamese branding |
| **3** | Keep current (romanized) | `Hoi Thanh Tin Lanh Viet Nam` | Vietnamese Evangelical Church | ✅ Easier pronunciation ❌ Looks like incomplete translation |

### Recommendation

*(To be discussed)*

---

## Issue 2: Language Toggle Scrolls Page to Top

**Location:** Language toggle button (header)  
**File:** `src/components/LanguageToggle.tsx`

### Problem

When a user is scrolled down on the page (e.g., viewing the Ministries section, Stories, Events, or Contact sections) and clicks the language toggle, the page scrolls back to the top after the language switch.

**Expected behavior:** The user should remain at the same scroll position after switching languages.

**Current behavior:** The page navigates to the new locale URL and resets scroll to top.

### User Impact

- Frustrating UX, especially on mobile
- Users have to scroll back down to where they were
- Discourages language switching mid-page

### Proposed Solution

Preserve scroll position during language switch by:
1. Saving the current `window.scrollY` before navigation
2. Restoring scroll position after the new page loads (via `useEffect` or scroll restoration)

Alternatively, use `scroll: false` option in Next.js router if supported.

---

## Issue 3: Navigation Links Non-Functional (Known Issue)

**Location:** Header navigation, Footer quick links  
**Files:** `src/components/Header.tsx`, `src/components/Footer.tsx`

### Problem

The following navigation links do not navigate to any content:

- **"About Us"** (`#about`) - No section with `id="about"` exists on the page
- **"Events"** (`#events`) - Links to events section but may not scroll correctly

### Note

This may already be a known issue to the main contributor. Documenting here for completeness.

### Proposed Solution

Either:
1. Add the missing `id="about"` to the Welcome/Ministries section
2. Or create dedicated pages for `/about` and `/events`

---

<!-- Add more issues below as they are found -->

