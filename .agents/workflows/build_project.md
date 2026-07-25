# Build Project Workflow

This workflow details the steps required to install dependencies and build the Next.js project for production.

## Steps

### Step 1: Install Dependencies
Run this command in the project root to install all required npm packages:
```bash
npm install
```

### Step 2: Build the Project
Run this command to compile the Next.js application and prepare a production build:
```bash
npm run build
```
This script executes `NODE_ENV=production next build` to generate optimized production assets in the `.next` directory.
