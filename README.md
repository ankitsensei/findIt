# findIt

A community-powered lost & found platform. Report what you lost or what you found, pin it on a map, and reconnect with the rightful owner.

Live backend: [https://find-it-server-ivory.vercel.app/](https://find-it-server-ivory.vercel.app/)

---

## Screenshots

![Home page](screenshots/home.png)
![Lost items page](screenshots/lostitem.png)
![Found items page](screenshots/founditem.png)

---

## Features

### Authentication

- Register with email + password and 6-digit OTP email verification
- Login with JWT (7-day expiry)
- Sign in with Google (OAuth 2.0)

### Listings

- Report lost or found items with photo, description, location, and map pin
- Search listings by name/description
- Paginated listings (20 per page)
- Interactive map showing item locations (Leaflet + OpenStreetMap)

### Recovery workflow

- Contact the item owner directly by sending a message (delivered by email)
- Owners can mark their own items as **resolved**
- Resolved items are hidden from public listings and shown with a RESOLVED badge

### Profile & dashboard

- View account info (username, email, join date)
- Edit username
- Stats: lost posted, found posted, returned, total reports
- "Lost by Me" and "Found by Me" listing pages

---

## Tech Stack

### Frontend

- React 19
- Vite 8
- Tailwind CSS 4
- React Router 8
- react-hook-form
- Axios
- Leaflet (maps)
- lucide-react (icons)
- react-hot-toast

### Backend

- Node.js
- Express 5
- PostgreSQL (pg)
- JSON Web Tokens (jsonwebtoken)
- bcrypt
- Multer (file uploads)
- Cloudinary (image storage)
- Nodemailer (email)
- Passport.js (Google OAuth)

---

## Project Structure

```text
findIt/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Navbar, ViewDetails, MapView, LocationPicker
│       ├── pages/           # Home, LostIt, FoundIt, MyLosts, MyFounds, Profile, auth pages
│       ├── App.jsx
│       └── main.jsx         # Router setup
│
└── server/                  # Express API
    ├── config/              # Mailer, Passport
    ├── middleware/          # Auth, upload
    ├── routes/              # User, lost item, found item, auth routes
    ├── utils/
    └── index.js             # App entrypoint + route registration
```

---

## Getting Started

### Prerequisites

- Node.js (18+)
- PostgreSQL database
- A Cloudinary account (image storage)
- A Gmail account with an app password (email verification)
- Google OAuth credentials (optional, for Google sign-in)

### 1. Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
DATABASE_URL=postgres://user:password@host:5432/database

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

> Note: the `status` column is used to track active vs resolved listings on both the
> `lostitems` and `founditems` tables (default `'active'`).

Run the server:

```bash
npm run dev        # nodemon, http://localhost:3000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

The frontend currently calls the deployed backend directly
(`https://find-it-server-ivory.vercel.app`). To point it at your local server, replace
that URL in `client/src/` (pages under `src/pages/` and `src/components/ViewDetails.jsx`)
with `http://localhost:3000`.

---

## API Overview

Base URL: `https://find-it-server-ivory.vercel.app`

### Auth & Users

| Method | Endpoint                | Auth | Description                     |
| ------ | ----------------------- | ---- | ------------------------------- |
| POST   | `/createuser`           | -    | Register, sends OTP to email    |
| POST   | `/verify-email`         | -    | Verify email with OTP           |
| POST   | `/resend-otp`           | -    | Resend verification OTP         |
| POST   | `/login`                | -    | Log in, returns JWT + user      |
| GET    | `/auth/google`          | -    | Start Google OAuth flow         |
| GET    | `/auth/google/callback` | -    | OAuth callback, redirects app   |
| GET    | `/users`                | -    | List users                      |
| GET    | `/users/:id`            | -    | Get a user                      |
| GET    | `/me`                   | Yes  | Get the current user            |
| GET    | `/me/stats`             | Yes  | Profile stats (posted/returned) |
| PUT    | `/updateuser/:id`       | Yes  | Update username/email/password  |
| DELETE | `/deleteuser/:id`       | Yes  | Delete a user                   |
| POST   | `/contact-owner`        | Yes  | Email the owner of an item      |

### Lost Items

| Method | Endpoint                   | Auth | Description                        |
| ------ | -------------------------- | ---- | ---------------------------------- |
| GET    | `/lostItems?page=&search=` | -    | List active lost items (paginated) |
| GET    | `/lostItems/:id`           | -    | Get a lost item                    |
| POST   | `/lostItems`               | Yes  | Create (multipart `image` field)   |
| PUT    | `/lostItems/:id`           | Yes  | Update an item                     |
| PATCH  | `/lostItems/:id/resolve`   | Yes  | Mark as resolved (owner only)      |
| PATCH  | `/lostItems/:id`           | Yes  | Soft delete                        |
| DELETE | `/lostItems/:id`           | Yes  | Delete an item                     |

### Found Items

| Method | Endpoint                    | Auth | Description                         |
| ------ | --------------------------- | ---- | ----------------------------------- |
| GET    | `/foundItems?page=&search=` | -    | List active found items (paginated) |
| GET    | `/foundItems/:id`           | -    | Get a found item                    |
| POST   | `/foundItems`               | Yes  | Create (multipart `image` field)    |
| PUT    | `/foundItems/:id`           | Yes  | Update an item                      |
| PATCH  | `/foundItems/:id/resolve`   | Yes  | Mark as resolved (owner only)       |
| PATCH  | `/foundItems/:id`           | Yes  | Soft delete                         |
| DELETE | `/foundItems/:id`           | Yes  | Delete an item                      |

All protected endpoints expect an `Authorization: Bearer <token>` header.

---

## Environment Variables Reference

| Variable                | Used For                     |
| ----------------------- | ---------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string |
| `JWT_SECRET`            | Signing JWTs                 |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account           |
| `CLOUDINARY_API_KEY`    | Cloudinary API key           |
| `CLOUDINARY_SECRET_KEY` | Cloudinary API secret        |
| `EMAIL_USER`            | Nodemailer sender address    |
| `EMAIL_PASSWORD`        | Nodemailer app password      |
| `GOOGLE_CLIENT_ID`      | Google OAuth client ID       |
| `GOOGLE_CLIENT_SECRET`  | Google OAuth client secret   |
| `GOOGLE_CALLBACK_URL`   | Google OAuth redirect URI    |

---

## Scripts

### Client

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build for production     |
| `npm run lint`    | Run Oxlint               |
| `npm run preview` | Preview production build |

### Server

| Command       | Description        |
| ------------- | ------------------ |
| `npm run dev` | Start with nodemon |
