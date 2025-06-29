import { FiX, FiUser, FiUsers } from 'react-icons/fi';

interface RecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  to: string[];
  cc?: string[];
  bcc?: string[];
}

const RecipientModal: React.FC<RecipientModalProps> = ({ 
  isOpen, 
  onClose, 
  to, 
  cc, 
  bcc 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-96 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recipients</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-80">
          <div className="space-y-4">
            {/* To Recipients */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FiUser className="text-gray-400 w-4 h-4" />
                <span className="font-medium text-gray-900">To ({to.length})</span>
              </div>
              <div className="space-y-1">
                {to.map((recipient, index) => (
                  <div key={index} className="text-sm text-gray-700 pl-6">
                    {recipient}
                  </div>
                ))}
              </div>
            </div>

            {/* CC Recipients */}
            {cc && cc.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiUsers className="text-gray-400 w-4 h-4" />
                  <span className="font-medium text-gray-900">CC ({cc.length})</span>
                </div>
                <div className="space-y-1">
                  {cc.map((recipient, index) => (
                    <div key={index} className="text-sm text-gray-700 pl-6">
                      {recipient}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BCC Recipients */}
            {bcc && bcc.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiUsers className="text-gray-400 w-4 h-4" />
                  <span className="font-medium text-gray-900">BCC ({bcc.length})</span>
                </div>
                <div className="space-y-1">
                  {bcc.map((recipient, index) => (
                    <div key={index} className="text-sm text-gray-700 pl-6">
                      {recipient}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-secondary py-1.5 px-4 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientModal; 