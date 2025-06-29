# Email Review Dashboard

A modern React-based email review application with a responsive design, real-time API integration, and intuitive user interface for managing and reviewing emails.

## 🚀 Features

- **📧 Email Management**: View, search, and filter emails with pagination
- **📖 Reading Pane**: Full-featured email reading interface with attachments
- **🔍 Search & Filter**: Advanced search and priority-based filtering
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔄 API Integration**: Hybrid approach combining mock data structure with real API content
- **⚡ Real-time Updates**: Live email status updates and flagging
- **🎨 Modern UI**: Clean, professional interface built with Tailwind CSS

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Icons** for iconography
- **JSONPlaceholder API** for dynamic content

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krtkn/email-review.git
   cd email-review
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Deployment

### GitHub Pages (Free)

This project is configured for automatic deployment to GitHub Pages. Here's how to set it up:

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

2. **Push your changes**:
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor deployment**:
   - Go to Actions tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Your app will be available at: `https://krtkn.github.io/email-review/`

### Alternative Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect your repository
- **Firebase Hosting**: Use Firebase CLI for deployment

## 🎯 Usage

### Email Review Workflow

1. **Browse Emails**: View the email list with pagination (10 emails per page)
2. **Search & Filter**: Use the search bar and priority filters to find specific emails
3. **Read Emails**: Click on any email to view its full content in the reading pane
4. **Take Actions**: Approve, reject, or flag emails using the action buttons
5. **Manage Attachments**: Download or view email attachments

### Features Overview

- **Auto-selection**: First email is automatically selected on page load
- **Resizable Layout**: Drag the resize handle to adjust the email list width
- **Real-time Updates**: Email status updates immediately
- **Responsive Design**: Optimized for all screen sizes

## 🔧 Configuration

### API Integration

The app uses a hybrid approach for data:

- **Mock Data**: Professional email addresses, subjects, and metadata
- **API Content**: Dynamic email body content from JSONPlaceholder API
- **Fallback**: Graceful fallback to mock data if API is unavailable

### Customization

- **Styling**: Modify `src/styles/theme.ts` for custom colors and styling
- **API Endpoints**: Update `src/services/emailService.ts` for different data sources
- **Components**: Extend components in `src/components/` for additional features

## 📁 Project Structure

```
email-review/
├── src/
│   ├── components/          # React components
│   │   ├── EmailList.tsx    # Email list with pagination
│   │   ├── EmailReadingPane.tsx # Email reading interface
│   │   ├── RecipientModal.tsx   # Recipient management
│   │   └── RecipientList.tsx    # Recipient display
│   ├── pages/               # Page components
│   │   └── EmailReview.tsx  # Main dashboard page
│   ├── services/            # API and data services
│   │   └── emailService.ts  # Email data management
│   ├── types/               # TypeScript type definitions
│   │   └── email.ts         # Email-related types
│   └── styles/              # Styling and themes
│       └── theme.ts         # Design system configuration
├── .github/workflows/       # GitHub Actions for deployment
│   └── deploy.yml           # Deployment workflow
└── public/                  # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/krtkn/email-review/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Built with ❤️ using React and modern web technologies**
