# Use Node.js LTS version as the base image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose port if needed (for documentation or demo purposes)
# EXPOSE 3000

# Command to run when container starts
CMD ["node", "-e", "console.log('Selectus library is ready to use!')"]