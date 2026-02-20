# Use the official Node.js 20 Alpine image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files (package.json and package-lock.json if present)
COPY package*.json ./

# Install production dependencies only (smaller image, faster build)
RUN npm ci

# Copy the entire application source code into the container
COPY . .

# Build the Nuxt application (generates the .output/ directory)
# This step must run inside the container to ensure OS compatibility
RUN npm run build

# Expose port 3000 (default Nitro server port)
EXPOSE 3000

# Start the Nuxt SSR server using the generated Nitro output
CMD ["node", ".output/server/index.mjs"]