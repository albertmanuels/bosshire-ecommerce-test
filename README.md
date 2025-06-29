# 🧩 Bosshire Admin Dashboard

> Technical test project for the Frontend Engineer position.

---

## 📝 Overview

This project is an admin dashboard built as part of a frontend technical test.

---

## ⚙️ Tech Stack

| Technology       | Description                              |
|------------------|------------------------------------------|
| **Next.js 14**   | App Router-based React framework          |
| **TypeScript**   | Strictly typed JavaScript                |
| **Material UI v7** | UI component library     |
| **Zustand**      | Lightweight global state management      |
| **React Hook Form** | Form state management and validation   |
| **Yup**          | Schema-based form validation             |
| **React Toastify** | User-friendly toast notifications      |
| **ESlint** | Linting for code quality     |

## 🧪 Features
🔐 Login/logout authentication (Mocked admin with secure cookie session)

🛍️ Cart management (Add, update, delete products)

📦 Product and cart listing with detail view

🔍 Search with deep key matching

📄 Pagination tables

✅ Form validation with real-time error handling

🧾 Toast feedback for user interactions

♻️ Persistent state for cart via zustand and localStorage

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** `>=18`
- **npm** `>=9` (or use `pnpm` / `yarn` if preferred)

### 📦 Installation

```bash
https://github.com/albertmanuels/bosshire-ecommerce-test.git
cd bosshire-ecommerce-test
npm install
```

### 🏃‍♂️ Run in Development

```bash
npm run dev
```
Starts the development server at http://localhost:3000

### 🔒 Env setup
Create .env file
```env
API_URL=https://fakestoreapi.com
```

## 📁 Project Structure

```bash
src/
├── app/                 # App Router pages and layout (auth, dashboard)
├── components/          # Reusable UI components
│   ├── layouts/         # Layout wrappers (e.g., auth layout, dashboard layout)
│   ├── shared/          # Shared components (e.g., Modal, NumberStepper, SearchBar)
│   └── views/           # Page-specific view components
├── constants/           # Static values like config, routes, mock user
├── helpers/             # Data transformation and utility helpers
├── services/            # API calls wrapped in React Query hooks
├── stores/              # Zustand state (auth, cart)
├── styles/              # Global and scoped CSS files
├── types/               # Shared TypeScript type definitions
├── utils/               # Utilities like theme, session
.env                     # Environment variables (e.g., API_URL)
```

### 🗒️ Notes
- This dashboard simulates real-world admin interactions such as viewing and managing user carts.
- Uses API from fakestoreapi.com
- Authentication is mocked with cookie-based sessions.

### 🔒 Authentication
Demo admin account:

- **username:** kevinryan
- **password:** kev02937@

### 🙋 Author
Built by Albert Manuel as part of a frontend technical challenge.

