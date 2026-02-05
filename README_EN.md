# 🎵 Vinyl Store

A modern web application for vinyl record management and sales, built with Node.js and Express.

[Versão em Português](README.md)


## 📋 About the Project

Vinyl Store is a complete e-commerce platform specialized in vinyl records. The application offers a modern and intuitive experience for collectors and analog music lovers, allowing browsing, searching, and purchasing vinyl records from various musical genres.

🎯 **Architecture and Approach**

This project was developed following a **minimalist full stack architecture** with the Express framework, prioritizing simplicity and efficiency. The system implements a robust authentication mechanism based on HTTP cookies, where credentials are securely transmitted through request headers. To ensure control and security, user sessions are persisted in the PostgreSQL database, enabling continuous validation and centralized management of active sessions.

🔧 **Needed Improvements**

- **Payment Gateway:** Integration with payment providers (Stripe, PayPal, Mercado Pago)
- **Image Lazy Loading:** Loading optimization for better performance
- **Messaging Service:** Notification and user communication system (email, SMS)

## ✨ Features

- 🛍️ **Product Catalog**: Complete browsing of available vinyl records
- 🔍 **Search System**: Find vinyl records by artist, album, or genre
- 🛒 **Shopping Cart**: Add and manage your items
- 👤 **User Authentication**: Login and registration system
- 📦 **Order Management**: Track your purchases
- 📱 **Responsive Design**: Works perfectly on all devices

## 🚀 Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Minimalist web framework
- **PostgreSQL** - Relational database
- **node-pg-migrate** - Database migration management

### Frontend
- **HTML5/CSS3** - Structure and styling
- **JavaScript** - Client-side interactivity

### Development Tools
- **ESLint** - JavaScript code linting
- **Prettier** - Code formatting

### Deploy
- **Netlify** - Hosting and serverless functions
- **Netlify Functions** - Serverless functions

## 📦 Project Structure

```
vinyl-store/
├── controllers/       # Application controllers
├── routes/            # Route definitions
├── middleware/        # Custom middlewares
├── infra/             # Infrastructure and DB configurations
├── public/            # Static files (CSS, JS, images)
├── netlify/          
│   └── functions/    # Serverless functions
├── data.js           # Data and models
├── package.json      # Project dependencies
├── netlify.toml      # Netlify configurations
└── .example.env      # Environment variables example
```

## 🛠️ Installation and Setup

### Prerequisites

- Node.js (version 22 or higher)
- PostgreSQL (version 16 or higher)
- npm

### Step by Step

1. **Clone the repository**
```bash
git clone https://github.com/cristiangiehl1/vinyl-store.git
cd vinyl-store
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .example.env .env
```

Edit the `.env` file with your settings:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/vinyl_store
PORT=3000
NODE_ENV=development
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8000`


## 🗄️ Database

The project uses PostgreSQL as the database and node-pg-migrate for migration management. Migrations ensure that the database schema is always updated and versioned.

### Running Migrations

```bash
# Apply all pending migrations
npm run migrations:up

# Rollback the last migration
npm run migrations:down

# Create a new migration
npm run migrations:create migration-name
```

## 🌐 Deploy

The project is configured for automatic deployment on Netlify. The `netlify.toml` file contains all necessary configurations.

### Manual Deploy

1. Login to Netlify CLI
```bash
netlify login
```

2. Deploy
```bash
npm run deploy
```

## 👤 Author

**Cristian Giehl**

- GitHub: [@cristiangiehl1](https://github.com/cristiangiehl1)