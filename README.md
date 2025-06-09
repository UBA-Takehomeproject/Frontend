# Vite React + TypeScript App

This is a Vite-powered React app using TypeScript. Before running the frontend, you **must** start the backend server.

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Backend server (see below)

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

# Frontend - Blog Platform

This is the frontend for the Blog Platform project, built with [Vite](https://vitejs.dev/).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/UBA-Takehomeproject/Frontend.git
cd frontend-repo
```

Replace the link with the actual frontend repository URL.

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

By default, the Vite dev server runs on [http://localhost:5173](http://localhost:5173)

## Backend Setup Required

This project uses HTTP-only cookies for authentication. For that to work properly:

- The backend must allow requests from the frontend’s origin (http://localhost:5173).
- CORS must be configured correctly.

Make sure your front url is the same as this urls in the following backend configuration:

### appsettings.json

```json
"AllowedOrigins": ["http://localhost:5173"]
```

### appsettings.Development.json

```json
"AllowedOrigins": ["http://localhost:5173"]
```

## Backend Repository

You must also clone and run the backend for the frontend to work correctly.

Clone the backend here: [https://github.com/UBA-Takehomeproject/backend.git](https://github.com/UBA-Takehomeproject/backend)

Be sure to follow the README in the backend repo for setup instructions.

## Notes

- Ensure the backend server is running before logging in or making authenticated API calls.
- Use a modern browser (Chrome, Edge, Firefox) to avoid cookie-related issues during local development.

 

