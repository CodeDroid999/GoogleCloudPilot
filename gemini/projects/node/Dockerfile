# Use official Node.js lightweight image
FROM node:20-slim

# Set the working directory
WORKDIR /gemini/projects/node

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source
COPY . .

# Expose port for Cloud Run or local dev
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
