# Build app using our gdc-node image which already contains yarn
FROM harbor.intgdc.com/tools/gdc-node:63bb0d9 as build-stage
WORKDIR /app
COPY ./ /app/
RUN yarn install-with-retry
RUN CI=true yarn test-once
# run webpack build with customised public path base
RUN yarn build --env.basePath="/fraudinsights"

# Create final image with nginx serving built files; the nginx-unprivileged variant is used
# as we must not run images in the context of the superuser. This image comes with user 'nginx' with UID 101 and
# runs as that user by default. The UID of this user is also used in runAsUser directive in the deployment-ui chart.
#
FROM harbor.intgdc.com/3rdparty/nginxinc/nginx-unprivileged:1.17.2-alpine
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/fraudinsights
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

ARG GIT_COMMIT=unspecified
LABEL image_name="SBA for MasterCard Fraud Insights"
LABEL maintainer="Lubomir Slivka <lubomir.slivka@gooddata.com>"
LABEL git_repository_url="https://github.com/gooddata/gdc-mastercard-fi/"
LABEL parent_image="harbor.intgdc.com/3rdparty/nginxinc/nginx-unprivileged:1.17.2-alpine"
LABEL git_commit=$GIT_COMMIT
