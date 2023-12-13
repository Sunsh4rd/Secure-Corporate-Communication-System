FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

CMD [ "npm", "start" ]

# Build the React app
RUN npm run build

# # Serve stage
# FROM nginx:latest

# # Copy the custom nginx.conf file to the container
# COPY .docker/nginx.conf /etc/nginx/nginx.conf

# # Copy the built React app from the build stage to the nginx container
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]