#!/bin/bash
npx prisma db push --force-reset
npm run dbSetup
npm start