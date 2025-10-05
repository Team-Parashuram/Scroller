# Scroller

> A modern, professional short-form video sharing platform built with Next.js 15 and powered by cutting-edge technologies.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)](https://www.mongodb.com/)

**Live Demo**: [https://scroolrr.vercel.app](https://scroolrr.vercel.app)

**GitHub Repository**: [https://github.com/Team-Parashuram/Scroller](https://github.com/Team-Parashuram/Scroller)

**Live Demo Video**: [Watch on YouTube](https://www.youtube.com/watch?v=eItfWL08lO4)

## Overview

**Scroller** is a TikTok-style video sharing platform that enables users to upload, share, and discover short-form video content. With a sleek black and yellow professional design, it offers a modern, engaging experience similar to popular social media platforms.

### Key Features

- **Short-Form Video Sharing** - Upload and share videos up to 3 minutes
- **TikTok-Style Scrolling** - Vertical, full-screen video experience with snap scrolling
- **AI Assistant** - Integrated Google Gemini AI chatbot for social media wellness advice
- **Secure Authentication** - Powered by Clerk for robust user management
- **ImageKit Integration** - Fast, optimized video storage and delivery
- **Professional UI** - Glass-morphism effects with black and yellow theme
- **Video Management** - Tag-based organization and discovery
- **Social Features** - Like, comment, and share functionality
- **Anonymous Chat** - External integration for anonymous communication

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 with Turbopack
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4 + shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Services
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **AI**: Google Generative AI (Gemini 2.0 Flash)
- **Media Storage**: ImageKit
- **API**: Next.js API Routes

### UI Components
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Forms**: React Hook Form + Zod validation
- **Notifications**: React Hot Toast (Sonner)
- **State Management**: React hooks

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database
- Clerk account
- ImageKit account
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Team-Parashuram/Scroller.git
   cd Scroller
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # ImageKit
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_SPECIAL_PROMPT=your_custom_ai_prompt

   # Base URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Scroller/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── ai/           # AI chatbot endpoint
│   │   ├── auth-debug/   # Authentication debugging
│   │   ├── imagekitauth/ # ImageKit authentication
│   │   ├── user/         # User management
│   │   └── videos/       # Video CRUD operations
│   ├── ask-ai/           # AI chat page
│   ├── component/        # Page-specific components
│   ├── register/         # Registration page
│   ├── upload/           # Video upload page
│   ├── view/             # Video viewing page (TikTok-style)
│   ├── globals.css       # Global styles & theme
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── AI/               # AI chat components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   ├── Loader.tsx        # Loading spinner
│   ├── VideoComponent.tsx # Individual video card
│   ├── VideoFeed.tsx     # Video grid display
│   └── VideoUploadForm.tsx # Upload form
├── Database/             # Database connection
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── Model/                # MongoDB schemas
└── util/                 # Helper functions
```

## Features in Detail

### 1. Video Upload
- Drag-and-drop file upload
- Real-time upload progress
- Tag-based categorization (educational, entertainment, technology, etc.)
- Title and description metadata
- File validation (MP4, MOV, max 100MB)

### 2. TikTok-Style Video Player
- Full-screen vertical scrolling
- Snap-to-video functionality
- Auto-play on scroll
- Like, comment, and share buttons
- Creator information overlay
- Professional gradient overlays

### 3. AI Assistant
- Powered by Google Gemini 2.0 Flash
- Social media wellness advice
- Real-time chat interface
- Context-aware responses
- Clean, professional chat UI

### 4. User Management
- Secure authentication via Clerk
- User profiles
- Video ownership tracking
- Delete permissions for owned content

### 5. Professional Design
- **Black & Yellow Theme**: Modern, professional color scheme
- **Glass-morphism**: Frosted glass effects throughout
- **Smooth Animations**: Fade-in, slide-in, and hover effects
- **Responsive Design**: Mobile-first approach
- **Custom Scrollbars**: Themed yellow accents

## Video Tags

Videos can be categorized with the following tags:
- Educational
- Entertainment
- Technology
- Lifestyle
- Gaming
- Music
- Sports
- News
- Comedy
- Cooking
- Travel
- Fitness
- Fashion
- Art
- Science

## Security Features

- **Environment Variables**: Sensitive data protected
- **Clerk Authentication**: Industry-standard auth
- **MongoDB Security**: Secure database connections
- **Input Validation**: Zod schema validation
- **XSS Protection**: React's built-in sanitization
- **CORS Configuration**: Controlled API access

## Responsive Design

Scroller is fully responsive across all devices:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large Desktop (1920px+)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Author

**Shardendu Mishra**
- GitHub: [@MishraShardendu22](https://github.com/MishraShardendu22)

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and analytics
- Clerk for authentication
- ImageKit for media storage
- Google for Gemini AI
- shadcn for the beautiful UI components
- Radix UI for accessible primitives

## Support

For support, email your support address or open an issue in the GitHub repository.

---

<div align="center">
  <strong>Built by Shardendu Mishra - Team Parashuram</strong>
</div>
