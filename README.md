# 🏠 Airbnb Clone — Node.js + MongoDB

A full-stack Airbnb-inspired web application built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **Tailwind CSS**. Supports host and guest flows — listing homes, browsing, booking, and managing favourites.



## ✨ Features

- 🔐 **Authentication** — Signup & Login with session-based auth
- 🏡 **Host Dashboard** — Add, edit, and manage property listings with image uploads
- 🔍 **Browse & Explore** — View all available listings with details
- 📅 **Booking System** — Reserve properties with date selection
- ❤️ **Favourites** — Save and view favourite listings
- 📦 **File Uploads** — Image uploads for listings via `multer`
- 🎨 **Tailwind CSS** — Responsive, utility-first styling
- 🔄 **Hot Reloading** — Development server with `nodemon`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Templating | EJS |
| Styling | Tailwind CSS |
| Auth | express-session + bcrypt |
| File Upload | Multer |
| Validation | Validator.js |
| Dev Tool | Nodemon |

---

## 📁 Project Structure

```
AIRBNB-MONGOOSE-DB/
├── routes/
│   ├── authRouter.js       # Login & signup routes
│   ├── hostRouter.js       # Host listing management
│   └── storeRouter.js      # Guest browsing & booking
├── views/
│   ├── auth/               # login.ejs, signup.ejs
│   ├── host/               # add_home, edit_home, host_home_list
│   ├── store/              # home_list, home_details, booking, reserve, favourites
│   └── partials/           # head, header, favourites
├── utils/
│   ├── databaseUtil.js     # MongoDB connection setup
│   └── path.js             # Path utilities
├── public/                 # Static assets (CSS)
├── upload/                 # Uploaded listing images
├── src/
│   └── input.css           # Tailwind source CSS
├── nodemon.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/airbnb-mongoose-db.git
cd airbnb-mongoose-db

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/airbnb
SESSION_SECRET=your_secret_key_here
PORT=3000
```

### Build Tailwind CSS

```bash
npx tailwindcss -i ./src/input.css -o ./public/output.css --watch
```

### Run the App

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 🔑 Routes Overview

### Auth
| Method | Route | Description |
|---|---|---|
| GET | `/auth/login` | Login page |
| POST | `/auth/login` | Handle login |
| GET | `/auth/signup` | Signup page |
| POST | `/auth/signup` | Register new user |

### Store (Guest)
| Method | Route | Description |
|---|---|---|
| GET | `/` | Home / listing index |
| GET | `/homes` | Browse all homes |
| GET | `/homes/:id` | View home details |
| POST | `/homes/:id/book` | Book a home |
| GET | `/favourites` | View favourites |

### Host
| Method | Route | Description |
|---|---|---|
| GET | `/host/homes` | Host's listings |
| GET | `/host/add` | Add new listing form |
| POST | `/host/add` | Create new listing |
| GET | `/host/edit/:id` | Edit listing form |
| POST | `/host/edit/:id` | Update listing |

---

## 📦 Key Dependencies

```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "ejs": "^3.x",
  "bcryptjs": "^2.x",
  "express-session": "^1.x",
  "multer": "^1.x",
  "tailwindcss": "^4.x",
  "validator": "^13.x",
  "nodemon": "^3.x"
}
```

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/kunal123kumar)

---

> Built as a learning project to explore full-stack web development with Node.js and MongoDB.
