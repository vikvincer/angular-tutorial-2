# Angular Firebase Authentication Example

This project is a sample Angular application that demonstrates a complete authentication flow using Firebase Authentication and the FirebaseUI for Web library. It showcases modern Angular practices, including standalone components, functional route guards, and lazy loading.

## Step-by-Step Implementation Guide

This guide explains the architecture and flow of the application, from initialization to a user logging in and accessing a protected route.

### 1. Application Bootstrap & Core Modules

The application starts with the `AppModule`, which is the root module.

- **`app.module.ts`**: This file imports essential modules.
  - `BrowserModule`: Required for any web application that runs in a browser.
  - `AppRoutingModule`: Manages the application's routing configuration.
  - `AuthModule.forRoot(...)`: This is a critical piece. It initializes our custom `AuthModule` with the Firebase configuration from `environment.ts`. The `.forRoot()` pattern ensures that the Firebase services are singletons available throughout the app.

### 2. Authentication Module (`AuthModule`)

This module encapsulates all authentication-related logic.

- **`auth.module.ts`**: It uses the `forRoot` static method to receive the Firebase app instance.
- **`FIREBASE_AUTH_SERVICE` Token**: Instead of directly depending on the Firebase `Auth` class, the module uses an `InjectionToken`. This is a best practice for providing non-class dependencies and makes the code more decoupled and testable. Any component or service that needs the Firebase Auth instance can inject it using this token.

### 3. Routing Configuration

Navigation is handled by the Angular Router, configured in `app-routing.module.ts`.

- **Route Definitions**: The `routes` array defines all possible navigation paths.
  - `{ path: 'auth', ... }`: A lazy-loaded route for the authentication page. The code for this page is only downloaded when the user navigates to `/auth`.
  - `{ path: 'dashboard', ..., canActivate: [authGuard] }`: A protected route. The `canActivate` property is key here; it tells the router to run our `authGuard` before allowing access to the dashboard.
  - `{ path: '**', ... }`: A wildcard route that redirects any unknown URL to a "Not Found" page, ensuring a graceful user experience for invalid paths.

### 4. Route Protection (`authGuard.ts`)

This is a functional route guard that secures parts of the application.

- **Logic**: Before activating a route, the guard checks `sessionStorage` for the `idToken`.
  - If the token exists, it returns `true`, and navigation proceeds.
  - If the token does not exist, it returns a `UrlTree` pointing to `/auth`, effectively cancelling the current navigation and redirecting the user to the login page.

### 5. Login Flow (`auth.page.ts`)

This is the user-facing part of the login process.

- **FirebaseUI**: It uses the `firebaseui-web` library to quickly render a login interface with different providers (Email, Google).
- **`signInSuccessWithAuthResult` Callback**: This function is the core of the login logic. When a user successfully authenticates with FirebaseUI:
  1. It receives the `authResult` containing user information.
  2. It calls `user.getIdToken()` to get a secure JWT from Firebase.
  3. It stores this token in `sessionStorage`.
  4. It uses the injected `AuthService` to notify the rest of the app about the successful login and to navigate the user to the main dashboard.

### 6. Centralized State Management (`auth.service.ts`)

This service acts as the single source of truth for the application's authentication state.

- **`isAuthenticated$` Observable**: It exposes a `BehaviorSubject` as an observable. This allows any part of the application to subscribe and react to changes in the user's login status (e.g., showing/hiding UI elements).
- **`login()` and `logout()` Methods**: These methods handle the logic for updating the authentication state, saving/removing the token from `sessionStorage`, and navigating the user.

### 7. UI State (`app.component.ts`)

The root `AppComponent` controls the main application shell.

- **`*ngIf="isAuthenticated$ | async"`**: The main header is conditionally rendered. The `async` pipe automatically subscribes to the `isAuthenticated$` observable from the `AuthService`. When the user logs in, the observable emits `true`, and the header appears. When they log out, it emits `false`, and the header is removed.
- **`onLogout()`**: The logout button in the header calls this method, which in turn calls `authService.logout()` to orchestrate the entire logout process.

---

## Activity

This section outlines the next features to be implemented.

### Article Management (with Dexie.js)

**Objective**: Implement offline-first CRUD functionality for articles using IndexedDB via the Dexie.js wrapper.

1.  **Setup Dexie.js**: [link]https://dexie.org/docs/Tutorial/Angular
    - Create `dexie.service.ts` to define the database schema. It will have an `articles` table with fields like `id`, `title`, `content`, and `createdAt`.
2.  **Article Service**:
    - Create `article.service.ts`. This service will inject `DexieService` and provide methods like `addArticle(article)`, `getArticles()`, `updateArticle(article)`, and `deleteArticle(id)`.
3.  **Create/Edit Article Page**:
    - Create a new page at `/articles/create` (and `/articles/edit/:id`).
    - Implement a reactive form (`FormGroup`) for the article's title and content.
    - On submit, the form will call the appropriate `ArticleService` method.
4.  **Articles List Page**:
    - Create a page at `/articles` to display a list of all articles from `ArticleService`.
    - Each item will have "Edit" and "Delete" buttons.
5.  **Routing**:
    - Add the new routes (`/articles`, `/articles/create`, `/articles/edit/:id`) to the routing configuration and protect them with the `authGuard`.

### User Profile Page

**Objective**: Display user information decoded from the JWT stored in `sessionStorage`.

1.  **User Service**:
    - Create a `user.service.ts` or extend `AuthService`.
    - Add a method `getUserProfile()` that retrieves the `idToken` from `sessionStorage`, decodes it (using a library like `jwt-decode`), and returns the user payload (e.g., `uid`, `email`, `name`).
2.  **Profile Page**:
    - Create a new page at `/profile`.
    - This component will inject the `UserService` and display the user's profile information.
3.  **Routing**:
    - Add the `/profile` route to the routing configuration and protect it with the `authGuard`.
