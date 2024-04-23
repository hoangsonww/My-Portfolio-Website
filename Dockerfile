# All instructions to run this containerized app are given as comments throughout this file
# Author: Son Nguyen

# Use a specific version of Node.js as a base image
FROM node:14

# Set arguments for passing build-time variables (they can vary based on your environment)
ARG NODE_ENV=production
ARG SOME_BUILD_ARG
ARG SOME_OTHER_BUILD_ARG

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PATH /src/node_modules/.bin:$PATH
ENV PORT=8080

# Set the working directory inside the container
WORKDIR /src

# Install global npm dependencies if any
RUN npm install -g some-global-package

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies (including 'devDependencies' if NODE_ENV is not set to 'production')
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
    fi
RUN npm install --only=production
RUN npm install express

# Copy the rest of the application's source code
COPY . .

# If your application requires build steps, include them here
RUN npm run build

# The application's port number
EXPOSE $PORT

# Add a health check (optional)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
CMD node healthcheck.js

# Set user to use when running this image
# Non-root user for better security (if applicable)
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs
USER nodejs

# Run the application
CMD ["npm", "start"]
