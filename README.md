# Email Review Dashboard

A modern React-based email review application with a clean, responsive interface.

## Features

- 📧 **Email List View**: Browse through emails with pagination
- 📖 **Reading Pane**: View email content with rich formatting
- 👥 **Recipient Management**: View and manage email recipients
- 📎 **Attachment Support**: Handle email attachments
- 🔍 **Search & Filter**: Find emails quickly
- 📱 **Responsive Design**: Works on desktop and mobile
- 🌐 **API Integration**: Hybrid approach with mock data and real API content

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Feather Icons)
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/krtkn/email-review.git
cd email-review
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EmailList.tsx   # Email list with pagination
│   ├── EmailReadingPane.tsx # Email content viewer
│   ├── RecipientList.tsx # Recipient management
│   └── RecipientModal.tsx # Recipient modal
├── pages/              # Page components
│   └── EmailReview.tsx # Main email review page
├── services/           # API and data services
│   └── emailService.ts # Email data management
├── types/              # TypeScript type definitions
│   └── email.ts        # Email-related types
└── styles/             # Styling and theming
```

## API Integration

The app uses a hybrid approach for email data:

- **Mock Data**: Email addresses, subjects, and basic structure
- **Real API**: Content and attachments from JSONPlaceholder API
- **Fallback**: Pure mock data if API is unavailable

### API Endpoints

- **Posts API**: `https://jsonplaceholder.typicode.com/posts`
- **Comments API**: `https://jsonplaceholder.typicode.com/comments`

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Deployment Process

1. Push changes to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Site is available at: `https://krtkn.github.io/email-review/`

### Manual Deployment

If you need to deploy manually:

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist/` directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This is a demo project for email review functionality. The email data is simulated for demonstration purposes.
