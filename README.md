# E-commerce Egypt Store

> A modern, full-featured e-commerce platform designed for the Egyptian market

## 🌟 Overview

E-commerce Egypt Store is a comprehensive online shopping platform that provides a seamless buying and selling experience. This project aims to deliver a robust, scalable, and user-friendly e-commerce solution tailored for Egyptian businesses and consumers.

## ✨ Key Features

### Customer Features
- **User Authentication & Authorization**
  - Secure user registration and login
  - Password reset functionality
  - Social media authentication (optional)
  - Guest checkout option

- **Product Browsing & Search**
  - Advanced product search with filters
  - Category-based navigation
  - Product sorting (price, popularity, rating)
  - Product details with multiple images
  - Product reviews and ratings

- **Shopping Cart & Wishlist**
  - Add/remove items from cart
  - Update product quantities
  - Save items for later (Wishlist)
  - Persistent cart across sessions

- **Checkout Process**
  - Streamlined single-page checkout
  - Multiple shipping addresses
  - Order summary and review
  - Promo code/discount application

- **Payment Integration**
  - Multiple payment methods support
  - Secure payment gateway integration
  - Order confirmation and receipts

- **User Account Management**
  - Order history and tracking
  - Profile management
  - Saved addresses
  - Notification preferences

### Admin Features
- **Dashboard**
  - Sales analytics and reports
  - Revenue tracking
  - Customer insights
  - Inventory overview

- **Product Management**
  - Add/edit/delete products
  - Bulk product upload
  - Category management
  - Inventory tracking
  - Product variants (size, color, etc.)

- **Order Management**
  - View and process orders
  - Update order status
  - Generate invoices
  - Handle returns/refunds

- **User Management**
  - View customer accounts
  - Manage permissions
  - Handle customer inquiries

- **Content Management**
  - Banner and promotion management
  - Featured products
  - SEO optimization tools

## 🛠 Tech Stack

### Frontend
- **Framework/Library**: React.js / Angular / Vue.js
- **State Management**: Redux / Context API
- **Styling**: CSS3 / SCSS / Tailwind CSS / Bootstrap
- **HTTP Client**: Axios / Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB / MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express Validator

### Additional Technologies
- **Payment Gateway**: Stripe / PayPal / Paymob (Egypt)
- **Image Storage**: Cloudinary / AWS S3
- **Email Service**: SendGrid / Nodemailer
- **Deployment**: Heroku / AWS / DigitalOcean / Vercel

## 📁 Project Structure

```
E-commerce-Egypt-Store/
├── client/                 # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # State management
│   │   ├── services/      # API services
│   │   ├── utils/         # Helper functions
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── server/                # Backend application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Helper functions
│   ├── server.js         # Entry point
│   └── package.json
│
├── uploads/              # Uploaded files (gitignored)
├── .env.example          # Environment variables example
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or higher)
- npm or yarn
- MongoDB (if using MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohamedibrahimx123/E-commerce-Egypt-Store-.git
   cd E-commerce-Egypt-Store-
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/ecommerce-egypt
   # OR for MySQL
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=ecommerce_egypt
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   
   # Payment Gateway (Example: Stripe)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   
   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```
   
   Create a `.env` file in the `client` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

5. **Initialize Database**
   
   For MongoDB:
   ```bash
   # Start MongoDB service
   mongod
   
   # Optional: Seed database with sample data
   cd server
   npm run seed
   ```
   
   For MySQL:
   ```bash
   # Run database migrations
   cd server
   npm run migrate
   
   # Optional: Seed database
   npm run seed
   ```

### Running the Application

**Development Mode:**

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Backend will run on: `http://localhost:5000`

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   cd client
   npm start
   ```
   Frontend will run on: `http://localhost:3000`

**Production Mode:**

1. **Build the Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the Production Server**
   ```bash
   cd server
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/logout` | User logout | Yes |
| GET | `/auth/me` | Get current user | Yes |
| PUT | `/auth/updateprofile` | Update user profile | Yes |
| POST | `/auth/forgotpassword` | Request password reset | No |
| PUT | `/auth/resetpassword/:token` | Reset password | No |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get single product | No |
| POST | `/products` | Create product | Yes (Admin) |
| PUT | `/products/:id` | Update product | Yes (Admin) |
| DELETE | `/products/:id` | Delete product | Yes (Admin) |
| POST | `/products/:id/reviews` | Add product review | Yes |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/orders` | Get all orders (Admin) | Yes (Admin) |
| GET | `/orders/myorders` | Get user orders | Yes |
| GET | `/orders/:id` | Get single order | Yes |
| POST | `/orders` | Create new order | Yes |
| PUT | `/orders/:id/pay` | Update order to paid | Yes |
| PUT | `/orders/:id/deliver` | Update order to delivered | Yes (Admin) |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | No |
| POST | `/categories` | Create category | Yes (Admin) |
| PUT | `/categories/:id` | Update category | Yes (Admin) |
| DELETE | `/categories/:id` | Delete category | Yes (Admin) |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user cart | Yes |
| POST | `/cart` | Add item to cart | Yes |
| PUT | `/cart/:id` | Update cart item | Yes |
| DELETE | `/cart/:id` | Remove cart item | Yes |
| DELETE | `/cart` | Clear cart | Yes |

## 🧪 Testing

Run tests using:

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# Run tests with coverage
npm run test:coverage
```

## 🔐 Security Features

- **Password Hashing**: BCrypt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express Validator for input sanitization
- **CORS Protection**: Configured CORS policies
- **Rate Limiting**: Protection against brute force attacks
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization and output encoding
- **Helmet.js**: Security headers configuration

## 🌍 Localization

The platform supports both English and Arabic languages to cater to the Egyptian market:
- Arabic (العربية) - Default
- English

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the application:
   ```bash
   cd client
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

### Backend Deployment (Heroku)

1. Create a Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Set environment variables:
   ```bash
   heroku config:set KEY=value
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

### Full Stack Deployment (AWS/DigitalOcean)

Refer to the deployment guide in `docs/DEPLOYMENT.md` for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## 📝 Code Style

This project follows standard JavaScript/TypeScript coding conventions:
- ESLint for code linting
- Prettier for code formatting
- Airbnb style guide

Run linting:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## 🐛 Known Issues

- [ ] Mobile payment integration pending for some Egyptian payment gateways
- [ ] Advanced analytics dashboard under development
- [ ] Real-time inventory sync with third-party systems in progress

## 📋 Roadmap

- [ ] Mobile application (React Native)
- [ ] Multi-vendor marketplace support
- [ ] Advanced recommendation engine
- [ ] Live chat support integration
- [ ] Progressive Web App (PWA) features
- [ ] Social commerce integration
- [ ] Augmented Reality (AR) for product preview
- [ ] Voice search functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mohamed Ibrahim** - *Initial work* - [mohamedibrahimx123](https://github.com/mohamedibrahimx123)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by leading e-commerce platforms
- Egyptian developer community for feedback and support

## 📞 Support

For support, email support@egyptstore.com or join our Discord channel.

## 🔗 Links

- **Project Homepage**: [https://github.com/mohamedibrahimx123/E-commerce-Egypt-Store-](https://github.com/mohamedibrahimx123/E-commerce-Egypt-Store-)
- **Issue Tracker**: [https://github.com/mohamedibrahimx123/E-commerce-Egypt-Store-/issues](https://github.com/mohamedibrahimx123/E-commerce-Egypt-Store-/issues)
- **Documentation**: [https://docs.egyptstore.com](https://docs.egyptstore.com)

---

**Note**: This project is actively maintained. For the latest updates, please check the repository regularly.

Made with ❤️ in Egypt 🇪🇬