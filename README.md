# 🍽️ Meal Planner App

A modern, responsive web application for meal planning and grocery shopping built with React and powered by TheMealDB API. Plan your weekly meals, discover new recipes, and generate smart shopping lists automatically.

![Meal Planner](https://img.shields.io/badge/React-19.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-orange.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC.svg)

## ✨ Features

### 🔍 Recipe Discovery
- **Smart Search**: Search thousands of recipes from TheMealDB API
- **Real-time Results**: Debounced search with instant results
- **Detailed Views**: Comprehensive recipe details including:
  - Ingredients with measurements
  - Step-by-step instructions
  - Nutritional information
  - Recipe images
  - Category and cuisine type

### 📅 Meal Planning
- **Weekly Planner**: Organize meals for the entire week
- **Drag & Drop**: Add recipes to any day of the week
- **Flexible Management**:
  - Add multiple meals per day
  - Remove individual meals
  - Clear specific days
  - Reset entire week
- **Persistent Storage**: Meal plans saved locally and synced

### 🛒 Smart Shopping List
- **Auto-Generation**: Automatically compile ingredients from your meal plan
- **Ingredient Aggregation**: Smart combining of duplicate ingredients
- **Interactive Checklist**: 
  - Check off items as you shop
  - Mark items as purchased
  - Clear completed items
- **Quantity Management**: Precise measurements for each ingredient

### 💾 Data Persistence
- **Local Storage**: Immediate saves with localStorage
- **Firebase Integration**: Cloud backup and sync capabilities
- **Auto-save**: Changes persist automatically

## 🎯 Tech Stack

### Frontend Framework
- **React 19.2.0**: Latest React with modern hooks and features
- **React Router DOM 6.26.2**: Client-side routing and navigation
- **Vite 7.2.4**: Next-generation frontend tooling with lightning-fast HMR

### Styling & UI
- **TailwindCSS 4.1.18**: Utility-first CSS framework
- **PostCSS 8.5.6**: CSS transformations and autoprefixing
- **Lucide React 0.562.0**: Beautiful, consistent icon library
- **Custom Components**: Reusable UI components with modern design patterns

### Backend & APIs
- **Firebase 12.7.0**: Backend-as-a-Service for authentication and data
- **TheMealDB API**: External recipe database (free tier)
  - Base URL: `https://www.themealdb.com/api/json/v1/1`
  - Search endpoint: `/search.php?s={query}`
  - Lookup endpoint: `/lookup.php?i={id}`

### Development Tools
- **ESLint 9.39.1**: Code linting with modern ESM configuration
- **Vite Plugin React 5.1.1**: Fast Refresh for React development
- **TypeScript Types**: Type definitions for React and React DOM

### Deployment
- **Firebase Hosting**: Static site deployment
- **SPA Configuration**: Single Page Application routing

## 🏗️ Project Architecture

The project follows a clean **MVC-inspired architecture**:

```
src/
├── controllers/          # Business logic layer
│   ├── mealPlanController.js       # Meal plan state management
│   ├── recipeController.js         # Recipe data handling
│   └── shoppingListController.js   # Shopping list logic
│
├── services/            # External integrations
│   ├── firebase.js                 # Firebase configuration & setup
│   ├── mealDbService.js            # TheMealDB API client
│   └── storageService.js           # LocalStorage wrapper
│
├── models/              # Data models and types
│   └── [data structures]
│
├── views/               # Presentation layer
│   ├── components/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Icons.jsx
│   │   ├── PageShell.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── Skeletons.jsx
│   │   ├── StateBlocks.jsx
│   │   ├── TopNav.jsx
│   │   └── useDebouncedValue.js
│   │
│   └── pages/                      # Route-level pages
│       ├── SearchPage.jsx          # Recipe search interface
│       ├── RecipeDetailPage.jsx    # Recipe details view
│       ├── MealPlannerPage.jsx     # Weekly meal planner
│       ├── ShoppingListPage.jsx    # Shopping list manager
│       └── NotFoundPage.jsx        # 404 error page
│
├── styles/              # Global styles and themes
├── App.jsx              # Root component with routing
└── main.jsx             # Application entry point
```

### Architecture Principles

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data access
2. **Single Responsibility**: Each module has one well-defined purpose
3. **Reusability**: Shared components and utilities
4. **Scalability**: Modular structure allows easy feature additions

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SLB_Internship
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (if using cloud features)
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🌐 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (if not already done)
   ```bash
   firebase init hosting
   ```
   - Select `dist` as the public directory
   - Configure as a single-page app: Yes
   - Don't overwrite `dist/index.html`

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

Your app will be live at: `https://<project-id>.web.app`

### Environment Variables

The following environment variables are used:
- `VITE_FIREBASE_API_KEY`: Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Firebase app ID

## 📱 Key Features Explained

### Recipe Search
- Powered by TheMealDB API
- Debounced search (300ms delay) for optimal performance
- Displays recipe cards with images and basic info
- Click to view full recipe details

### Meal Planning
- 7-day weekly view
- Add any recipe to any day
- Multiple meals per day supported
- Quick clear actions for day or entire week

### Shopping List
- Automatically extracts ingredients from planned meals
- Aggregates quantities for duplicate ingredients
- Interactive checkbox system
- Persistent across sessions

## 🔧 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code checks |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use ESLint configuration provided
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages

## 📄 License

This project is developed as part of the SLB Internship program.

## 🙏 Acknowledgments

- **TheMealDB**: Free recipe API
- **Firebase**: Backend infrastructure
- **Vite**: Build tooling
- **React Team**: Framework and ecosystem
- **Tailwind Labs**: CSS framework

## 📞 Support

For issues or questions, please open an issue in the repository.

---

Made with ❤️ during SLB Internship
