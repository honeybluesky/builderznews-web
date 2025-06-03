# BuilderZ News Web

Latest VC funding news and startup insights platform.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd builderznews-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
   - `VITE_API_BASE_URL`: Your API base URL (**required** - replace with your actual API endpoint)
   - `VITE_APP_NAME`: Application name (optional)
   - `VITE_APP_DESCRIPTION`: Application description (optional)

5. Start the development server:
```bash
npm run dev
```

## 🔒 Security

- Environment variables are properly configured and protected
- No hardcoded secrets or API keys in the codebase
- Public API endpoints are used appropriately
- All sensitive configuration is managed through environment variables

## 🏗️ Built With

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui Components

## ⚙️ API Setup

This application requires a backend API to fetch news data. You'll need to:

1. Set up your own API endpoint that provides news data
2. Configure the `VITE_API_BASE_URL` environment variable with your API URL
3. Ensure your API supports the expected endpoints and response format

## 📝 Environment Variables

See `.env.example` for all available environment variables and their descriptions.

**Required Variables:**
- `VITE_API_BASE_URL`: Your API base URL (must be set before running the application)