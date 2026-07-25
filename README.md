# 🔍 Lost & Found Platform

A modern web application that helps people report, discover, and recover lost items within a college campus, organisation, or city. Users can post lost or found items, search listings, and securely connect with the rightful owner.

---

## ✨ Features

### 👤 Authentication

- User registration & login
- Secure JWT authentication
- Password hashing with bcrypt
- Protected routes

### 📦 Lost & Found Listings

- Report lost items
- Report found items
- Upload multiple images
- Edit or delete your own listings
- Mark items as recovered

### 🔎 Search & Filters

- Search by title or description
- Filter by category
- Filter by location
- Filter by status (Lost / Found / Recovered)
- Sort by newest or oldest

### 🖼 Image Uploads

- Upload item photos
- Image preview
- Secure file validation

### 🤝 Claim Requests

- Request ownership of found items
- Accept or reject claims
- Track claim status

### 📍 Item Details

- Item description
- Category
- Date lost/found
- Location
- Contact information
- Uploaded images

### 👤 User Dashboard

- View your reports
- Manage listings
- Track claim requests
- Recover deleted listings (optional)

### 🛡 Admin Panel

- Manage users
- Remove inappropriate listings
- Approve reported items
- Dashboard statistics

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Multer

### Database

- PostgreSQL

### Storage

- Cloudinary (or AWS S3)

---

## 📂 Project Structure

```text
lost-found-platform/
│
├── client/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── ...
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/lost-found-platform.git
```

### Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

## ⚙ Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## ▶ Running the project

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

## 📡 API Overview

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register user       |
| POST   | `/api/auth/login`    | Login               |
| GET    | `/api/items`         | Get all items       |
| GET    | `/api/items/:id`     | Get item            |
| POST   | `/api/items`         | Create item         |
| PATCH  | `/api/items/:id`     | Update item         |
| DELETE | `/api/items/:id`     | Delete item         |
| POST   | `/api/claims/:id`    | Submit claim        |
| PATCH  | `/api/claims/:id`    | Update claim status |

---

## 🗺 Roadmap

- [ ] Email verification
- [ ] Password reset
- [ ] Push notifications
- [ ] Real-time messaging
- [ ] QR code for item verification
- [ ] Google Maps integration
- [ ] AI-powered image matching
- [ ] Full-text search
- [ ] Progressive Web App (PWA)
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you find this project helpful, consider giving it a ⭐ on GitHub.
