# Frontend Runbook

The front-end is a [Next.js](https://nextjs.org) project that builds the interface for Patronos' Careers Center

## Getting Started

### Step 1: Install Node.js and npm

Before starting, you need to have Node.js and npm installed. If you don't have them installed, follow these steps:

1. **Download Node.js** from the [official Node.js website](https://nodejs.org/). When you install Node.js, npm is automatically installed.
2. **Check the installation**:
   ```bash
   node -v
   npm -v
   ```
   This will display the version numbers of Node.js and npm.

### Step 2: Install Dependencies

After cloning the repository, navigate to the project folder and run the following command to install the necessary dependencies:

```bash
pnpm install
```

### Step 3: Run the Development Server

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Step 4: Set up environment variables

For testing purposes, our database in Airtable has a staging version in which you can create fictional entries and validate your features. It is recommended that local executions are made using these tables. For that, you'll need to set the `NEXT_PUBLIC_STAGING` variable to `true`. The absence of this variable will make your execution use the production airtable iframes for mentors and opportunities.

### Step 5: Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Learn More

To learn more about Next.js and React.js, explore the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React.js Documentation](https://react.dev/)
