import { describe, it, expect, vi, beforeEach } from 'vitest'
import { emailService } from '../emailService'

// Mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('emailService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getHybridEmails', () => {
    it('returns mock emails when API call fails', async () => {
      // Mock fetch to fail
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const emails = await emailService.getHybridEmails()

      expect(emails).toHaveLength(25)
      expect(emails[0]).toHaveProperty('id')
      expect(emails[0]).toHaveProperty('from')
      expect(emails[0]).toHaveProperty('subject')
      expect(emails[0]).toHaveProperty('content')
    })

    it('returns hybrid emails when API call succeeds', async () => {
      // Mock successful API response
      const mockApiResponse = [
        { id: 1, title: 'Test Post 1', body: 'Test body 1' },
        { id: 2, title: 'Test Post 2', body: 'Test body 2' }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      } as Response)

      const emails = await emailService.getHybridEmails()

      expect(emails).toHaveLength(25)
      // Check that API content is used
      expect(emails[0].content.body).toContain('Test body')
    })
  })

  describe('markAsRead', () => {
    it('marks email as read successfully', async () => {
      const emailId = '1'
      
      await expect(emailService.markAsRead(emailId)).resolves.toBeUndefined()
    })
  })

  describe('toggleFlag', () => {
    it('toggles email flag successfully', async () => {
      const emailId = '1'
      
      await expect(emailService.toggleFlag(emailId)).resolves.toBeUndefined()
    })
  })

  describe('getEmails', () => {
    it('returns the correct number of mock emails', async () => {
      const emails = await emailService.getEmails()
      
      expect(emails).toHaveLength(25)
      expect(emails[0]).toHaveProperty('id', '1')
      expect(emails[0]).toHaveProperty('from')
      expect(emails[0]).toHaveProperty('subject')
    })

    it('includes email with many recipients', async () => {
      const emails = await emailService.getEmails()
      const emailWithManyRecipients = emails.find((email) => email.id === '6')
      
      expect(emailWithManyRecipients).toBeDefined()
      expect(emailWithManyRecipients?.to).toHaveLength(25)
    })
  })

  describe('getEmailsFromAPI', () => {
    it('fetches emails from API successfully', async () => {
      const mockApiResponse = [
        { id: 1, title: 'API Post 1', body: 'API body 1' },
        { id: 2, title: 'API Post 2', body: 'API body 2' }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse
      } as Response)

      const emails = await emailService.getEmailsFromAPI()

      expect(emails).toHaveLength(2)
      expect(emails[0].content.body).toContain('API body 1')
      expect(emails[0].subject).toBe('API Post 1')
    })

    it('handles API errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API Error'))

      // Should fall back to mock data instead of throwing
      const emails = await emailService.getEmailsFromAPI()
      expect(emails).toHaveLength(25)
    })

    it('handles non-ok response by falling back to mock data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response)

      // Should fall back to mock data instead of throwing
      const emails = await emailService.getEmailsFromAPI()
      expect(emails).toHaveLength(25)
    })
  })
}) 