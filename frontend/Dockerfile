# Use a lightweight Node.js image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all files and build the app
COPY . .
RUN npm run build

# Start a new stage for production
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files for production
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY package.json ./

EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
