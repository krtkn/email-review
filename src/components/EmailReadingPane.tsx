import React, { useState } from 'react';
import { Email, EmailReviewAction } from '../types/email';
import RecipientModal from './RecipientModal';
import { 
  FiCheck, 
  FiX, 
  FiFlag, 
  FiShare2, 
  FiArchive, 
  FiDownload, 
  FiPaperclip,
  FiCalendar,
  FiUser,
  FiStar,
  FiMaximize,
  FiUsers,
  FiChevronDown,
  FiMonitor
} from 'react-icons/fi';

interface EmailReadingPaneProps {
  email: Email | null;
  onEmailAction: (action: EmailReviewAction) => void;
}

const EmailReadingPane: React.FC<EmailReadingPaneProps> = ({ email, onEmailAction }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [pendingAction, setPendingAction] = useState<EmailReviewAction['action'] | null>(null);
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [showMaximizeMenu, setShowMaximizeMenu] = useState(false);
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);

  if (!email) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📧</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Email Selected</h3>
          <p className="text-gray-500">Select an email from the list to view its content</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatRecipients = (recipients: string[], maxVisible: number = 5) => {
    if (recipients.length <= maxVisible) {
      return recipients.join(', ');
    }
    const visible = recipients.slice(0, maxVisible);
    const hidden = recipients.length - maxVisible;
    return `${visible.join(', ')} +${hidden} more`;
  };

  const handleAction = (action: EmailReviewAction['action']) => {
    if (action === 'reject' || action === 'flag') {
      setPendingAction(action);
      setShowCommentModal(true);
    } else {
      submitAction(action);
    }
  };

  const submitAction = (action: EmailReviewAction['action']) => {
    const reviewAction: EmailReviewAction = {
      id: email.id,
      action,
      comment: action === 'reject' || action === 'flag' ? comment : undefined,
      timestamp: new Date().toISOString(),
      reviewer: 'current-user@company.com' // In real app, get from auth context
    };

    onEmailAction(reviewAction);
    setShowCommentModal(false);
    setComment('');
    setPendingAction(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-gray-100 text-gray-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openNewWindow = () => {
    const width = 1200;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no`;
    
    const newWindow = window.open('', '_blank', features);
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Email Review - ${email.subject}</title>
          <style>
            body { 
              font-family: 'Inter', system-ui, sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: #f9fafb;
              color: #111827;
            }
            .container { 
              max-width: 1000px; 
              margin: 0 auto; 
              background: white; 
              border-radius: 8px; 
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header { 
              padding: 24px; 
              border-bottom: 1px solid #e5e7eb; 
              background: #f8fafc;
            }
            .content { 
              padding: 24px; 
            }
            .recipients { 
              margin: 16px 0; 
              padding: 12px; 
              background: #f9fafb; 
              border-radius: 6px; 
            }
            .email-body { 
              white-space: pre-wrap; 
              line-height: 1.6; 
              margin: 16px 0; 
            }
            .attachments { 
              margin-top: 24px; 
              padding-top: 16px; 
              border-top: 1px solid #e5e7eb; 
            }
            .attachment { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              padding: 12px; 
              border: 1px solid #e5e7eb; 
              border-radius: 6px; 
              margin: 8px 0; 
            }
            .priority-high { background: #fef2f2; color: #991b1b; }
            .priority-normal { background: #f3f4f6; color: #374151; }
            .priority-low { background: #eff6ff; color: #1e40af; }
            .close-btn { 
              position: absolute; 
              top: 20px; 
              right: 20px; 
              background: #ef4444; 
              color: white; 
              border: none; 
              padding: 8px 16px; 
              border-radius: 6px; 
              cursor: pointer; 
            }
          </style>
        </head>
        <body>
          <button class="close-btn" onclick="window.close()">Close Window</button>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0 0 8px 0; font-size: 24px;">${email.subject}</h1>
              <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                <span class="priority-${email.priority}" style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500;">
                  ${email.priority.toUpperCase()}
                </span>
                <span style="color: #6b7280;">From: ${email.from}</span>
                <span style="color: #6b7280;">Date: ${formatDate(email.date)}</span>
              </div>
              <div class="recipients">
                <strong>To:</strong> ${email.to.join(', ')}
                ${email.cc && email.cc.length > 0 ? `<br><strong>CC:</strong> ${email.cc.join(', ')}` : ''}
              </div>
            </div>
            <div class="content">
              <div class="email-body">${email.content.body}</div>
              ${email.content.attachments.length > 0 ? `
                <div class="attachments">
                  <h3>Attachments (${email.content.attachments.length})</h3>
                  ${email.content.attachments.map(att => `
                    <div class="attachment">
                      <div>
                        <div style="font-weight: 500;">${att.name}</div>
                        <div style="color: #6b7280; font-size: 14px;">${formatFileSize(att.size)} • ${att.type}</div>
                      </div>
                      <button style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                        Download
                      </button>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
    setShowMaximizeMenu(false);
  };

  const openFullScreenModal = () => {
    setShowFullScreenModal(true);
    setShowMaximizeMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Email Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-semibold text-gray-900">{email.subject}</h1>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(email.priority)}`}>
                {email.priority}
              </span>
              {email.isFlagged && (
                <FiFlag className="text-yellow-500" />
              )}
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FiUser className="text-gray-400" />
                <span><strong>From:</strong> {email.from}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <FiUsers className="text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <span className="font-medium">To:</span> {formatRecipients(email.to, 5)}
                  {email.to.length > 5 && (
                    <button
                      onClick={() => setShowRecipientModal(true)}
                      className="text-primary-600 hover:text-primary-700 text-xs font-medium ml-2"
                    >
                      View all
                    </button>
                  )}
                </div>
              </div>
              
              {email.cc && email.cc.length > 0 && (
                <div className="flex items-start gap-2">
                  <FiUsers className="text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-medium">CC:</span> {formatRecipients(email.cc, 5)}
                    {email.cc.length > 5 && (
                      <button
                        onClick={() => setShowRecipientModal(true)}
                        className="text-primary-600 hover:text-primary-700 text-xs font-medium ml-2"
                      >
                        View all
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <span><strong>Date:</strong> {formatDate(email.date)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Maximize Dropdown */}
            <div className="relative flex items-center">
              <button
                onClick={openFullScreenModal}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Open in full screen"
              >
                <FiMaximize className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setShowMaximizeMenu(!showMaximizeMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="More options"
              >
                <FiChevronDown className="w-3 h-3" />
              </button>
              
              {showMaximizeMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-48">
                  <button
                    onClick={openNewWindow}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FiMonitor className="w-4 h-4" />
                    Open in New Window
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => handleAction('flag')}
              className="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <FiStar className={email.isFlagged ? 'text-yellow-500 fill-current' : ''} />
            </button>
          </div>
        </div>

        {/* Review Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleAction('approve')}
            className="btn-primary flex items-center gap-1 py-1.5 px-3 text-sm"
          >
            <FiCheck className="w-3 h-3" />
            Approve
          </button>
          
          <button
            onClick={() => handleAction('reject')}
            className="btn-danger flex items-center gap-1 py-1.5 px-3 text-sm"
          >
            <FiX className="w-3 h-3" />
            Reject
          </button>
          
          <button
            onClick={() => handleAction('flag')}
            className="btn-secondary flex items-center gap-1 py-1.5 px-3 text-sm"
          >
            <FiFlag className="w-3 h-3" />
            Flag
          </button>
          
          <button
            onClick={() => handleAction('forward')}
            className="btn-secondary flex items-center gap-1 py-1.5 px-3 text-sm"
          >
            <FiShare2 className="w-3 h-3" />
            Forward
          </button>
          
          <button
            onClick={() => handleAction('archive')}
            className="btn-secondary flex items-center gap-1 py-1.5 px-3 text-sm"
          >
            <FiArchive className="w-3 h-3" />
            Archive
          </button>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {email.content.body}
          </div>
        </div>

        {/* Attachments */}
        {email.content.attachments.length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FiPaperclip className="w-5 h-5" />
              Attachments ({email.content.attachments.length})
            </h3>
            
            <div className="space-y-3">
              {email.content.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FiPaperclip className="text-gray-400 w-5 h-5" />
                    <div>
                      <div className="font-medium text-gray-900">{attachment.name}</div>
                      <div className="text-sm text-gray-500">
                        {formatFileSize(attachment.size)} • {attachment.type}
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn-secondary flex items-center gap-2">
                    <FiDownload className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recipient Modal */}
      <RecipientModal
        isOpen={showRecipientModal}
        onClose={() => setShowRecipientModal(false)}
        to={email.to}
        cc={email.cc}
        bcc={email.bcc}
      />

      {/* Full Screen Modal */}
      {showFullScreenModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{email.subject}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Full Screen View - {email.from}
                </p>
              </div>
              
              <button
                onClick={() => setShowFullScreenModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Close full screen"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Email Header */}
            <div className="bg-white border-b border-gray-200 p-6 flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(email.priority)}`}>
                  {email.priority}
                </span>
                {email.isFlagged && (
                  <FiFlag className="text-yellow-500" />
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FiUser className="text-gray-400" />
                  <span><strong>From:</strong> {email.from}</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <FiUsers className="text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-medium">To:</span> {email.to.join(', ')}
                  </div>
                </div>
                
                {email.cc && email.cc.length > 0 && (
                  <div className="flex items-start gap-2">
                    <FiUsers className="text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-medium">CC:</span> {email.cc.join(', ')}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400" />
                  <span><strong>Date:</strong> {formatDate(email.date)}</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 bg-white p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {email.content.body}
                </div>
              </div>
            </div>

            {/* Attachments */}
            {email.content.attachments.length > 0 && (
              <div className="bg-white border-t border-gray-200 p-6 flex-shrink-0">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FiPaperclip className="w-5 h-5" />
                  Attachments ({email.content.attachments.length})
                </h3>
                
                <div className="space-y-3">
                  {email.content.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FiPaperclip className="text-gray-400 w-5 h-5" />
                        <div>
                          <div className="font-medium text-gray-900">{attachment.name}</div>
                          <div className="text-sm text-gray-500">
                            {formatFileSize(attachment.size)} • {attachment.type}
                          </div>
                        </div>
                      </div>
                      
                      <button className="btn-secondary flex items-center gap-2">
                        <FiDownload className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Comment for {pendingAction === 'reject' ? 'Rejection' : 'Flag'}
            </h3>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => submitAction(pendingAction!)}
                className="btn-primary flex-1"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setComment('');
                  setPendingAction(null);
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailReadingPane; 