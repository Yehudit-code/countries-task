# Countries API

Backend service for managing countries data.

## Features
- Import countries from external API (only if database is empty)
- CRUD operations for countries
- MongoDB Atlas integration
- Global error handling middleware
- Jest testing

## Tech Stack
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Jest

## API Endpoints

### Import countries
POST /countries/import

### Get all countries
GET /countries

### Get country by id
GET /countries/:id

### Update country
PUT /countries/:id

### Delete country
DELETE /countries/:id

## Running the project

```bash
npm install
npm run dev
