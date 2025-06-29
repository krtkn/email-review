import { useState, useRef, useEffect } from 'react';
import { Email, EmailReviewAction } from '../types/email';
import { emailService } from '../services/emailService';
import EmailList from '../components/EmailList';
import EmailReadingPane from '../components/EmailReadingPane';
import { FiBell, FiSettings, FiMove } from 'react-icons/fi';

const EmailReview: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [reviewActions, setReviewActions] = useState<EmailReviewAction[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(Math.max(600, window.innerWidth * 0.5)); // Around 50% of screen width, minimum 600px
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Load emails and auto-select the first one on component mount
  useEffect(() => {
    const loadInitialEmails = async () => {
      try {
        // Use hybrid approach (mock structure + API content)
        const emails = await emailService.getHybridEmails();
        
        // Alternative options (uncomment to use):
        // const emails = await emailService.getEmailsFromAPI(); // Full API data
        // const emails = await emailService.getEmails(); // Full mock data
        
        if (emails.length > 0 && !selectedEmail) {
          setSelectedEmail(emails[0]);
        }
      } catch (error) {
        console.error('Error loading initial emails:', error);
      }
    };

    loadInitialEmails();
  }, [selectedEmail]); // Add selectedEmail as dependency

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleSearch = (query: string) => {
    // In a real app, you might want to trigger a search API call here
    console.log('Search query:', query);
  };

  const handleEmailAction = async (action: EmailReviewAction) => {
    try {
      await emailService.submitReviewAction(action);
      setReviewActions(prev => [...prev, action]);
      
      // Show success feedback
      console.log(`Email ${action.action}ed successfully`);
      
      // In a real app, you might want to update the email list or show a notification
    } catch (error) {
      console.error('Error submitting review action:', error);
      // In a real app, you might want to show an error notification
    }
  };

  // Handle mouse down on resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  // Handle mouse move for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      const minWidth = 400; // Increased minimum width
      const maxWidth = window.innerWidth * 0.75; // Increased maximum to 75% of screen width
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Review Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Review and approve pending emails
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={async () => {
                console.log('🔍 Debug: Testing hybrid approach...');
                try {
                  const emails = await emailService.getHybridEmails();
                  console.log('🔍 Debug: Hybrid approach successful, loaded', emails.length, 'emails');
                  console.log('🔍 Debug: Sample email structure:', {
                    from: emails[0].from,
                    subject: emails[0].subject,
                    contentLength: emails[0].content.body.length,
                    hasAttachments: emails[0].content.attachments.length > 0
                  });
                } catch (error) {
                  console.error('🔍 Debug: Hybrid approach failed:', error);
                }
              }}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              title="Test hybrid approach and log response"
            >
              Test Hybrid
            </button>
            
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <FiSettings className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">R</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Reviewer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Email List Sidebar */}
        <div 
          ref={sidebarRef}
          style={{ width: `${sidebarWidth}px` }}
          className="flex-shrink-0 relative"
        >
          <EmailList
            selectedEmailId={selectedEmail?.id || null}
            onEmailSelect={handleEmailSelect}
            onSearch={handleSearch}
          />
          
          {/* Resize Handle */}
          <div
            className={`absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-300 hover:bg-primary-500 transition-colors ${
              isResizing ? 'bg-primary-600' : ''
            }`}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FiMove className="w-3 h-3 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Email Reading Pane */}
        <div className="flex-1">
          <EmailReadingPane
            email={selectedEmail}
            onEmailAction={handleEmailAction}
          />
        </div>
      </div>

      {/* Review Actions Summary (Optional) */}
      {reviewActions.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Recent actions: {reviewActions.length} emails reviewed
            </div>
            <button
              onClick={() => setReviewActions([])}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear history
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailReview;