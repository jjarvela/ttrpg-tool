FROM node:20-bullseye
COPY . .
RUN npm install -g npm@10.7
RUN npm install
RUN npm run build
RUN npm run dbSetup
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "start"]