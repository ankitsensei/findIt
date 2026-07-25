# findIt

# Features

- User accounts
- Report lost items
- Report found items
- Search by category/location
- Image upload
- Claim request system
- Admin approval
- Email notifications
- Learn
- Authentication
- File uploads
- Search
- Authorization
- Notifications
<hr >

## MVP (Build this first)

### 1. Authentication

- Register
- Login
- Logout
- Refresh Token
- Forgot Password
- Verify Email

### 2. User Profile

- Name
- Profile picture
- College/Organization
- Phone (optional)
- Email
- Join date
- Reputation score
- Items returned count

### 3. Lost Item Report

User can create a report with:

- Title
- Description
- Category
- Brand
- Color
- Date lost
- Last seen location
- Images (up to 5)
- Reward (optional)
- Contact preference
- Status

Example:

```
Title: Black Wallet
Category: Wallet
Location: Library 2nd Floor
Lost Date: 12 July
Reward: ₹500
```

### 4. Found Item Report

Similar fields:

- Title
- Description
- Images
- Found location
- Found date
- Category
- Status

### 5. Search

Search by:

- Title
- Keyword
- Location
- Category
- Color
- Brand

### 6. Filters

- Category
- Date
- Location
- Status
- Recently Added
- Reward Available

### 7. Pagination

Don't return everything. Support:

- `?page=2`
- `?limit=20`
- Cursor pagination

### 8. Item Detail Page

Shows:

- Images
- Details
- Map location
- Posted by
- Similar items
- Contact button

### 9. Claim Item

User clicks **Claim this Item** → Owner receives request.

### 10. Claim Verification

Instead of immediately giving the item, ask claimant:

- Describe the item.
- What color is inside?
- Any scratches?
- What's inside the wallet?

Owner approves or rejects.

---

## Intermediate Features

### 11. Matching Engine ⭐

This is what makes the project impressive.

When someone posts a **Lost** item (e.g., "Black Wallet"), the backend automatically searches Found Items.

Similarity based on:

- Category
- Color
- Title
- Keywords
- Location
- Dates

Returns:

- 92% Match
- Possible Match
- Found near Library

This is excellent interview material.

### 12. Notifications

Notify when:

- Someone claims item
- Match found
- Status changes
- Item returned

### 13. Bookmark

Save interesting items.

### 14. Report Fake Posts

Community moderation.

### 15. Admin Panel

Admin can:

- Delete fake posts
- Ban users
- View reports
- Moderate claims

### 16. Reputation System

Users earn points for returning items.

Example:

- Returned Wallet → +50 Reputation

### 17. Comments

Ask:

- Where exactly?
- Can you upload another photo?

### 18. Chat

Owner ↔ Finder (only after claim request).

### 19. Image Upload

- Store multiple images.
- Compress automatically.

### 20. Item Timeline

```
Posted
  ↓
Matched
  ↓
Claim Requested
  ↓
Verified
  ↓
Returned
```

---

## Advanced Features

### AI Image Similarity

- Upload image
- Find visually similar items.

### OCR

- Someone uploads student ID.
- Backend extracts Name, College, ID Number.

### QR Codes

- Generate QR for found items.
- Volunteer scans to open item page.

### Heat Map

- Display where items are commonly lost.
- Useful for campuses or cities.

### Nearby Alerts

- Notify users when a lost/found item is posted within a chosen radius.

### Analytics Dashboard

- Total lost items
- Total found items
- Recovery rate
- Popular categories
- Active users

---

## Database Tables

- users
- items
- images
- claims
- comments
- notifications
- reports
- bookmarks
- messages
- reputation_logs
- sessions

---

## Backend Concepts You'll Learn

- JWT Authentication
- Refresh Tokens
- PostgreSQL relationships
- Transactions
- File uploads
- Background jobs
- Email
- Pagination
- Search
- Filtering
- Indexing
- Full-text search
- WebSockets
- Authorization
- Rate limiting
- Logging
- Validation
- Error handling
