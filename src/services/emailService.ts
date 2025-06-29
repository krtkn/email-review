import { Email, EmailReviewAction } from '../types/email';

// Mock data for demonstration
const mockEmails: Email[] = [
  {
    id: '1',
    from: 'john.doe@company.com',
    to: ['reviewer@company.com'],
    cc: ['manager@company.com'],
    subject: 'Q4 Marketing Campaign Review',
    date: '2024-01-15T10:30:00Z',
    isRead: false,
    isFlagged: true,
    hasAttachments: true,
    priority: 'high',
    content: {
      id: '1',
      body: `Hi Team,

I've prepared the Q4 marketing campaign materials for review. Please find attached the campaign strategy document and budget breakdown.

Key highlights:
- Social media campaign across 3 platforms
- Influencer partnerships with 5 key personalities
- TV and radio advertisements
- Total budget: $500,000

Please review and provide feedback by Friday.

Best regards,
John Doe
Marketing Director`,
      attachments: [
        {
          id: 'att1',
          name: 'Q4_Campaign_Strategy.pdf',
          size: 2048576,
          type: 'application/pdf'
        },
        {
          id: 'att2',
          name: 'Budget_Breakdown.xlsx',
          size: 512000,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      ]
    }
  },
  {
    id: '2',
    from: 'sarah.smith@company.com',
    to: ['reviewer@company.com'],
    subject: 'New Product Launch Timeline',
    date: '2024-01-15T09:15:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: false,
    priority: 'normal',
    content: {
      id: '2',
      body: `Hello,

I wanted to share the updated timeline for our new product launch. We're on track for the March 1st release date.

Timeline:
- Feb 1: Final testing phase
- Feb 15: Marketing materials ready
- Feb 20: Press release distribution
- March 1: Product launch

Let me know if you need any adjustments.

Thanks,
Sarah`,
      attachments: []
    }
  },
  {
    id: '3',
    from: 'mike.johnson@company.com',
    to: ['reviewer@company.com'],
    cc: ['legal@company.com'],
    subject: 'Contract Review Required - Vendor Agreement',
    date: '2024-01-15T08:45:00Z',
    isRead: false,
    isFlagged: true,
    hasAttachments: true,
    priority: 'high',
    content: {
      id: '3',
      body: `Dear Review Team,

I've received the vendor agreement for our new software licensing deal. This requires immediate review as the vendor is pushing for a quick turnaround.

Key terms to review:
- 3-year contract term
- $250,000 annual licensing fee
- Service level agreements
- Termination clauses

Please review and provide approval by end of day.

Regards,
Mike Johnson
Procurement Manager`,
      attachments: [
        {
          id: 'att3',
          name: 'Vendor_Agreement_2024.pdf',
          size: 1536000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '4',
    from: 'lisa.wang@company.com',
    to: ['reviewer@company.com'],
    subject: 'Weekly Team Update',
    date: '2024-01-15T07:30:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: false,
    priority: 'low',
    content: {
      id: '4',
      body: `Hi everyone,

Here's our weekly team update:

Completed this week:
- Completed user research interviews
- Updated product roadmap
- Fixed 15 bugs in the current sprint

Next week's priorities:
- Start design sprint
- Review competitor analysis
- Prepare for quarterly planning

Have a great weekend!

Lisa`,
      attachments: []
    }
  },
  {
    id: '5',
    from: 'david.brown@company.com',
    to: ['reviewer@company.com'],
    cc: ['finance@company.com'],
    subject: 'Budget Approval Request - IT Infrastructure',
    date: '2024-01-14T16:20:00Z',
    isRead: false,
    isFlagged: false,
    hasAttachments: true,
    priority: 'normal',
    content: {
      id: '5',
      body: `Hello Review Team,

I'm requesting approval for the IT infrastructure upgrade budget. Our current systems are reaching end-of-life and need replacement.

Budget breakdown:
- Server hardware: $75,000
- Network equipment: $25,000
- Software licenses: $15,000
- Implementation services: $20,000
- Total: $135,000

This investment will improve system reliability and performance by 40%.

Please review the attached detailed proposal.

Best regards,
David Brown
IT Director`,
      attachments: [
        {
          id: 'att4',
          name: 'IT_Infrastructure_Proposal.pdf',
          size: 3072000,
          type: 'application/pdf'
        },
        {
          id: 'att5',
          name: 'Budget_Details.xlsx',
          size: 256000,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      ]
    }
  },
  {
    id: '6',
    from: 'hr.department@company.com',
    to: [
      'reviewer@company.com',
      'john.smith@company.com',
      'jane.doe@company.com',
      'mike.wilson@company.com',
      'sarah.jones@company.com',
      'david.brown@company.com',
      'lisa.wang@company.com',
      'alex.chen@company.com',
      'emma.davis@company.com',
      'chris.lee@company.com',
      'rachel.green@company.com',
      'tom.anderson@company.com',
      'jessica.white@company.com',
      'kevin.martin@company.com',
      'amanda.taylor@company.com',
      'ryan.garcia@company.com',
      'stephanie.rodriguez@company.com',
      'brandon.miller@company.com',
      'ashley.thompson@company.com',
      'jordan.clark@company.com',
      'taylor.lewis@company.com',
      'morgan.hall@company.com',
      'casey.allen@company.com',
      'jamie.young@company.com',
      'riley.king@company.com'
    ],
    cc: ['management@company.com'],
    subject: 'Comprehensive Q1 2024 Company Policy Updates and Implementation Guidelines',
    date: '2024-01-14T14:15:00Z',
    isRead: false,
    isFlagged: true,
    hasAttachments: true,
    priority: 'high',
    content: {
      id: '6',
      body: `Dear Team Members,

I hope this email finds you well. I am writing to inform you about the comprehensive updates to our company policies that will be implemented effective March 1st, 2024. These changes represent a significant step forward in our commitment to creating a more inclusive, productive, and legally compliant workplace environment.

**OVERVIEW OF CHANGES**

The policy updates encompass several key areas that directly impact our daily operations and long-term strategic objectives. These modifications have been developed through extensive consultation with legal experts, industry best practices, and feedback from various departments across the organization. We believe these changes will enhance our workplace culture while ensuring we remain competitive in our industry.

**REMOTE WORK POLICY EXPANSION**

Our remote work policy has been significantly expanded to accommodate the evolving nature of work in the post-pandemic era. Employees will now have the option to work remotely up to three days per week, with the remaining two days requiring in-office presence for team collaboration and meetings. This hybrid approach balances the benefits of remote work with the importance of maintaining strong team relationships and company culture.

The new policy includes detailed guidelines for setting up home offices, maintaining productivity standards, and ensuring effective communication with team members and supervisors. We have also established clear protocols for requesting remote work arrangements and the approval process for extended remote work periods.

**UPDATED LEAVE AND TIME-OFF POLICIES**

We have completely revamped our leave and time-off policies to provide greater flexibility and support for our employees' diverse needs. The new policy introduces unlimited paid time off (PTO) for all full-time employees, with a minimum requirement of 15 days per year to ensure employees take adequate time for rest and rejuvenation.

Additionally, we have expanded our parental leave policy to provide 16 weeks of paid leave for all new parents, regardless of gender or family structure. This progressive policy reflects our commitment to supporting families and promoting work-life balance. We have also introduced new categories of leave, including mental health days, bereavement leave, and volunteer time off.

**ENHANCED DIVERSITY, EQUITY, AND INCLUSION INITIATIVES**

Our updated policies include comprehensive diversity, equity, and inclusion (DEI) guidelines that go beyond basic compliance requirements. These initiatives are designed to create a truly inclusive workplace where all employees feel valued, respected, and empowered to contribute their best work.

The new DEI framework includes mandatory unconscious bias training for all employees, regular diversity audits, and the establishment of employee resource groups (ERGs) to support various communities within our organization. We have also implemented new hiring practices designed to increase diversity in our candidate pools and ensure fair evaluation processes.

**PERFORMANCE MANAGEMENT AND CAREER DEVELOPMENT**

We have completely redesigned our performance management system to focus on continuous feedback and development rather than annual reviews. The new system emphasizes regular check-ins between employees and managers, goal setting and tracking, and ongoing professional development opportunities.

The updated policy includes a new career development framework that provides clear pathways for advancement, skill development programs, and mentorship opportunities. We have also introduced a new compensation structure that ensures pay equity and competitive salaries across all levels of the organization.

**TECHNOLOGY AND DATA SECURITY POLICIES**

Given the increasing importance of cybersecurity and data protection, we have implemented comprehensive technology and data security policies. These policies address the use of personal devices for work purposes, data handling procedures, and security protocols for remote work environments.

The new policies include mandatory cybersecurity training for all employees, guidelines for secure communication practices, and protocols for reporting potential security incidents. We have also established clear guidelines for the use of artificial intelligence tools and other emerging technologies in the workplace.

**IMPLEMENTATION TIMELINE AND TRAINING**

The implementation of these policy changes will occur over a three-month period, beginning March 1st, 2024. We have developed a comprehensive training program that includes online modules, in-person workshops, and one-on-one sessions with HR representatives to ensure all employees understand the new policies and their implications.

Training sessions will be scheduled during regular business hours, and employees will be compensated for their time spent in training. We encourage all team members to actively participate in these sessions and ask questions to ensure they fully understand how these changes will affect their work and benefits.

**FEEDBACK AND SUPPORT**

We recognize that policy changes can be challenging, and we are committed to supporting our employees throughout this transition period. We have established multiple channels for feedback, questions, and concerns, including dedicated email addresses, office hours with HR representatives, and anonymous feedback forms.

We encourage all employees to provide feedback on these policies and their implementation. Your input is valuable and will help us refine these policies to better serve our organization and its members. We are committed to making adjustments based on feedback and ensuring these policies work effectively for everyone.

**NEXT STEPS**

In the coming weeks, you will receive detailed information about each policy change, including specific guidelines, procedures, and contact information for questions. We will also be hosting town hall meetings to discuss these changes and address any concerns you may have.

Please mark your calendars for the upcoming training sessions and review the attached policy documents at your convenience. We are confident that these updates will create a more positive, productive, and inclusive workplace for all of us.

Thank you for your attention to this important matter. We appreciate your cooperation and look forward to implementing these positive changes together.

Best regards,

The HR Department
Human Resources Team
Company Name

P.S. Please don't hesitate to reach out if you have any questions or concerns about these policy updates. We're here to help ensure a smooth transition for everyone.`,
      attachments: [
        {
          id: 'att6',
          name: 'Q1_2024_Policy_Updates.pdf',
          size: 5120000,
          type: 'application/pdf'
        },
        {
          id: 'att7',
          name: 'Implementation_Timeline.xlsx',
          size: 1024000,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        {
          id: 'att8',
          name: 'Training_Schedule.pdf',
          size: 2048000,
          type: 'application/pdf'
        },
        {
          id: 'att9',
          name: 'FAQ_Document.pdf',
          size: 1536000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '7',
    from: 'alex.chen@company.com',
    to: ['reviewer@company.com'],
    subject: 'Security Incident Report - Unauthorized Access Attempt',
    date: '2024-01-14T13:45:00Z',
    isRead: false,
    isFlagged: true,
    hasAttachments: true,
    priority: 'high',
    content: {
      id: '7',
      body: `URGENT: Security Incident Report

Our security monitoring system detected multiple unauthorized access attempts to our customer database yesterday evening. The attempts originated from an IP address in Eastern Europe and were blocked by our firewall.

Incident Details:
- Time: 2024-01-13 18:30-22:15 UTC
- Source IP: 192.168.1.100 (masked for security)
- Target: Customer database API
- Attempts: 1,247 failed login attempts
- Status: Blocked and contained

No customer data was compromised, but we need to review our security protocols and consider additional measures.

Please review the attached security report and provide recommendations.

Alex Chen
Security Team Lead`,
      attachments: [
        {
          id: 'att10',
          name: 'Security_Incident_Report.pdf',
          size: 1024000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '8',
    from: 'emma.davis@company.com',
    to: ['reviewer@company.com'],
    cc: ['marketing@company.com'],
    subject: 'Brand Guidelines Update - New Logo and Color Palette',
    date: '2024-01-14T12:20:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: true,
    priority: 'normal',
    content: {
      id: '8',
      body: `Hi Team,

I'm excited to share our updated brand guidelines! We've refreshed our logo and introduced a new color palette that better reflects our company's values and vision.

Key Changes:
- New simplified logo design
- Updated primary color palette
- Revised typography guidelines
- New brand voice guidelines

The new guidelines will be effective starting February 1st. All marketing materials should be updated by March 1st.

Please review the attached brand book and let me know if you have any questions.

Best regards,
Emma Davis
Brand Manager`,
      attachments: [
        {
          id: 'att11',
          name: 'Brand_Guidelines_2024.pdf',
          size: 4096000,
          type: 'application/pdf'
        },
        {
          id: 'att12',
          name: 'Logo_Assets.zip',
          size: 2048000,
          type: 'application/zip'
        }
      ]
    }
  },
  {
    id: '9',
    from: 'chris.lee@company.com',
    to: ['reviewer@company.com'],
    subject: 'Monthly Analytics Report - December 2023',
    date: '2024-01-14T11:10:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: true,
    priority: 'low',
    content: {
      id: '9',
      body: `Hello,

Attached is our monthly analytics report for December 2023. Here are the key highlights:

Performance Metrics:
- Website traffic: +15% vs November
- Conversion rate: 2.8% (target: 2.5%)
- Average session duration: 4m 32s
- Bounce rate: 42% (improved from 45%)

Top performing content:
1. Product comparison page
2. Customer testimonials
3. How-to guides

The team has been working hard on SEO optimization and it's showing positive results.

Chris Lee
Analytics Team`,
      attachments: [
        {
          id: 'att13',
          name: 'December_2023_Analytics.pdf',
          size: 2560000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '10',
    from: 'rachel.green@company.com',
    to: ['reviewer@company.com'],
    subject: 'Customer Feedback Summary - Q4 2023',
    date: '2024-01-14T10:30:00Z',
    isRead: false,
    isFlagged: false,
    hasAttachments: false,
    priority: 'normal',
    content: {
      id: '10',
      body: `Hi Review Team,

Here's a summary of our Q4 2023 customer feedback:

Overall Satisfaction: 4.2/5 (up from 4.0/5 in Q3)

Top Positive Feedback:
- Improved customer service response time
- Better product documentation
- More intuitive user interface

Areas for Improvement:
- Mobile app performance
- Integration with third-party tools
- Advanced feature tutorials

We've already started addressing the mobile app performance issues and will have updates ready by Q1 2024.

Rachel Green
Customer Success Manager`,
      attachments: []
    }
  },
  {
    id: '11',
    from: 'tom.anderson@company.com',
    to: ['reviewer@company.com'],
    cc: ['legal@company.com'],
    subject: 'Patent Application Review - New Algorithm',
    date: '2024-01-14T09:45:00Z',
    isRead: false,
    isFlagged: true,
    hasAttachments: true,
    priority: 'high',
    content: {
      id: '11',
      body: `Dear Review Committee,

I'm submitting our new machine learning algorithm for patent review. This algorithm improves our recommendation engine accuracy by 23% while reducing computational overhead by 40%.

Key Innovations:
- Novel neural network architecture
- Efficient data preprocessing pipeline
- Adaptive learning rate optimization
- Real-time model updating capability

The patent application deadline is January 31st, so we need expedited review.

Please review the technical documentation and provide feedback by January 25th.

Tom Anderson
Lead Data Scientist`,
      attachments: [
        {
          id: 'att14',
          name: 'Patent_Application_Draft.pdf',
          size: 6144000,
          type: 'application/pdf'
        },
        {
          id: 'att15',
          name: 'Technical_Specifications.pdf',
          size: 3072000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '12',
    from: 'jessica.white@company.com',
    to: ['reviewer@company.com'],
    subject: 'Office Renovation Schedule - Phase 2',
    date: '2024-01-14T08:20:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: true,
    priority: 'low',
    content: {
      id: '12',
      body: `Hello Everyone,

Phase 2 of our office renovation is scheduled to begin on February 15th. This phase will focus on the east wing of the building.

Renovation Details:
- New collaborative workspaces
- Updated conference rooms
- Improved lighting and acoustics
- Green building certifications

Timeline: February 15th - April 30th
Estimated disruption: Minimal during business hours

Please review the attached floor plans and let me know if you have any concerns.

Jessica White
Facilities Manager`,
      attachments: [
        {
          id: 'att16',
          name: 'Phase2_Floor_Plans.pdf',
          size: 3584000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '13',
    from: 'kevin.martin@company.com',
    to: ['reviewer@company.com'],
    subject: 'Quarterly Sales Performance Review',
    date: '2024-01-13T17:30:00Z',
    isRead: false,
    isFlagged: false,
    hasAttachments: true,
    priority: 'normal',
    content: {
      id: '13',
      body: `Hi Review Team,

Here's our Q4 2023 sales performance review:

Revenue: $2.4M (target: $2.2M) - 109% of target
New customers: 156 (target: 140) - 111% of target
Customer retention: 94% (target: 92%) - 102% of target

Top performing products:
1. Enterprise Suite - $850K
2. Professional Package - $620K
3. Basic Plan - $380K

We exceeded all targets for the quarter. The team has been working exceptionally hard and it shows in the results.

Kevin Martin
Sales Director`,
      attachments: [
        {
          id: 'att17',
          name: 'Q4_Sales_Report.pdf',
          size: 2048000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '14',
    from: 'amanda.taylor@company.com',
    to: ['reviewer@company.com'],
    subject: 'Employee Wellness Program Launch',
    date: '2024-01-13T16:15:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: false,
    priority: 'low',
    content: {
      id: '14',
      body: `Hello Team,

I'm excited to announce the launch of our new Employee Wellness Program! Starting February 1st, we'll be offering:

Wellness Benefits:
- Gym membership reimbursement (up to $50/month)
- Mental health counseling sessions
- Nutrition workshops
- Stress management classes
- Health screenings

The program is designed to support your physical and mental well-being. Participation is voluntary but highly encouraged.

Please check the company intranet for more details and registration information.

Amanda Taylor
HR Benefits Coordinator`,
      attachments: []
    }
  },
  {
    id: '15',
    from: 'ryan.garcia@company.com',
    to: ['reviewer@company.com'],
    cc: ['engineering@company.com'],
    subject: 'System Architecture Review - Microservices Migration',
    date: '2024-01-13T15:00:00Z',
    isRead: false,
    isFlagged: true,
    hasAttachments: true,
    priority: 'high',
    content: {
      id: '15',
      body: `Hi Review Team,

I'm requesting review of our proposed microservices architecture migration plan. This is a critical infrastructure decision that will impact our entire platform.

Migration Plan:
- Phase 1: User authentication service (Q2 2024)
- Phase 2: Payment processing service (Q3 2024)
- Phase 3: Content management service (Q4 2024)
- Phase 4: Analytics service (Q1 2025)

Benefits:
- Improved scalability
- Better fault isolation
- Faster deployment cycles
- Technology flexibility

Estimated cost: $150,000
Timeline: 12 months

Please review the technical specifications and provide feedback.

Ryan Garcia
Senior Software Architect`,
      attachments: [
        {
          id: 'att18',
          name: 'Microservices_Architecture.pdf',
          size: 8192000,
          type: 'application/pdf'
        },
        {
          id: 'att19',
          name: 'Migration_Timeline.xlsx',
          size: 512000,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      ]
    }
  },
  {
    id: '16',
    from: 'stephanie.rodriguez@company.com',
    to: ['reviewer@company.com'],
    subject: 'Content Marketing Strategy - Q1 2024',
    date: '2024-01-13T14:30:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: true,
    priority: 'normal',
    content: {
      id: '16',
      body: `Hi Review Team,

Here's our Q1 2024 content marketing strategy:

Content Themes:
- Industry trends and insights
- Customer success stories
- Product tutorials and guides
- Thought leadership articles

Publishing Schedule:
- 2 blog posts per week
- 1 whitepaper per month
- 1 webinar per quarter
- Daily social media updates

We're focusing on educational content that positions us as industry experts while providing value to our audience.

Stephanie Rodriguez
Content Marketing Manager`,
      attachments: [
        {
          id: 'att20',
          name: 'Q1_Content_Calendar.pdf',
          size: 1536000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '17',
    from: 'brandon.miller@company.com',
    to: ['reviewer@company.com'],
    subject: 'Competitive Analysis Update',
    date: '2024-01-13T13:45:00Z',
    isRead: false,
    isFlagged: false,
    hasAttachments: false,
    priority: 'low',
    content: {
      id: '17',
      body: `Hello,

I've completed our quarterly competitive analysis. Here are the key findings:

Market Position:
- We're #3 in market share (15%)
- Top competitor has 35% market share
- Second competitor has 22% market share

Competitive Advantages:
- Superior customer support
- More intuitive user interface
- Better integration capabilities

Areas for Improvement:
- Mobile app functionality
- Advanced analytics features
- International market presence

The full report is available on the company intranet.

Brandon Miller
Market Research Analyst`,
      attachments: []
    }
  },
  {
    id: '18',
    from: 'ashley.thompson@company.com',
    to: ['reviewer@company.com'],
    cc: ['finance@company.com'],
    subject: 'Budget Variance Report - December 2023',
    date: '2024-01-13T12:20:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: true,
    priority: 'normal',
    content: {
      id: '18',
      body: `Hi Review Team,

Here's our December 2023 budget variance report:

Overall Performance:
- Revenue: 5% above budget
- Operating expenses: 2% below budget
- Net profit: 12% above budget

Department Performance:
- Sales: 8% above budget
- Marketing: 3% below budget
- Engineering: 1% above budget
- Admin: 5% below budget

We're ending the year in a strong financial position with healthy margins across all departments.

Ashley Thompson
Financial Controller`,
      attachments: [
        {
          id: 'att21',
          name: 'December_Budget_Report.pdf',
          size: 2048000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '19',
    from: 'jordan.clark@company.com',
    to: ['reviewer@company.com'],
    subject: 'Product Roadmap Update - Q1 2024',
    date: '2024-01-13T11:30:00Z',
    isRead: false,
    isFlagged: true,
    hasAttachments: true,
    priority: 'high',
    content: {
      id: '19',
      body: `Hi Review Team,

I'm sharing our updated Q1 2024 product roadmap with some significant changes:

Major Features:
- Advanced reporting dashboard (Feb 15)
- Mobile app redesign (Mar 1)
- API v3.0 release (Mar 15)
- AI-powered recommendations (Apr 1)

Delayed Features:
- Multi-language support (moved to Q2)
- Advanced security features (moved to Q2)

The delays are due to resource constraints and technical challenges. We're confident these features will be worth the wait.

Jordan Clark
Product Manager`,
      attachments: [
        {
          id: 'att22',
          name: 'Q1_Product_Roadmap.pdf',
          size: 3072000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '20',
    from: 'taylor.lewis@company.com',
    to: ['reviewer@company.com'],
    subject: 'Customer Support Metrics - December 2023',
    date: '2024-01-13T10:45:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: false,
    priority: 'low',
    content: {
      id: '20',
      body: `Hello Review Team,

Here are our December 2023 customer support metrics:

Performance Metrics:
- Average response time: 2.3 hours (target: 4 hours)
- Customer satisfaction: 4.6/5 (target: 4.5/5)
- First call resolution: 78% (target: 75%)
- Support ticket volume: 1,247 (down 12% from November)

The team has been performing exceptionally well, exceeding all targets for the month.

Taylor Lewis
Customer Support Manager`,
      attachments: []
    }
  },
  {
    id: '21',
    from: 'morgan.hall@company.com',
    to: ['reviewer@company.com'],
    cc: ['legal@company.com'],
    subject: 'Compliance Audit Results - Q4 2023',
    date: '2024-01-13T09:15:00Z',
    isRead: false,
    isFlagged: true,
    hasAttachments: true,
    priority: 'high',
    content: {
      id: '21',
      body: `Dear Review Committee,

Our Q4 2023 compliance audit has been completed. Here are the results:

Overall Compliance Score: 94% (target: 90%)

Areas of Excellence:
- Data protection compliance (98%)
- Financial reporting (96%)
- Employee safety protocols (95%)

Areas Needing Attention:
- Vendor management (87%)
- Document retention (89%)

We have action plans in place to address the areas below 90% compliance.

Morgan Hall
Compliance Officer`,
      attachments: [
        {
          id: 'att23',
          name: 'Q4_Compliance_Audit.pdf',
          size: 4096000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '22',
    from: 'casey.allen@company.com',
    to: ['reviewer@company.com'],
    subject: 'Team Building Event - February 2024',
    date: '2024-01-13T08:30:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: false,
    priority: 'low',
    content: {
      id: '22',
      body: `Hi Everyone,

I'm excited to announce our February team building event! We'll be hosting a company-wide retreat at the Mountain View Resort.

Event Details:
- Date: February 23-25, 2024
- Location: Mountain View Resort, Lake Tahoe
- Activities: Team workshops, outdoor activities, networking
- Cost: Fully covered by the company

This is a great opportunity to strengthen team bonds and celebrate our achievements.

Please RSVP by January 31st.

Casey Allen
Events Coordinator`,
      attachments: []
    }
  },
  {
    id: '23',
    from: 'jamie.young@company.com',
    to: ['reviewer@company.com'],
    subject: 'Software License Renewal - Critical Systems',
    date: '2024-01-13T07:45:00Z',
    isRead: false,
    isFlagged: false,
    hasAttachments: true,
    priority: 'normal',
    content: {
      id: '23',
      body: `Hello Review Team,

Our critical software licenses are up for renewal on March 1st. Here's the breakdown:

Licenses to Renew:
- Database management system: $25,000/year
- Security software suite: $18,000/year
- Development tools: $12,000/year
- Total: $55,000/year

These are essential for our operations. Please approve the renewal by February 15th to ensure continuity.

Jamie Young
IT Procurement Specialist`,
      attachments: [
        {
          id: 'att24',
          name: 'License_Renewal_Proposal.pdf',
          size: 1536000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '24',
    from: 'riley.king@company.com',
    to: ['reviewer@company.com'],
    subject: 'Research & Development Update - Q4 2023',
    date: '2024-01-13T06:20:00Z',
    isRead: true,
    isFlagged: false,
    hasAttachments: true,
    priority: 'low',
    content: {
      id: '24',
      body: `Hi Review Team,

Here's our Q4 2023 R&D update:

Completed Projects:
- Machine learning algorithm optimization
- User interface usability study
- Performance benchmarking analysis

Ongoing Projects:
- AI-powered feature recommendations
- Advanced data analytics platform
- Mobile app performance optimization

Budget Utilization: 92% of allocated budget
Timeline Performance: 88% of projects on schedule

We're making good progress on our innovation initiatives.

Riley King
R&D Director`,
      attachments: [
        {
          id: 'att25',
          name: 'Q4_RD_Report.pdf',
          size: 2560000,
          type: 'application/pdf'
        }
      ]
    }
  },
  {
    id: '25',
    from: 'sophia.chen@company.com',
    to: ['reviewer@company.com'],
    cc: ['marketing@company.com'],
    subject: 'Social Media Campaign Results - Holiday Season',
    date: '2024-01-13T05:30:00Z',
    isRead: false,
    isFlagged: false,
    hasAttachments: false,
    priority: 'normal',
    content: {
      id: '25',
      body: `Hello Review Team,

Here are the results from our holiday season social media campaign:

Campaign Performance:
- Reach: 2.4M impressions (target: 2M)
- Engagement rate: 4.8% (target: 4%)
- Click-through rate: 2.1% (target: 1.8%)
- Conversions: 1,247 (target: 1,000)

Top performing content:
1. Holiday gift guide video
2. Customer testimonial posts
3. Behind-the-scenes content

The campaign exceeded all targets and generated significant brand awareness.

Sophia Chen
Social Media Manager`,
      attachments: []
    }
  }
];

// Mock API functions
export const emailService = {
  // Get all emails
  async getEmails(): Promise<Email[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEmails;
  },

  // Hybrid approach: Use API for content, mock data for email structure
  async getHybridEmails(): Promise<Email[]> {
    try {
      console.log('🔄 Loading hybrid emails (API content + mock structure)...');
      
      // Fetch content from API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=25');
      const posts = await response.json();
      console.log('📨 API content received:', posts.length, 'posts');
      
      // Use mock data structure but replace content with API data
      const hybridEmails: Email[] = mockEmails.map((mockEmail, index) => {
        const apiPost = posts[index];
        
        return {
          ...mockEmail, // Keep all mock data (addresses, subjects, metadata)
          content: {
            id: mockEmail.content.id,
            // Use API content for the body
            body: apiPost ? apiPost.body + '\n\n---\n\nThis content was fetched from the JSONPlaceholder API.' : mockEmail.content.body,
            // Keep mock attachments or add API-based ones
            attachments: mockEmail.content.attachments.length > 0 
              ? mockEmail.content.attachments 
              : (apiPost ? [
                  {
                    id: `api_att_${apiPost.id}`,
                    name: `api_document_${apiPost.id}.pdf`,
                    size: Math.floor(Math.random() * 2000000) + 100000,
                    type: 'application/pdf'
                  }
                ] : [])
          }
        };
      });
      
      console.log('✅ Hybrid emails created:', hybridEmails.length, 'emails');
      console.log('📊 Sample hybrid email:', hybridEmails[0]);
      
      return hybridEmails;
    } catch (error) {
      console.error('❌ Error creating hybrid emails:', error);
      console.log('🔄 Falling back to mock data...');
      return mockEmails;
    }
  },

  // Fetch emails from public API (alternative to mock data)
  async getEmailsFromAPI(): Promise<Email[]> {
    try {
      console.log('🌐 Fetching emails from JSONPlaceholder API...');
      
      // Fetch posts from JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=25');
      console.log('📡 API Response status:', response.status);
      
      const posts = await response.json();
      console.log('📨 Raw API data received:', posts);
      console.log('📊 Number of posts received:', posts.length);
      
      // Convert posts to email format
      const emails: Email[] = posts.map((post: { id: number; userId: number; title: string; body: string }, index: number) => ({
        id: post.id.toString(),
        from: `user${post.userId}@company.com`,
        to: ['reviewer@company.com'],
        cc: index % 3 === 0 ? ['manager@company.com'] : undefined,
        subject: post.title,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        isRead: Math.random() > 0.5,
        isFlagged: Math.random() > 0.7,
        hasAttachments: Math.random() > 0.6,
        priority: ['high', 'normal', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'normal' | 'low',
        content: {
          id: post.id.toString(),
          body: post.body + '\n\nThis is additional email content for demonstration purposes.',
          attachments: Math.random() > 0.6 ? [
            {
              id: `att${post.id}`,
              name: `document_${post.id}.pdf`,
              size: Math.floor(Math.random() * 2000000) + 100000,
              type: 'application/pdf'
            }
          ] : []
        }
      }));
      
      console.log('✉️ Converted emails:', emails);
      console.log('✅ Successfully loaded', emails.length, 'emails from API');
      
      return emails;
    } catch (error) {
      console.error('❌ Error fetching emails from API:', error);
      console.log('🔄 Falling back to mock data...');
      // Fallback to mock data if API fails
      return mockEmails;
    }
  },

  // Get single email by ID
  async getEmailById(id: string): Promise<Email | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockEmails.find(email => email.id === id) || null;
  },

  // Mark email as read
  async markAsRead(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const email = mockEmails.find(e => e.id === id);
    if (email) {
      email.isRead = true;
    }
  },

  // Toggle email flag
  async toggleFlag(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const email = mockEmails.find(e => e.id === id);
    if (email) {
      email.isFlagged = !email.isFlagged;
    }
  },

  // Submit review action
  async submitReviewAction(action: EmailReviewAction): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Review action submitted:', action);
    // In a real app, this would send the action to the backend
  },

  // Get emails by priority
  async getEmailsByPriority(priority: 'low' | 'normal' | 'high'): Promise<Email[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEmails.filter(email => email.priority === priority);
  },

  // Search emails
  async searchEmails(query: string): Promise<Email[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const lowercaseQuery = query.toLowerCase();
    return mockEmails.filter(email => 
      email.subject.toLowerCase().includes(lowercaseQuery) ||
      email.from.toLowerCase().includes(lowercaseQuery) ||
      email.content.body.toLowerCase().includes(lowercaseQuery)
    );
  }
}; 