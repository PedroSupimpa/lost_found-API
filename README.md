
# Lost&Found Backend API

Welcome to the backend API repository for the "Lost&Found" project. This project serves as the backend for the Lost&Found application, where users can post lost items or found items to help connect them with their owners. This README will provide you with essential information to get started with the project.

## Technologies Used

- Node.js
- TypeScript
- Express.js
- PostgreSQL 
- TypeORM
- Postman 

## Getting Started

To run the Lost&Found Backend API on your local machine, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/lost-and-found-backend.git

    Install dependencies:

    bash

cd lost-and-found-backend
npm install

Create a PostgreSQL database and update the database connection configuration in the ormconfig.json file to match your database settings.

Run database migrations to create the necessary tables:

bash

npm run typeorm:migrate

Start the server:

bash

    npm run start

    The API should now be running locally at http://localhost:3000.

