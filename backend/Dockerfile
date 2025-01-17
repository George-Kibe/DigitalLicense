# Use the official Node.js 20 Alpine image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]