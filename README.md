# Vietnamese Evangelical Church Website

> **A bilingual, real-time church management platform** built with Next.js 14, Firebase, and TypeScript — featuring hierarchical data management and role-based admin controls.

**Live Demo:** [Your URL] | **Built:** January 2026

***

## 🎯 The Challenge

Churches need to manage events and discipleship programs across multiple locations and languages, but most CMS solutions are either too complex or lack real-time updates. **How do you build an admin system that handles deeply nested data (courses → locations → classes) while keeping it simple for non-technical church staff?**

***

## ✨ What Makes This Different

### 1. **Hierarchical Subcollection Architecture**
Implemented Firestore's subcollection pattern  for discipleship courses with three-level nesting:[1]
```
discipleshipCourses/{courseId}/
  ├─ discipleshipLocations/{locationId}/
      └─ discipleshipClasses/{classId}
```
**Why it matters:** Scales efficiently, maintains data relationships, and enables cascade deletion with proper warnings.

### 2. **Real-Time Admin Dashboard**
- **No page refreshes needed** — Firestore listeners update UI instantly across all admin sessions
- **Smart lazy loading** — Subcollections only fetch when parent items expand
- **Visual hierarchy** — Color-coded levels (courses, locations, classes) prevent admin confusion

### 3. **Bilingual Translation System**
Custom React Context with flat-key structure for O(1) lookups:
```typescript
t('admin.discipleship.addClass') // Returns "Add Class" or "Thêm Lớp"
```
**No external libraries** — 100% type-safe with TypeScript autocomplete.

### 4. **Smart Time Formatting**
Vietnamese day abbreviation system for recurring classes:
- Input: `Friday, 6:00 AM - 7:00 AM`
- Output: `T6, 6:00 - 7:00am`
- Auto-generates: `Lớp 1`, `Lớp 2`, `Lớp 3`...

***

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 14 (App Router) | Server components + streaming SSR |
| **Database** | Firestore | Real-time listeners, offline support |
| **Auth** | Firebase Auth | Email/password with admin role checks |
| **Storage** | Firebase Storage | Image uploads with gallery reuse |
| **Styling** | Tailwind CSS | Utility-first, mobile-responsive |
| **Language** | TypeScript | Type safety across 50+ components |

***

## 🚀 Key Features

### Admin System
- **Events Management** — CRUD operations with recurring event support
- **Discipleship Courses** — 3-level nested management (courses → locations → classes)
- **Image Gallery** — Upload once, reuse across multiple entities
- **Role-Based Access** — Firebase security rules enforce admin-only writes

### Public Website
- **Bilingual Toggle** — English ↔ Vietnamese with localStorage persistence
- **Dynamic Events** — Auto-filtered by active status and date
- **Responsive Design** — Mobile-first approach with collapsible navigation

***

## 🏗️ Architecture Highlights

### Reusable Component Pattern
```typescript
// Shared across Events and Discipleship
<ImageSelector />        // Gallery + upload in one component
<DeleteConfirmModal />   // Cascade delete warnings
<AuthGuard />           // Route protection
```

### Custom Hooks for Data Layer
```typescript
useDiscipleshipCourses()   // Top-level courses
useDiscipleshipLocations() // Lazy-load locations
useDiscipleshipClasses()   // Lazy-load classes
```
**Performance optimization:** Firestore queries only execute when needed.[2]

### Security Rules Implementation
```javascript
// Firestore rules validate admin status server-side
function isAdmin() {
  return request.auth != null 
    && exists(/databases/$(database)/documents/admins/$(request.auth.token.email))
    && get(...).data.isAdmin == true;
}
```

***

## 📊 Problem-Solving Highlights

1. **Cascade Deletion** — Deleting a course removes all child locations and classes without leaving orphaned data
2. **Timestamp Formatting** — Converts Firebase timestamps to Vietnamese weekday format
3. **Expand/Collapse State** — `Set<string>` tracks expanded items per level without prop drilling
4. **Image Reusability** — Single gallery shared across events and locations reduces storage costs
5. **Translation Sync** — Flat-key structure prevents nested object mismatches

***

## 🔐 Security & Data Integrity

- ✅ Admin email whitelist in Firestore
- ✅ Server-side validation via Security Rules
- ✅ Client-side auth guards prevent unauthorized access
- ✅ Subcollection cascade deletes with confirmation modals

***

## 📱 Mobile-First Design

- Collapsible navigation with hamburger menu
- Touch-optimized expand/collapse controls
- Responsive card layouts
- Optimized image loading with Next.js `<Image />`

***

## 🎓 What I Learned

- **Firestore subcollections** scale better than denormalization for hierarchical data
- **Real-time listeners** require careful cleanup to prevent memory leaks
- **TypeScript generics** simplify form validation across multiple entity types
- **Cultural localization** goes beyond translation (Vietnamese day naming conventions)

***

## 📈 Future Enhancements

- [ ] Attendance tracking for discipleship classes
- [ ] Email notifications for event reminders
- [ ] Analytics dashboard (popular events, class attendance trends)
- [ ] Public class registration with Firebase Functions

***

## 💼 Technical Recruiter Quick Facts

- **Lines of Code:** ~3,500+ TypeScript/TSX
- **Components:** 50+ reusable React components
- **Firebase Collections:** 4 main + 2 subcollections
- **Translation Keys:** 100+ bilingual entries
- **Build Time:** 2 weeks (solo developer)

***

**Built with ❤️ for the Vietnamese Evangelical Church community**