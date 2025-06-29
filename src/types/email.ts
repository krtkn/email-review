export interface EmailHeader {
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
}

export interface EmailContent {
  id: string;
  body: string;
  htmlBody?: string;
  attachments: EmailAttachment[];
}

export interface EmailAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface Email extends EmailHeader {
  content: EmailContent;
}

export interface EmailReviewAction {
  id: string;
  action: 'approve' | 'reject' | 'flag' | 'forward' | 'archive';
  comment?: string;
  timestamp: string;
  reviewer: string;
} 