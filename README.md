
# VoteSphere - Group Poll Manager

VoteSphere is a poll management application that allows users to work together within groups, managing polls efficiently. The application provides user authentication, authorization, and group-based poll management.

## Features

- **Authentication and Authorization:**
  - User registration, login, and logout.
  - Role-based access control (e.g., Admin, Member).

- **Group Management:**
  - Create groups and add members.
  - View and manage polls within groups.

- **Poll Management:**
  - Create polls within groups with questions and options.
  - View a list of polls within groups.
  - Cast a vote on polls.
  - Close polls.

## Technologies Used

- **Backend:**
  - **NestJS:** Modular backend structure with separate modules for authentication and authorization, group management, and poll management.
  - **JWT:** Token-based authentication.
  - **Swagger:** Documenting the API endpoints.

- **Database:**
  - **PostgreSQL:** Data storage.

- **Frontend:**
  - **Typescript:** Provides type safety and enhanced tooling for JavaScript development.
  - **Axios:** Handles HTTP requests to interact with the backend APIs.
  - **Tailwind CSS:** Utilized for styling and UI components to ensure a responsive and modern interface.

- **Containerization:**
  - **Docker:** Containerization for easy deployment and scalability of the application.

## Installation

To run VoteSphere locally, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Step 1: Clone the Repository

``` bash
git clone git@github.com:beka-birhanu/votesphere.git
cd votesphere
```

### Step 2: Set up Environment Variables

Update the  `.env ` file in the root directory with your desired JWT secret:

 ``` plain-text
JWT_SECRET=your_new_jwt_secret
 ```

### Step 3: Update Database Password

Modify the docker-compose.yml file to set your PostgreSQL database password.

In  ` docker-compose.yml `:

 ```yaml
db:
  image: postgres:13
  ports:
    - '5432:5432'
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: your_new_password # change this line
    POSTGRES_DB: votesphere
  networks:
    - votesphere-networks
 ` ` `

In  `app.module.ts `:

 ` ` `ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'your_new_password', // change this to the password you set in docker-compose.yml
  database: 'votesphere',
  autoLoadEntities: true,
  entities: [User, Group, PollOption, Poll],
  synchronize: true,
});
 ```

### Step 4: Start the Application
     ` ` `bash
    docker-compose up --build
     ` ` `

### Step 5: final step
4. Open your browser and navigate to  `http://localhost:3000 `.

<p align="center">
<img src="./frontend/screen-shots/home + members.png" alt="home">
</p>

## Accessing the Backend API

Visit  `http://localhost:9000/api ` in your web browser to access the backend API.

![API docs](./backend/screenshot/api-docs.png)

## Code Organization

### Backend

The backend project is organized into the following modules:

- **Authentication and Authorization**
- **Group Management**
- **Poll Management**

### Frontend

The frontend project is organized as follows:

- **src/**: This directory contains the source code for the application.
  - **components/**: Reusable React components for consistent UI elements.
  - **hooks/**: Custom hooks for managing state and reusable logic across components.
  - **API/**: Contains Axios configuration and API service files to communicate with the backend.
  - **docs/**: Documentation files related to the frontend setup and usage.

## Contributing Guide

Thank you for contributing to our project! Here's how you can get started:

1. **Adhere to Design Patterns**: Make necessary modifications to the codebase in accordance with the design patterns endorsed by [NestJS](https://docs.nestjs.com/).
2. **Format Code**: Utilize Prettier to format your code according to the settings specified in  `.prettierrc `.
3. **Commit Changes**: Follow the guidelines outlined in the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for writing commit messages.
4. **Component Modularity**: Avoid over-modularizing components unnecessarily. Components should be separated logically rather than for the sake of code cleanliness alone.
5. **Functional Components**: Use functional components over class-based components to maintain consistency and leverage React's latest features.
6. **Add Humor**: Include some well-known jokes to keep things entertaining!
