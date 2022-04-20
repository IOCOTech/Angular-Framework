# Stage 0, "build", based on Node.js, to build and compile the frontend
FROM node:14 as build

# # install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /app
COPY package*.json /app/
RUN npm install
# Install specific angular version, if the app updates this must be updated as well
RUN npm install -g @angular/cli@13.3.3
COPY ./ /app/
# Run unit tests
RUN ng test --code-coverage --browsers ChromeHeadlessNoSandbox --watch=false; exit 0
# Configuration can be read from environmental variables setup on the CI/CD server
ARG configuration=production
# Build the angular application
RUN ng build --output-path=./dist --configuration $configuration


# Use official nginx image as the base image
FROM nginx:1.19.6-alpine
# Copy the build output to replace the default nginx contents.
COPY --from=build /app/analytics/ut_report.xml /analytics/ut_report.xml
COPY --from=build /app/analytics/coverage/lcov/lcov.info /analytics/lcov.info
COPY --from=build /app/analytics/junit/report.xml /analytics/junit_report.xml
COPY --from=build /app/analytics/coverage/cobertura-coverage.xml /analytics/cobertura-coverage.xml

COPY --from=build /app/dist /usr/share/nginx/html 
# Copy the default nginx.conf
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
## Add jq to image for config.json replacement
ENV JQ_VERSION=1.5
RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
RUN cp /tmp/jq-linux64 /usr/bin/jq
RUN chmod +x /usr/bin/jq

## Copy the Run.sh into container and give execute permission
COPY /run.sh /run.sh
RUN chmod +x /run.sh

# Expose port 80
EXPOSE 80

CMD ["/run.sh"]
