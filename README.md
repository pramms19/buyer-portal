## Buyer Portal

## Overview
This is a simple Buyer Portal built with Next.js.  
Users can register, log in, and manage their favourite properties.

---

## Features
- User registration and login
- Password hashing using bcrypt
- JWT authentication with cookies
- View list of properties
- Add/remove favourites
- Protected routes (only logged-in users)
- User-specific favourites

---

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- shadcn ui
- JWT (jsonwebtoken)
- bcryptjs

## Project Structure
/app  
  /api  
    /auth  
      login/route.ts  
      register/route.ts  
    /favourites/route.ts  
    /properties/route.ts  
    /me/route.ts  

  /login/page.tsx  
  /register/page.tsx  
  /dashboard/page.tsx 
  globals.css
  layout.tsx 
  page.tsx  

/components
  
/lib  
  auth.ts  
  db.ts  
  getUser.ts  

---

## Setup

1. Install dependencies:
npm install

2. Run the project:
npm run dev

3. Open in browser:
http://localhost:3000

---

## How to Use

1. Go to /register and create an account  
2. Go to /login and log in  
3. You will be redirected to dashboard  
4. Add/remove/view properties to favourites

---

## Authentication
- Uses JWT stored in HTTP-only cookies  
- Cookies are verified on each request  
- Unauthorized users are redirected to login  

---

## Note
This project uses an in-memory database.  
Data will reset when the server restarts.

---

## What This Project Shows
- Authentication flow (login/register)
- Protected API routes
- CRUD operations (favourites)
- Basic frontend + backend integration
- Error handling and loading states

---

## Author
Pramada Shrestha