FROM node:latest as build
WORKDIR /usr/local/app
COPY .. /usr/local/app/
RUN npm install
RUN npm run build


FROM nginx:latest as prod
COPY --from=build /usr/local/app/dist/fe-devops /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t fe-devops .
# docker run -p 4200:80 <image_id>
