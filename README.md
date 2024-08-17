
# ILA Frontend Case Study

This repository contains the solution for the ILA Frontend Developer (React) Case Study. The project is a full-stack application that integrates authentication, state management, and CRUD operations with a product management dashboard. The application has been developed using React.js, and it includes a login system, a registration form, and a product management dashboard.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Notes](#notes)
- [Contact](#contact)

## Project Overview

The goal of this project was to develop a full-stack application that integrates with an authentication service (Auth0), manages state using Redux Toolkit and React Context, and performs CRUD operations on products using the Fake Store API. The application has been styled with Bootstrap and deployed on Vercel.

## Features

- **Authentication**: Implemented using Auth0, with a login page that redirects to a registration form upon successful login.
- **Registration**: A registration page that redirects to the product management dashboard upon completion.
- **Dashboard**: A dashboard with a Product List Page and Product Details Page, featuring:
  - **Product List Page**: Displays a list of products fetched from the Fake Store API using React Table.
  - **Product Details Page**: Provides a detailed view of the selected product with an option to return to the product list.
- **State Management**: Global state management using Redux Toolkit and user authentication state management using React Context.
- **Routing**: Smooth navigation between pages using React Router DOM.
- **Styling**: Responsive design and user-friendly interface using Bootstrap.

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Redux Toolkit**: For managing global state.
- **React Context**: For managing user authentication state.
- **Auth0**: Authentication service.
- **Fake Store API**: API for product CRUD operations.
- **Axios**: Promise-based HTTP client for API calls.
- **React Table**: For displaying product lists in a tabular format.
- **React Router DOM**: For client-side routing.
- **Bootstrap**: For styling the application.
- **Vercel**: For deployment.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/omer0697/ilabour-task.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd ilabour-task
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Configure Auth0**:
   - Set up an Auth0 application and replace the placeholders in the `.env` file with your Auth0 credentials.

5. **Run the development server**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Deployment

The application is deployed on Vercel. You can access the live version [here](https://your-vercel-link.vercel.app).

To deploy your own version:

1. **Sign up or log in to Vercel**: [Vercel](https://vercel.com/).
2. **Connect your GitHub repository**.
3. **Deploy the application** directly from your repository.

## Folder Structure

```plaintext
.
├── public
├── src
│   ├── components
│   ├── pages
│   ├── store
│   ├── App.js
│   ├── index.js
├── .env
├── package.json
└── README.md
```

- **`components/`**: Reusable components used throughout the application.
- **`pages/`**: Individual pages such as Login, Registration, Product List, and Product Details.
- **`store/`**: Redux Toolkit slices for managing global state.
- **`.env`**: Environment variables for Auth0 configuration.
- **`App.js`**: Main application component with routing.
- **`index.js`**: Entry point of the application.

## Notes

- This project does not include a backend. The registration form data is not saved.
- All API calls are handled using Axios and are integrated with the Fake Store API.

## Contact

If you have any questions or suggestions, feel free to reach out to me at [omer_yurtseven1997@outlook.com](mailto:omer_yurtseven1997@outlook.com).
