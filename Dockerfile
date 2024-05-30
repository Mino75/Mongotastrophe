# Use a base image with Node.js pre-installed
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Babel and related dependencies
RUN npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/runtime


# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Transpile the code using Babel
RUN npm run build

# Command to run the application
CMD ["node", "app.js"]