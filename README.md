# E-Commerce Website

A modern, responsive e-commerce platform built with **Next.js 16**, **React 19**, and **Tailwind CSS**. This application features product browsing, shopping cart management, favorites/wishlist functionality, and a complete checkout flow.

## 🌟 Features

- **Product Browsing**: Browse products fetched from a free e-commerce API with dynamic loading
- **Search & Filter**: Search products by name and filter by category
- **Shopping Cart**: Add/remove items with persistent storage using localStorage
- **Favorites/Wishlist**: Save favorite products for later
- **Product Details**: View detailed information about each product
- **Checkout Flow**: Complete checkout process with order summary
- **Order Success**: Confirmation page after successful purchase
- **Responsive Design**: Mobile-first, fully responsive UI
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Modern Icons**: Lucide React icons throughout the interface

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.2.10](https://nextjs.org) - React framework with server-side rendering
- **UI Library**: [React 19.2.4](https://react.dev) - JavaScript UI library
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) - Utility-first CSS framework
- **Animations**: [Framer Motion 12.42.2](https://www.framer.com/motion) - Animation library
- **Icons**: [Lucide React 1.23.0](https://lucide.dev) - Icon library
- **State Management**: React Context API - Built-in state management
- **Linting**: ESLint 9 - Code quality

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, pnpm, or bun package manager

## 🚀 Getting Started

### 1. Clone or Navigate to the Project

```bash
cd "d:\SE 2K24\AntiGravity\E_Commerce"
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with providers
│   ├── page.js                # Homepage with product listing
│   ├── globals.css            # Global styles
│   ├── cart/
│   │   └── page.js            # Shopping cart page
│   ├── checkout/
│   │   └── page.js            # Checkout page
│   ├── favorites/
│   │   └── page.js            # Favorites/wishlist page
│   ├── product/
│   │   └── [id]/
│   │       └── page.js        # Individual product detail page
│   └── success/
│       └── page.js            # Order success confirmation page
├── components/
│   ├── Header.js              # Navigation header
│   ├── Footer.js              # Footer component
│   ├── ProductCard.js         # Product card component
│   ├── AnnouncementBar.js     # Announcement banner
│   └── SkeletonLoader.js      # Loading skeleton UI
└── context/
    └── CartContext.js         # Global cart and favorites state
```

## 🎯 Key Components

### CartContext
Manages global state for:
- Shopping cart items
- Favorites/wishlist
- Cart animations and UI triggers
- LocalStorage persistence for cart and favorites

### ProductCard
Displays individual product cards with:
- Product image and details
- Price information
- Add to cart button
- Add to favorites button

### Header
Navigation bar featuring:
- Logo/brand
- Search functionality
- Cart badge showing item count
- Navigation links to main pages

## 💾 State Management

The application uses **React Context API** for state management:
- **CartContext**: Centralized state for cart items, favorites, and animations
- **localStorage**: Persists cart and favorites data across sessions

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Product listing with search and filters |
| Product Detail | `/product/[id]` | Detailed view of a single product |
| Cart | `/cart` | Shopping cart with item management |
| Checkout | `/checkout` | Order checkout and payment summary |
| Favorites | `/favorites` | Saved favorite products |
| Success | `/success` | Order confirmation page |

## 🎨 Styling

The project uses **Tailwind CSS** with PostCSS configuration for:
- Responsive design (mobile-first approach)
- Dark mode support ready
- Custom utility classes
- Optimized production builds

## 🔗 Data Source

Products are fetched from:
```
https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json
```

Product data includes:
- Name
- Description
- Price
- Category
- Image URL
- Additional metadata

## 📦 Available Scripts

```bash
npm run dev      # Start development server with webpack
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel automatically detects Next.js and deploys with optimal settings

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Deploy on Other Platforms

- **AWS Amplify**: [AWS Amplify Docs](https://docs.amplify.aws/nextjs)
- **Netlify**: [Netlify Docs](https://docs.netlify.com/frameworks/next-js)
- **Self-hosted**: Use `npm run build && npm start`

## 🔍 Environment Variables

Create a `.env.local` file for environment-specific variables (if needed):

```env
NEXT_PUBLIC_API_URL=https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Module Not Found
```bash
rm -rf node_modules
npm install
```

### Build Errors
```bash
npm run lint
npm run build
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)

## 📝 License

This project is open source. Feel free to use it for personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues, questions, or suggestions, please open an issue on the repository or contact the development team.
