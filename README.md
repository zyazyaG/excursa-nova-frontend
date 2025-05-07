# ✈️ Excursa Nova — AI Travel Planner

**Excursa Nova** is a web application for portfolio that helps users generate, customize, and save travel itineraries powered by AI.  
The frontend of the app is built using **React 19**, **TypeScript**, **Vite**, **MUI**, and implements **secure JWT-based authentication** with advanced state management patterns.

> **Status:** 🚧 *Actively being built & improved.*

---

## 🚀 Features

✅ Generate personalized travel itineraries using AI (OpenAI GPT-based).  
✅ Save and manage your itineraries with rich markdown support.  
✅ User authentication (sign up / sign in).  
✅ Authenticated dashboard & private routes.  
✅ Itinerary history and search/filtering.  
✅ Save partially completed itineraries for later.  
✅ Print-friendly itinerary pages.  
✅ Responsive design with modern UI/UX.

---

## 🏗 Tech Stack

| Area | Tech |
|------|------|
| Frontend | React 19, TypeScript, Vite |
| UI Components | MUI (Material UI) |
| Styling | CSS Modules |
| State Management | React Context API + Custom Hooks |
| Forms | React Hook Form |
| API Requests | Axios with private interceptors & refresh token logic |
| Routing | React Router v7+ |
| Markdown Rendering | react-markdown |
| Authentication | JWT (Bearer tokens + refresh tokens) |
| Data Fetching | Axios with abort controllers and error handling |

---

## 🔒 Security & Best Practices

- 🔄 **Refresh Token Handling** — Implements silent refresh with automatic retries using axios interceptors.
- 🗄 **Abort Controllers** — Cleans up API requests on component unmount to avoid memory leaks.
- ✅ **Strict TypeScript** — Strict mode, noUnusedLocals, noFallthrough, and other checks enabled.
- 🧩 **Modular Architecture** — Pages, components, hooks, and API layers are cleanly separated.

---

## 📁 Project Structure
```
src/

├── api/ # Axios setup & API service layer
├── assets/ # Static assets
├── components/ # Reusable UI components
├── contexts/ # React Context providers
├── hooks/ # Custom hooks (authentication, axios, etc.)
├── pages/ # Route-level pages
├── types/ # TypeScript types
├── utils.ts # Utilities
├── App.tsx
├── main.tsx

```
---

## 🛠 Installation & Development

```bash
# Clone the repo
git clone https://github.com/zyazyaG/excursa-nova-frontend.git

# Install dependencies
cd excursa-nova-frontend
npm install

# Run development server
npm run dev

```

### 📝 Roadmap

  - Core authentication & refresh token flow
  - AI-based itinerary generation.
  - Itinerary save/edit/delete
  - Responsive dashboard & history
  - Markdown output for itineraries

### Upcoming:

🧠 Improved AI prompts & itinerary formats

## 🤝 Final Note

At this time, this project is under active solo development.
However, feedback, dev and feature suggestions are always welcome!

