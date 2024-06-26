# Votesphere Frontend Documentation

## Introduction

Welcome to the Votesphere frontend documentation. This guide provides an overview of the Votesphere voting application's frontend, outlining its features, technologies used, installation instructions, code organization, and guidelines for contributing.

## Features

1. **User Authentication**: Secure login and registration functionalities for administrators (Admin) and regular members (Member).
2. **Poll Creation and Management**: Ability for Admins to create, edit, and delete polls, and for Members to view and participate in polls.
3. **Voting Mechanism**: Allows Members to cast their votes on active polls within their assigned groups.
4. **Group Creation and Member Management**: Admins can create and manage groups, including adding and removing members.

## Technologies Used

-   **Typescript**: Provides type safety and enhanced tooling for JavaScript development.
-   **axios**: Handles HTTP requests to interact with the backend APIs.
-   **tailwind css**: Utilized for styling and UI components to ensure a responsive and modern interface.
-   **Docker**: Enables containerization for easy deployment and scalability of the application.

## Installation

To set up the Votesphere frontend on your local environment, follow these steps:

### Prerequisites

-   **Docker**

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/beka-birhanu/votesphere--frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd votesphere--frontend
    ```
3. Build image and start server:
    ```bash
    docker-compose up --build
    ```
4. Open your browser and navigate to `http://localhost:3000`.
 <p align="center">
 <img src="./screen-shots/home + members.png" alt="home" >
 </p>

## Code Organization

The Votesphere frontend project is organized as follows:

-   **src/**: This directory contains the source code for the application.
    -   **components/**:Reusable React components for consistent UI elements.
    -   **hooks/**: Custom hooks for managing state and reusable logic across components.
    -   **API/**: Contains Axios configuration and API service files to communicate with the backend.
    -   **docs/**: Documentation files related to the frontend setup and usage.

## Contributing Guide

Thank you for contributing to our project! Here's how you can get started:

1. **Component Modularity(it is ok to repeat your self)**: Avoid over-modularizing components unnecessarily. Components should be separated logically rather than for the sake of code cleanliness alone.
2. **Functional Components**: Use functional components over class-based components to maintain consistency and leverage React's latest features..
3. **Format Code**: Utilize Prettier to format your code according to the settings specified in `.prettierrc`.
4. **Commit Changes**: Follow the guidelines outlined in the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for writing commit messages.
