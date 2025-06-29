import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import { render, createMockEmails, createMockEmail } from '../../test/test-utils'
import EmailList from '../EmailList'
import { emailService } from '../../services/emailService'

// Mock the email service
vi.mock('../../services/emailService', () => ({
  emailService: {
    getHybridEmails: vi.fn(),
    markAsRead: vi.fn(),
    toggleFlag: vi.fn(),
  }
}))

describe('EmailList', () => {
  const mockEmails = createMockEmails(3)
  const mockOnEmailSelect = vi.fn()
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    mockOnEmailSelect.mockClear()
    mockOnSearch.mockClear()
    vi.clearAllMocks()
    // Default mock implementation
    vi.mocked(emailService.getHybridEmails).mockResolvedValue(mockEmails)
    vi.mocked(emailService.markAsRead).mockResolvedValue()
    vi.mocked(emailService.toggleFlag).mockResolvedValue()
  })

  it('renders list of emails with correct information', async () => {
    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    // Check that all emails are rendered
    expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    expect(screen.getByText('Test Email 2')).toBeInTheDocument()
    expect(screen.getByText('Test Email 3')).toBeInTheDocument()

    // Check sender information (username only)
    expect(screen.getByText('user1')).toBeInTheDocument()
    expect(screen.getByText('user2')).toBeInTheDocument()
    expect(screen.getByText('user3')).toBeInTheDocument()
  })

  it('allows user to select an email', async () => {
    const user = userEvent.setup()
    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    // Find and click the first email
    const emailItem = screen.getByText('Test Email 1')
    await user.click(emailItem)

    // Verify the callback was called with the correct email
    expect(mockOnEmailSelect).toHaveBeenCalledWith(mockEmails[0])
  })

  it('applies selected styling to clicked email', async () => {
    render(<EmailList selectedEmailId="1" onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    // Check that the first email has selected styling ('selected' class)
    const emailItem = screen.getByText('Test Email 1').closest('.email-item')
    expect(emailItem).toHaveClass('selected')
  })

  it('filters emails based on search query', async () => {
    const user = userEvent.setup()
    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    // Find search input and type
    const searchInput = screen.getByPlaceholderText('Search emails...')
    await user.type(searchInput, 'Test Email 1')

    // Verify only the matching email is shown
    expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Email 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Email 3')).not.toBeInTheDocument()
  })

  it('filters by priority when priority filter is applied', async () => {
    const user = userEvent.setup()
    const emailsWithPriority = [
      createMockEmail({ id: '1', subject: 'High Priority', priority: 'high' }),
      createMockEmail({ id: '2', subject: 'Normal Priority', priority: 'normal' }),
      createMockEmail({ id: '3', subject: 'Low Priority', priority: 'low' })
    ]
    vi.mocked(emailService.getHybridEmails).mockResolvedValue(emailsWithPriority)

    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getAllByText('High Priority').length).toBeGreaterThan(0)
    })

    // Click on high priority filter
    const prioritySelect = screen.getByRole('combobox')
    await user.selectOptions(prioritySelect, 'high')

    // Verify only high priority emails are shown (check headings, not dropdown options)
    expect(screen.getAllByText('High Priority').length).toBeGreaterThan(0)
    expect(screen.queryByRole('heading', { name: 'Normal Priority' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Low Priority' })).not.toBeInTheDocument()
  })

  it('shows pagination controls when more than 10 emails', async () => {
    const manyEmails = createMockEmails(15)
    vi.mocked(emailService.getHybridEmails).mockResolvedValue(manyEmails)

    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    // Check pagination controls are present
    expect(screen.getByText('1-10 of 15')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('navigates to next page when next button is clicked', async () => {
    const user = userEvent.setup()
    const manyEmails = createMockEmails(15)
    vi.mocked(emailService.getHybridEmails).mockResolvedValue(manyEmails)

    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    // Click next button
    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    // Verify page 2 is shown
    expect(screen.getByText('11-15 of 15')).toBeInTheDocument()
    expect(screen.getByText('Test Email 11')).toBeInTheDocument()
  })

  it('disables prev button on first page', async () => {
    const manyEmails = createMockEmails(15)
    vi.mocked(emailService.getHybridEmails).mockResolvedValue(manyEmails)

    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    const prevButton = screen.getByLabelText('Previous')
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', async () => {
    const user = userEvent.setup()
    const manyEmails = createMockEmails(15)
    vi.mocked(emailService.getHybridEmails).mockResolvedValue(manyEmails)

    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    // Click next button to go to last page
    const nextButton = screen.getByLabelText('Next')
    await user.click(nextButton)

    // On last page, next button should not exist or should be disabled
    expect(nextButton).toBeDisabled()
  })

  it('shows correct email count and current page', async () => {
    const manyEmails = createMockEmails(15)
    vi.mocked(emailService.getHybridEmails).mockResolvedValue(manyEmails)

    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for emails to load
    await waitFor(() => {
      expect(screen.getByText('Test Email 1')).toBeInTheDocument()
    })

    expect(screen.getByText('1-10 of 15')).toBeInTheDocument()
  })

  it('handles empty email list gracefully', async () => {
    vi.mocked(emailService.getHybridEmails).mockResolvedValue([])

    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('No emails found')).toBeInTheDocument()
    })
  })

  it('shows loading state initially', () => {
    vi.mocked(emailService.getHybridEmails).mockImplementation(() => new Promise(() => {})) // Never resolves

    render(<EmailList selectedEmailId={null} onEmailSelect={mockOnEmailSelect} onSearch={mockOnSearch} />)

    // Check for loading spinner
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
}) 