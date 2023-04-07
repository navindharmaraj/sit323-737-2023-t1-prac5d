# Use Node.js version 16
FROM node:16-alpine

# Create a directory for the app
WORKDIR /app

# Copy the package.json and package-lock.json files to the app directory
COPY package*.json ./

# Install app dependencies
RUN npm install --unsafe-perm=true --allow-root

# Copy the rest of the app files to the app directory
COPY . .

# Expose port 3000
EXPOSE 5005

# Start the app
CMD ["npm", "start"]
HEALTHCHECK --interval=10s --timeout=2s --start-period=15s \
  CMD curl --fail http://localhost:3000/api/health || exit 1
