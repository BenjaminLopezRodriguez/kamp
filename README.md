# Kamp Property Management 🏠

A modern, fun, and feature-rich property management platform built with the [T3 Stack](https://create.t3.gg/).

## ✨ What's New

This app has been completely redesigned with a modern aesthetic inspired by Linktree, Partiful, and Shopify!

### 🎨 Design Updates
- **Vibrant Color Scheme**: Purple, pink, and blue gradients
- **Modern UI**: Rounded corners, smooth animations, glass morphism
- **Mobile-First**: Bottom tab navigation for easy mobile access
- **Responsive**: Beautiful on all screen sizes

### 🚀 New Features

#### 📸 Room Tours
- Schedule in-person or virtual property tours
- Automated email invitations and reminders
- Status tracking and calendar integration

#### 🔍 Inspections
- Multiple inspection types (move-in, move-out, routine, emergency)
- Digital checklists and reports
- Automatic tenant notifications

#### 👀 Peer Preview
- Request feedback from other landlords
- Share property details securely
- Get expert advice before making decisions

#### 📧 Email Templates
- Pre-built templates for all tenant interactions
- Customizable with dynamic variables
- Professional, well-designed emails

See [FEATURES.md](./FEATURES.md) for detailed documentation.

## 🏃 Quick Start

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up your database
npm run db:push

# (Optional) Seed email templates
npm run db:seed

# Start development server
npm run dev
```

## 🎯 Usage

1. **Visit Homepage**: Beautiful landing page with CTA buttons
2. **Access Dashboard**: Navigate to `/u/dashboard` to manage properties
3. **Schedule Tours**: Use the Room Tours tab to schedule property tours
4. **Create Inspections**: Manage property inspections with digital checklists
5. **Request Feedback**: Get peer reviews before making decisions

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [tRPC](https://trpc.io) - End-to-end typesafe APIs
- [Drizzle ORM](https://orm.drizzle.team) - Database ORM
- [Kinde Auth](https://kinde.com) - Authentication
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## 📱 Mobile Features

- Bottom tab navigation for easy thumb access
- Touch-optimized buttons and interactions
- Responsive layouts for all screen sizes
- Swipeable sheets and modals

## 🎨 Customization

### Colors
Edit `/src/styles/globals.css` to change the color scheme.

### Email Templates
Customize templates in `/src/server/db/seed-templates.ts`.

### Navigation
Modify `/src/components/custom/MobileNav.tsx` for navigation items.

## 📚 Documentation

- [FEATURES.md](./FEATURES.md) - Detailed feature documentation
- [T3 Stack Docs](https://create.t3.gg/)

## 🚀 Deployment

Follow deployment guides for:
- [Vercel](https://create.t3.gg/en/deployment/vercel) (Recommended)
- [Netlify](https://create.t3.gg/en/deployment/netlify)
- [Docker](https://create.t3.gg/en/deployment/docker)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is built on the T3 Stack and follows its licensing terms.
