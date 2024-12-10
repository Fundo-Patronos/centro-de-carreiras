# Use a lightweight Node.js image for building the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy all files and build the app
COPY . .
RUN pnpm run build

# Start a new stage for production
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the necessary files for production
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY package.json ./ 

# Expose the port the app runs on
EXPOSE 3000

# Healthcheck to monitor the container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://localhost:3000/ || exit 1

# Run the application
CMD ["pnpm", "start"]
