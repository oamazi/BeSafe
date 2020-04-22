# BeSafe
BeSafe (Backend) - Homathone Project

## Description

A Platform for tracking employees and people to avoid Coronavirus (COVID-19)
this platform was built using http://Fastify.io (Fastify 2.13.1) on NodeJS v13.12.0, NPM 6.14.4

## Installation

```bash
$ npm install
$ npm update
```

## Usage

```bash
# development: hot reload with nodemon
$ npm run dev or npm start

# clean
$ npm run clean

# debug
$ npm run debug

# format with prettier
$ npm run format

# build for production
$ npm run build

# production
$ npm run prod

# pm2 (after build)
pm2 start dist/server.js --env production
