import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { Email } from '../types/email'

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="app-wrapper">
      {children}
    </div>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Test data factories
export const createMockEmail = (overrides = {}): Email => ({
  id: '1',
  from: 'test@example.com',
  to: ['recipient@example.com'],
  cc: [],
  subject: 'Test Email',
  date: '2024-01-15T10:00:00Z',
  isRead: false,
  isFlagged: false,
  hasAttachments: false,
  priority: 'normal',
  content: {
    id: '1',
    body: 'Test email body',
    attachments: []
  },
  ...overrides
})

export const createMockEmailWithManyRecipients = (): Email => ({
  ...createMockEmail(),
  to: Array.from({ length: 25 }, (_, i) => `user${i}@company.com`),
  subject: 'Company-wide announcement',
  content: {
    id: '1',
    body: 'This is a company-wide announcement with many recipients.',
    attachments: []
  }
})

export const createMockEmails = (count = 5): Email[] => {
  return Array.from({ length: count }, (_, i) => 
    createMockEmail({
      id: `${i + 1}`,
      subject: `Test Email ${i + 1}`,
      from: `user${i + 1}@company.com`,
      date: new Date(2024, 0, 15, 10 + i, 0, 0).toISOString()
    })
  )
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render } 