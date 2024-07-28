# Aciktim Project

## Overview

**Aciktim** is a dynamic food ordering application designed to offer a seamless and user-friendly experience for ordering meals. The project is built using modern web technologies including React for the frontend and Node.js with Sequelize for the backend.

## Features

- **User Registration and Authentication**: Secure user signup and login.
- **Product Management**: Easy search and filtering of products.
- **Order Management**: Real-time order tracking and management.
- **Cart System**: Real-time updates to the cart items and quantities.
- **Reviews and Ratings**: Users can review and rate products.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express, Sequelize, JWT
- **Database**: MySQL
- **Others**: CKEditor integration, File upload feature

## Getting Started

### Prerequisites

- Node.js
- MySQL
- Git

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/aciktim.git
    ```

2. Navigate to the project directory:

    ```bash
    cd aciktim
    ```

3. Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

4. Install frontend dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

### Configuration

1. Set up your MySQL database and update the database configuration in the backend.

    ```json
    // backend/config/config.json
    {
      "development": {
        "username": "root",
        "password": null,
        "database": "aciktim_development",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      ...
    }
    ```

2. Create a `.env` file in the backend directory with the following content:

    ```env
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

2. Start the frontend server:

    ```bash
    cd ../frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out to `your-email@example.com`.

