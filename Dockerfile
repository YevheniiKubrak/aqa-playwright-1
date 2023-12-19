FROM mcr.microsoft.com/playwright:v1.40.1-jammy

COPY . /aqa-playwright-1
WORKDIR /aqa-playwright-1

RUN npm ci

CMD ["npm", "test"]