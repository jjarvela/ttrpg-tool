FROM node:20-bookworm
# Install updates & Bash
RUN apt-get update
RUN apt-get install bash
RUN npm install -g npm@latest
# Copy source and install dependencies
WORKDIR /ttrpg-tool
COPY . . 
COPY ./deployment/locale.conf ../etc/locale.conf

RUN npm install
RUN chmod +x ./deployment/container_start.sh

# ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_PUBLIC_BASE_URL https://ttrpg-dev.azurewebsites.net:443
EXPOSE 3000
# Start script exprects $DATABASE_URL to be set with relevant values.
CMD /bin/bash ./deployment/container_start.sh