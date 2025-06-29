# Email Review Dashboard

A modern React application built with Vite, TypeScript, and Tailwind CSS that provides a comprehensive email review interface for managing and approving emails.

## Features

### Email Review Dashboard
- **Email List View**: Sidebar with email headers showing sender, subject, date, priority, and status
- **Reading Pane**: Full email content display with attachments
- **Review Actions**: Approve, reject, flag, forward, and archive emails
- **Search & Filtering**: Search emails by content and filter by priority
- **Pagination**: Efficient handling of large email lists
- **Responsive Design**: Works on desktop and mobile devices

### Email Management
- Priority-based email categorization (High, Normal, Low)
- Email flagging and marking as read
- Attachment handling with file size display
- Comment system for rejections and flags
- Real-time email status updates
- Full-screen modal and new window viewing options

### Technical Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components
- **Icons**: React Icons (Feather icons)
- **Routing**: React Router DOM
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── EmailList.tsx          # Email list sidebar with pagination
│   ├── EmailReadingPane.tsx   # Email content reading pane
│   ├── RecipientList.tsx      # Recipient display component
│   └── RecipientModal.tsx     # Modal for viewing all recipients
├── pages/
│   └── EmailReview.tsx        # Main email review dashboard
├── services/
│   └── emailService.ts        # Mock email API service
├── types/
│   └── email.ts               # TypeScript type definitions
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## Email Review Interface

### Features
- **Email List**: Displays email headers with priority indicators, flags, and attachment icons
- **Search**: Real-time search through email subjects, senders, and content
- **Filtering**: Filter by priority level and read/unread status
- **Pagination**: Navigate through large email lists efficiently
- **Reading Pane**: Full email content with proper formatting and attachment handling
- **Review Actions**: Quick action buttons for email approval workflow
- **Comments**: Add comments when rejecting or flagging emails
- **Full Screen View**: View emails in full-screen modal or new window
- **Recipient Management**: View all recipients in organized modals

### Mock Data
The application includes realistic mock email data for demonstration:
- Marketing campaign reviews
- Contract approvals
- Budget requests
- Team updates
- IT infrastructure proposals
- Comprehensive policy updates (with long content for testing)

## Backend Integration

The application is designed to work with REST APIs. The `emailService.ts` file contains mock implementations that can be easily replaced with real API calls:

```typescript
// Example API integration
const emailService = {
  async getEmails(): Promise<Email[]> {
    const response = await fetch('/api/emails');
    return response.json();
  },
  
  async submitReviewAction(action: EmailReviewAction): Promise<void> {
    await fetch('/api/emails/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action)
    });
  }
};
```

## Customization

### Styling
The application uses Tailwind CSS with custom color schemes and components. You can customize the design by modifying:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Custom CSS components and utilities
- Component-specific Tailwind classes

### Email Types
Email data structures are defined in `src/types/email.ts`. You can extend these types to match your backend API:

```typescript
export interface Email {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  date: string;
  isRead: boolean;
  isFlagged: boolean;
  hasAttachments: boolean;
  priority: 'low' | 'normal' | 'high';
  content: EmailContent;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
