# Kamp Property Management - Feature Documentation

## 🎨 Modern Design System

The app has been redesigned with a modern, fun aesthetic inspired by Linktree, Partiful, and Shopify.

### Design Features:
- **Vibrant Color Palette**: Purple, pink, and blue gradients throughout
- **Smooth Animations**: Framer Motion animations for delightful interactions
- **Mobile-First**: Responsive design with bottom tab navigation on mobile
- **Modern UI Components**: Rounded corners, shadows, and hover effects
- **Glass Morphism**: Backdrop blur effects for modern feel

---

## 📱 Mobile Navigation

### Bottom Tab Navigation (Mobile Only)
- **Home**: Main landing page
- **Properties**: Dashboard and property management
- **Messages**: Communications tab
- **Profile**: User profile settings

The mobile navigation appears at the bottom of the screen on mobile devices and is hidden on desktop.

---

## 🏠 Core Features

### 1. Room Tours 📸

Schedule and manage property tours with automated email notifications.

**Features:**
- Schedule in-person or virtual tours
- Automatic email invitations to prospective tenants
- Tour reminders
- Status tracking (scheduled, completed, cancelled)
- Calendar integration

**Database Schema:**
```typescript
{
  id: number
  propertyId: number
  tenantEmail: string
  tenantName: string
  scheduledDate: Date
  status: 'scheduled' | 'completed' | 'cancelled'
  type: 'in-person' | 'virtual'
  notes: string
  createdBy: string
}
```

**API Endpoints:**
- `roomTours.create()` - Schedule a new tour
- `roomTours.getAll()` - Get all tours
- `roomTours.getById()` - Get specific tour
- `roomTours.updateStatus()` - Update tour status
- `roomTours.delete()` - Cancel/delete tour

---

### 2. Inspections 🔍

Manage property inspections with digital checklists and reports.

**Features:**
- Multiple inspection types (move-in, move-out, routine, emergency)
- Digital checklists
- Automatic tenant notifications
- Inspection reports
- Finding documentation
- Status tracking

**Database Schema:**
```typescript
{
  id: number
  propertyId: number
  tenantId: number | null
  type: 'move-in' | 'move-out' | 'routine' | 'emergency'
  scheduledDate: Date
  status: 'scheduled' | 'completed' | 'cancelled'
  checklist: string (JSON)
  notes: string
  findings: string
  createdBy: string
}
```

**API Endpoints:**
- `inspections.create()` - Schedule inspection
- `inspections.getAll()` - Get all inspections
- `inspections.getById()` - Get specific inspection
- `inspections.update()` - Update inspection status/findings
- `inspections.delete()` - Delete inspection

---

### 3. Peer Preview 👀

Get feedback from other landlords before making decisions.

**Features:**
- Request peer reviews on specific topics
- Share property details securely
- Anonymous or named feedback options
- Threaded discussions
- Response notifications

**Database Schema:**
```typescript
{
  id: number
  propertyId: number
  requestedBy: string
  reviewerEmail: string
  reviewerName: string | null
  topic: string
  description: string
  status: 'pending' | 'reviewed' | 'expired'
  feedback: string
  createdAt: Date
  reviewedAt: Date | null
}
```

**API Endpoints:**
- `peerPreviews.create()` - Request peer review
- `peerPreviews.getAll()` - Get all previews
- `peerPreviews.getById()` - Get specific preview
- `peerPreviews.submitFeedback()` - Submit review
- `peerPreviews.delete()` - Delete preview request

---

### 4. Email Template System 📧

Pre-built, customizable email templates for all tenant interactions.

**Template Types:**
1. **Room Tour Templates**
   - Tour confirmation
   - Tour reminders
   - Tour rescheduling
   - Virtual tour links

2. **Inspection Templates**
   - Inspection notifications
   - Inspection reports
   - Follow-up actions
   - Completion confirmations

3. **Peer Preview Templates**
   - Review requests
   - Review responses
   - Thank you messages

4. **General Templates**
   - Welcome messages
   - Rent reminders
   - Maintenance updates
   - Lease renewals

**Template Variables:**
Templates support dynamic variables that get replaced when sending:
- `{{tenant_name}}`
- `{{property_address}}`
- `{{date}}`, `{{time}}`
- `{{landlord_name}}`
- And many more...

**Database Schema:**
```typescript
{
  id: number
  name: string
  type: 'room_tour' | 'inspection' | 'peer_preview' | 'general'
  subject: string
  body: string
  variables: string (JSON)
  isDefault: boolean
  createdBy: string
}
```

**API Endpoints:**
- `emailTemplates.create()` - Create new template
- `emailTemplates.getAll()` - Get all templates
- `emailTemplates.getById()` - Get specific template
- `emailTemplates.getDefault()` - Get default template by type
- `emailTemplates.sendEmail()` - Send email using template
- `emailTemplates.delete()` - Delete template

---

## 🎯 Dashboard Features

The dashboard provides a comprehensive overview of all activities:

### Overview Tab
- Quick stats for all features
- Upcoming tours
- Recent inspections
- Pending peer previews
- Activity timeline

### Room Tours Tab
- List of all scheduled tours
- Filter by status, type, date
- Quick actions (edit, cancel, complete)
- "New Tour" dialog with form

### Inspections Tab
- List of all inspections
- Filter by type, status, property
- Quick actions (view, complete, report)
- "New Inspection" dialog with form

### Peer Previews Tab
- List of preview requests
- Sent and received reviews
- Filter by status
- Quick feedback submission
- "Request Review" dialog

---

## 🚀 Getting Started

### Database Setup

1. Push the schema to your database:
```bash
npm run db:push
```

2. Seed default email templates:
```bash
npm run db:seed
```

### Email Configuration

To enable email sending, configure your email provider in the `emailTemplates.sendEmail()` mutation:

```typescript
// Integrate with your email service
// Examples: SendGrid, AWS SES, Mailgun, Resend
```

---

## 🎨 Customization

### Colors
Update the color scheme in `/src/styles/globals.css`:
- Primary: Purple (`oklch(0.65 0.25 264)`)
- Secondary: Green (`oklch(0.75 0.18 146)`)
- Accent: Pink (`oklch(0.85 0.15 330)`)

### Templates
Customize email templates in:
- `/src/server/db/seed-templates.ts` for defaults
- Dashboard UI for per-user customization

### Mobile Navigation
Edit items in `/src/components/custom/MobileNav.tsx`

---

## 📱 Mobile Optimizations

- Bottom tab navigation for easy thumb access
- Touch-optimized buttons (min 44x44px)
- Responsive card layouts
- Swipeable sheets and dialogs
- Optimized form inputs for mobile keyboards

---

## 🔐 Security Considerations

- All mutations require user authentication
- Tenant emails are validated
- File uploads (for inspections) should be virus-scanned
- Rate limiting on email sends recommended
- Peer preview requests should be validated

---

## 🎉 Future Enhancements

Potential additions:
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] SMS notifications
- [ ] Photo upload for inspections
- [ ] Video tour recording
- [ ] Automated rent collection
- [ ] Maintenance request system
- [ ] Tenant portal
- [ ] Document signing (e-signatures)
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

---

## 📞 Support

For questions or feature requests, use the floating help button on any page or contact support at support@kamp.property
