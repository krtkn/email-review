import React, { useState } from 'react';
import { FiUsers, FiUser } from 'react-icons/fi';

interface RecipientListProps {
  recipients: string[];
  type: 'to' | 'cc' | 'bcc';
  maxVisible?: number;
}

const RecipientList: React.FC<RecipientListProps> = ({ 
  recipients, 
  type, 
  maxVisible = 5 
}) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!recipients || recipients.length === 0) {
    return null;
  }

  const visibleRecipients = showAll ? recipients : recipients.slice(0, maxVisible);
  const hiddenCount = recipients.length - maxVisible;
  const shouldTruncate = recipients.length > maxVisible && !showAll;

  const getTypeLabel = (): string => {
    switch (type) {
      case 'to': return 'To';
      case 'cc': return 'CC';
      case 'bcc': return 'BCC';
      default: return 'To';
    }
  };

  const getTypeIcon = () => {
    return type === 'to' ? <FiUser className="text-gray-400" /> : <FiUsers className="text-gray-400" />;
  };

  return (
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        {getTypeIcon()}
        <span><strong>{getTypeLabel()}:</strong></span>
      </div>
      
      <div className="ml-6">
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {visibleRecipients.map((recipient, index) => (
            <div key={index} className="text-gray-700 break-all">
              {recipient}
            </div>
          ))}
        </div>
        
        {shouldTruncate && (
          <button
            onClick={() => setShowAll(true)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors mt-2"
          >
            +{hiddenCount} more recipients
          </button>
        )}
        
        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors mt-2"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipientList; 