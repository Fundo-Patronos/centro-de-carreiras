# Use a lightweight Node.js image for building the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all files and build the app
COPY . .

ARG NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
RUN echo "API URL durante o build: $NEXT_PUBLIC_API_URL"
RUN npm run build

# Start a new stage for production
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only the necessary files for production
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Healthcheck to monitor the container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://localhost:3000/ || exit 1

# Run the application
CMD ["npm", "run", "start"]
