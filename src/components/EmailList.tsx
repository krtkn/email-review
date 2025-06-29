import { useState, useEffect } from 'react';
import { Email } from '../types/email';
import { emailService } from '../services/emailService';
import { FiSearch, FiFlag, FiPaperclip, FiStar, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import RecipientModal from './RecipientModal';

interface EmailListProps {
  selectedEmailId: string | null;
  onEmailSelect: (email: Email) => void;
  onSearch: (query: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ selectedEmailId, onEmailSelect, onSearch }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'normal' | 'low'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [recipientModal, setRecipientModal] = useState<{
    isOpen: boolean;
    email: Email | null;
  }>({ isOpen: false, email: null });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage, setEmailsPerPage] = useState(10);

  useEffect(() => {
    loadEmails();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterPriority, showUnreadOnly]);

  const loadEmails = async () => {
    try {
      setLoading(true);
      // Use hybrid approach (mock structure + API content)
      const emailData = await emailService.getHybridEmails();
      setEmails(emailData);
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleEmailClick = async (email: Email) => {
    onEmailSelect(email);
    if (!email.isRead) {
      await emailService.markAsRead(email.id);
      setEmails(prev => prev.map(e => 
        e.id === email.id ? { ...e, isRead: true } : e
      ));
    }
  };

  const handleToggleFlag = async (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await emailService.toggleFlag(emailId);
    setEmails(prev => prev.map(e => 
      e.id === emailId ? { ...e, isFlagged: !e.isFlagged } : e
    ));
  };

  const showRecipientModal = (email: Email, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecipientModal({ isOpen: true, email });
  };

  const closeRecipientModal = () => {
    setRecipientModal({ isOpen: false, email: null });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'normal': return 'text-gray-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const formatRecipients = (recipients: string[], maxVisible: number = 2) => {
    if (recipients.length <= maxVisible) {
      return recipients.join(', ');
    }
    const visible = recipients.slice(0, maxVisible);
    const hidden = recipients.length - maxVisible;
    return `${visible.join(', ')} +${hidden} more`;
  };

  const filteredEmails = emails.filter(email => {
    const matchesSearch = searchQuery === '' || 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || email.priority === filterPriority;
    const matchesUnread = !showUnreadOnly || !email.isRead;
    
    return matchesSearch && matchesPriority && matchesUnread;
  });

  // Pagination calculations
  const totalEmails = filteredEmails.length;
  const totalPages = Math.ceil(totalEmails / emailsPerPage);
  const startIndex = (currentPage - 1) * emailsPerPage;
  const endIndex = startIndex + emailsPerPage;
  const currentEmails = filteredEmails.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full" role="status">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        
        {/* Search */}
        <div className="relative mb-3">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as 'all' | 'high' | 'normal' | 'low')}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="normal">Normal Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <button
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              showUnreadOnly 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Unread Only
          </button>
        </div>

        <div className="text-sm text-gray-500">
          {totalEmails} of {emails.length} emails
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {currentEmails.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No emails found
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {currentEmails.map((email) => {
              const hasManyRecipients = email.to.length > 2 || (email.cc && email.cc.length > 2);
              
              return (
                <div
                  key={email.id}
                  onClick={() => handleEmailClick(email)}
                  className={`email-item p-4 ${selectedEmailId === email.id ? 'selected' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(email.priority)} bg-gray-100`}>
                        {email.priority}
                      </span>
                      {email.isFlagged && (
                        <FiFlag className="text-yellow-500 text-sm" />
                      )}
                      {email.hasAttachments && (
                        <FiPaperclip className="text-gray-400 text-sm" />
                      )}
                    </div>
                    <button
                      onClick={(e) => handleToggleFlag(email.id, e)}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      <FiStar className={email.isFlagged ? 'text-yellow-500 fill-current' : ''} />
                    </button>
                  </div>

                  <div className="mb-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium text-sm ${!email.isRead ? 'font-semibold' : ''}`}>
                        {email.from.split('@')[0]}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(email.date)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-1">
                    <h3 className={`text-sm ${!email.isRead ? 'font-semibold' : ''} line-clamp-1`}>
                      {email.subject}
                    </h3>
                  </div>

                  <div className="text-xs text-gray-500 line-clamp-2">
                    {email.content.body.substring(0, 100)}...
                  </div>

                  <div className="text-xs text-gray-400 mt-1">
                    <div className="flex items-center gap-2">
                      <span>To: {formatRecipients(email.to, 2)}</span>
                      {hasManyRecipients && (
                        <button
                          onClick={(e) => showRecipientModal(email, e)}
                          className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center gap-1"
                        >
                          <FiUsers className="w-3 h-3" />
                          View all
                        </button>
                      )}
                    </div>
                    {email.cc && email.cc.length > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span>CC: {formatRecipients(email.cc, 2)}</span>
                        {email.cc.length > 2 && (
                          <button
                            onClick={(e) => showRecipientModal(email, e)}
                            className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center gap-1"
                          >
                            <FiUsers className="w-3 h-3" />
                            View all
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={emailsPerPage}
                onChange={(e) => {
                  setEmailsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, totalEmails)} of {totalEmails}
              </span>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-2 py-1 text-sm rounded ${
                          currentPage === pageNum
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recipient Modal */}
      <RecipientModal
        isOpen={recipientModal.isOpen}
        onClose={closeRecipientModal}
        to={recipientModal.email?.to || []}
        cc={recipientModal.email?.cc}
        bcc={recipientModal.email?.bcc}
      />
    </div>
  );
};

export default EmailList; 