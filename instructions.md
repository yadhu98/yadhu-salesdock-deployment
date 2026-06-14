# Project Instructions & Developer Guide

Welcome to the **TAT** React + TypeScript + Vite project! This document outlines the project structure, features, key files, development setup, and deployment workflow.

---

## 📋 Overview

This application is a **Master Dashboard** for managing shopping cart items and discounts. It allows users to:
1. Toggle pre-set discounts (e.g., percentage or fixed values) for one-time or monthly charges.
2. Add, edit, and delete custom/manual discounts via a dialog modal.
3. Automatically recalculate cart totals (both one-time and monthly fees) based on active discounts.
4. Toggle the user interface between **English (EN)** and **Dutch (NL)**.

---

## 📁 Project Directory Structure

Here is a breakdown of the core directories and files in the project:

```text
TAT/
├── public/                  # Public assets
├── src/
│   ├── __tests__/           # Test suite (using Jest & React Testing Library)
│   │   ├── CartSummart.test.tsx  # Unit tests for the Cart Summary component
│   │   └── DiscountModal.test.tsx # Unit tests for the Discount Modal component
│   ├── assets/              # App images and vector assets
│   ├── components/          # Reusable React components
│   │   ├── Accordion/       # Accordion wrappers and panel configuration
│   │   ├── Cart/            # Cart Summary cards and calculation displays
│   │   ├── Common/          # Shared components (e.g., Button)
│   │   ├── Discounts/       # Discount lists, items, modal editors, and inline contents
│   │   ├── DiscountValueInput.tsx # Specialized inputs for percentage/fixed amount selection
│   │   └── TargetToggle.tsx # Toggle element for selecting One-time vs Monthly
│   ├── context/             # Global State Management (React Context)
│   │   └── CartContext.tsx  # Centralized store for discounts, locale, and modal states
│   ├── hooks/               # Custom React hooks
│   │   ├── useCart.ts       # Hook for computing discounted pricing on runtime
│   │   ├── useDiscountForm.ts # Hook encapsulating modal form inputs and validation
│   │   └── useVerbiage.ts   # Hook resolving active language localized strings
│   ├── locale/              # Localization files
│   │   ├── en.ts            # English string dictionary
│   │   ├── nl.ts            # Dutch (Nederlands) string dictionary
│   │   └── language.ts      # Mapping of supported locales
│   ├── services/            # Mock API calls or RTK Query services
│   ├── App.css              # Main application styling (Bootstrap overrides)
│   ├── App.tsx              # Component bootstrapping and main dashboard layout
│   ├── index.css            # Base design tokens and typography styling
│   ├── main.tsx             # Application entry point
│   ├── setupTests.ts        # Global Jest configuration
│   ├── types/               # Type definitions
│   └── verbiages.json       # Additional text/config variables
├── package.json             # NPM package script and dependency manifest
├── tsconfig.json            # Base TypeScript configuration
└── vite.config.ts           # Vite bundler configuration
```

---

## 🛠️ Development & Build Commands

Use the following scripts to run, build, and check the application:

### 1. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### 2. Local Development Server
Starts the Vite dev server with Hot Module Replacement (HMR):
```bash
npm run dev
```
By default, the server runs on [http://localhost:5173/](http://localhost:5173/).

### 3. Build for Production
Compiles TypeScript and bundles the assets for production:
```bash
npm run build
```
The compiled assets will be outputted to the `dist/` directory.

### 4. Preview Production Build
Locally preview the production build outputted in the `dist/` directory:
```bash
npm run preview
```

### 5. Code Style & Linting
Run ESLint to check for stylistic errors, code quality issues, or type mismatches:
```bash
npm run lint
```

---

## 💡 Key Architectural Details

### 1. Global State Management (`CartContext`)
Instead of heavy state management tools, the application uses React Context to store and manipulate states globally:
* **Discounts**: An array of `DiscountItem` structures representing all system and custom discounts.
* **Locale**: The currently active localization code (`'en'` or `'nl'`).
* **Modal State**: Tracks whether the Discount modal is open, which discount is selected for editing (`discountId`), and whether it is in `ADD` or `EDIT` mode.

### 2. Discount Modal Inputs & Validation (Conditional Rendering)
The **Discount Modal** adjusts its visible fields based on the selected price target (`ONE_TIME` or `MONTHLY`) to match the user interface requirements:
* **One-time Price (`ONE_TIME`)**:
  * Shows: Price target selection, Discount input (value/type), and read-only calculated New price.
  * Hides: Duration and Description.
* **Monthly Price (`MONTHLY`)**:
  * Shows: Price target selection, Discount input, Duration input (number of months), read-only New price, and Description (which updates the primary discount name).
* **Preset Validation Limits**:
  * For preset/system discounts (e.g., `d2`), a helper warning displays the maximum allowed discount (e.g. `The discount cannot exceed 5%`). The form validates and disables the save action if the value exceeds this threshold.
* **Dynamic Calculations**:
  * A read-only "New price" field dynamically displays the updated subtotal depending on the target base price (€1,000 for one-time and €10 for monthly).

### 3. Dynamic Calculations (`useCart`)
The `useCart` hook takes base fees (`initialOneTime`, `initialMonthly`) and applies all currently active discounts from the context:
* Fixed-rate deductions are subtracted directly.
* Percentage deductions are computed based on the initial base amounts.
* Values are bounded such that they never drop below `€ 0.00`.

### 4. Multi-Language Support (`useVerbiage`)
Localization strings are maintained in simple TypeScript dictionaries (`src/locale/en.ts` and `src/locale/nl.ts`). The `useVerbiage` hook automatically references `CartContext` to return the appropriate language translation object.

### 5. Custom Component Styling
Styling relies on a hybrid of **Bootstrap 5** utility classes for structural layout and **styled-components** / CSS overrides for fine-grained component aesthetics.

---

## 🧪 Testing Guidelines

Unit and integration tests are placed inside the `src/__tests__/` directory.

* **Test Framework**: Jest and React Testing Library are configured.
* **Writing Tests**: Since the initial test files (`CartSummart.test.tsx` and `DiscountModal.test.tsx`) are currently blank templates, developers should implement test cases utilizing `setupTests.ts` and Mock Service Worker (`msw`) when mocking API endpoints.
* **Executing Tests**: Run Jest tests using npm or direct npx command depending on your local config:
  ```bash
  npx jest
  ```
