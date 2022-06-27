FROM nginx:1.21.6 AS ngi

# WORKDIR /dist/src/app
COPY dist/ /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80


## Complete Image, Use this if you have a CI Environment 

# FROM node:16.14-alpine3.14 AS build

# WORKDIR /dist/src/app

# RUN npm cache clean --force

# COPY . .

# RUN npm install

# RUN npm i -g @angular/cli

# RUN ng build --prod

# FROM nginx:1.21.6 AS ngi

# COPY --from=build /dist/src/app/dist/ /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# EXPOSE 80