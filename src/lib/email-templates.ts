export type EmailTemplateType =
  | "room_tour"
  | "guest_keys"
  | "inspections"
  | "maintenance_request"
  | "rent_reminder"
  | "welcome_tenant"
  | "lease_renewal"
  | "move_out_notice";

export interface EmailTemplate {
  id: EmailTemplateType;
  name: string;
  subject: string;
  body: string;
  description: string;
  variables: string[];
}

// Function-based approach to prevent build-time evaluation
function createEmailTemplates(): Record<EmailTemplateType, EmailTemplate> {
  return {
  room_tour: {
    id: "room_tour",
    name: "Room Tour",
    subject: "Scheduled Room Tour - {{property_address}}",
    body: `Dear {{tenant_name}},

We're excited to show you around {{property_address}}!

Your room tour has been scheduled for:
📅 Date: {{tour_date}}
🕐 Time: {{tour_time}}
📍 Location: {{property_address}}

Please arrive 5 minutes early. If you need to reschedule, please contact us at least 24 hours in advance.

What to bring:
- Valid ID
- Questions about the property

We look forward to meeting you!

Best regards,
{{landlord_name}}
{{company_name}}
{{contact_email}}
{{contact_phone}}`,
    description: "Schedule and confirm property viewing appointments",
    variables: [
      "tenant_name",
      "property_address",
      "tour_date",
      "tour_time",
      "landlord_name",
      "company_name",
      "contact_email",
      "contact_phone",
    ],
  },
  guest_keys: {
    id: "guest_keys",
    name: "Guest Keys",
    subject: "Guest Key Access Information - {{property_address}}",
    body: `Dear {{tenant_name}},

Your guest keys for {{property_address}} are ready for pickup.

Key Details:
🔑 Key Type: {{key_type}}
📍 Pickup Location: {{pickup_location}}
🕐 Available Hours: {{pickup_hours}}
📞 Contact: {{contact_phone}}

Important Notes:
- Keys must be returned within {{return_period}}
- A security deposit of ${{deposit_amount}} is required
- Lost keys will incur a replacement fee of ${{replacement_fee}}

Please bring a valid ID when picking up your keys.

Best regards,
{{landlord_name}}
{{company_name}}`,
    description: "Provide guest key pickup and return instructions",
    variables: [
      "tenant_name",
      "property_address",
      "key_type",
      "pickup_location",
      "pickup_hours",
      "contact_phone",
      "return_period",
      "deposit_amount",
      "replacement_fee",
      "landlord_name",
      "company_name",
    ],
  },
  inspections: {
    id: "inspections",
    name: "Property Inspection",
    subject: "Upcoming Property Inspection - {{property_address}}",
    body: `Dear {{tenant_name}},

This is a notice that we will be conducting a property inspection at {{property_address}}.

Inspection Details:
📅 Date: {{inspection_date}}
🕐 Time: {{inspection_time}}
👤 Inspector: {{inspector_name}}
📋 Type: {{inspection_type}}

What to Expect:
- We will inspect the property condition
- Check for any maintenance needs
- Verify compliance with lease terms
- Take photos for documentation

Your presence is not required, but you're welcome to be present. If you have any concerns or questions, please contact us before the inspection date.

Thank you for your cooperation.

Best regards,
{{landlord_name}}
{{company_name}}
{{contact_email}}
{{contact_phone}}`,
    description: "Notify tenants about scheduled property inspections",
    variables: [
      "tenant_name",
      "property_address",
      "inspection_date",
      "inspection_time",
      "inspector_name",
      "inspection_type",
      "landlord_name",
      "company_name",
      "contact_email",
      "contact_phone",
    ],
  },
  maintenance_request: {
    id: "maintenance_request",
    name: "Maintenance Request",
    subject: "Maintenance Request Confirmation - {{request_id}}",
    body: `Dear {{tenant_name}},

We have received your maintenance request for {{property_address}}.

Request Details:
🆔 Request ID: {{request_id}}
📋 Issue: {{issue_description}}
📅 Reported: {{report_date}}
⚡ Priority: {{priority_level}}

Scheduled Service:
📅 Date: {{scheduled_date}}
🕐 Time: {{scheduled_time}}
👷 Technician: {{technician_name}}

Estimated Cost: ${{estimated_cost}}

We will keep you updated on the progress. If you have any questions, please contact us using request ID {{request_id}}.

Thank you for reporting this issue promptly.

Best regards,
{{landlord_name}}
{{company_name}}
{{contact_email}}
{{contact_phone}}`,
    description: "Confirm and track maintenance requests",
    variables: [
      "tenant_name",
      "property_address",
      "request_id",
      "issue_description",
      "report_date",
      "priority_level",
      "scheduled_date",
      "scheduled_time",
      "technician_name",
      "estimated_cost",
      "landlord_name",
      "company_name",
      "contact_email",
      "contact_phone",
    ],
  },
  rent_reminder: {
    id: "rent_reminder",
    name: "Rent Reminder",
    subject: "Rent Payment Reminder - {{property_address}}",
    body: `Dear {{tenant_name}},

This is a friendly reminder that your rent payment is due soon.

Payment Details:
💰 Amount Due: ${{rent_amount}}
📅 Due Date: {{due_date}}
📍 Property: {{property_address}}
🏦 Account: {{account_number}}

Payment Methods:
1. Online Portal: {{payment_portal_url}}
2. Bank Transfer: {{bank_details}}
3. Check: Mail to {{mailing_address}}

Late fees of ${{late_fee}} will apply if payment is received after {{late_date}}.

If you've already made the payment, please disregard this notice.

Thank you for your timely payment.

Best regards,
{{landlord_name}}
{{company_name}}
{{contact_email}}`,
    description: "Send rent payment reminders to tenants",
    variables: [
      "tenant_name",
      "property_address",
      "rent_amount",
      "due_date",
      "account_number",
      "payment_portal_url",
      "bank_details",
      "mailing_address",
      "late_fee",
      "late_date",
      "landlord_name",
      "company_name",
      "contact_email",
    ],
  },
  welcome_tenant: {
    id: "welcome_tenant",
    name: "Welcome Tenant",
    subject: "Welcome to {{property_address}}!",
    body: `Dear {{tenant_name}},

Welcome to your new home at {{property_address}}!

We're thrilled to have you as our tenant. This email contains important information to help you get settled.

Property Information:
📍 Address: {{property_address}}
🔑 Move-in Date: {{move_in_date}}
📋 Lease Term: {{lease_term}}
💰 Monthly Rent: ${{rent_amount}}

Important Contacts:
🏢 Management: {{company_name}}
📧 Email: {{contact_email}}
📞 Phone: {{contact_phone}}
🆘 Emergency: {{emergency_phone}}

Getting Started:
1. Review your lease agreement
2. Set up utilities (if applicable)
3. Complete move-in inspection form
4. Familiarize yourself with building rules

Resources:
- Tenant Portal: {{portal_url}}
- Maintenance Requests: {{maintenance_url}}
- Payment Portal: {{payment_url}}

If you have any questions or need assistance, don't hesitate to reach out.

Welcome home!

Best regards,
{{landlord_name}}
{{company_name}}`,
    description: "Welcome new tenants with essential information",
    variables: [
      "tenant_name",
      "property_address",
      "move_in_date",
      "lease_term",
      "rent_amount",
      "company_name",
      "contact_email",
      "contact_phone",
      "emergency_phone",
      "portal_url",
      "maintenance_url",
      "payment_url",
      "landlord_name",
    ],
  },
  lease_renewal: {
    id: "lease_renewal",
    name: "Lease Renewal",
    subject: "Lease Renewal Notice - {{property_address}}",
    body: `Dear {{tenant_name}},

Your lease for {{property_address}} is set to expire on {{lease_end_date}}.

We value you as a tenant and would like to offer you the opportunity to renew your lease.

Renewal Options:
📅 Current Lease End: {{lease_end_date}}
🔄 Renewal Term Options:
   - 12 months: ${{rent_12mo}}/month
   - 6 months: ${{rent_6mo}}/month
   - Month-to-month: ${{rent_mtm}}/month

Please let us know by {{response_deadline}} if you'd like to renew. We'll send you the renewal documents for review and signature.

If you choose not to renew, please provide 30 days written notice as per your lease agreement.

We look forward to continuing our relationship with you.

Best regards,
{{landlord_name}}
{{company_name}}
{{contact_email}}
{{contact_phone}}`,
    description: "Offer lease renewal options to tenants",
    variables: [
      "tenant_name",
      "property_address",
      "lease_end_date",
      "rent_12mo",
      "rent_6mo",
      "rent_mtm",
      "response_deadline",
      "landlord_name",
      "company_name",
      "contact_email",
      "contact_phone",
    ],
  },
  move_out_notice: {
    id: "move_out_notice",
    name: "Move Out Notice",
    subject: "Move-Out Instructions - {{property_address}}",
    body: `Dear {{tenant_name}},

We've received your notice to vacate {{property_address}}.

Move-Out Details:
📅 Move-Out Date: {{move_out_date}}
📍 Property: {{property_address}}
🔑 Key Return: {{key_return_location}}

Move-Out Checklist:
✅ Remove all personal belongings
✅ Clean the property thoroughly
✅ Repair any damages
✅ Return all keys and access cards
✅ Forward your mail
✅ Cancel utilities in your name
✅ Complete move-out inspection

Final Inspection:
📅 Scheduled: {{inspection_date}}
🕐 Time: {{inspection_time}}

Security Deposit:
Your security deposit of ${{deposit_amount}} will be returned within {{deposit_return_days}} days after move-out, minus any deductions for damages or unpaid rent.

Please ensure the property is in the same condition as when you moved in (normal wear and tear excepted).

If you have any questions, please contact us.

Thank you for being a valued tenant.

Best regards,
{{landlord_name}}
{{company_name}}
{{contact_email}}
{{contact_phone}}`,
    description: "Provide move-out instructions and checklist",
    variables: [
      "tenant_name",
      "property_address",
      "move_out_date",
      "key_return_location",
      "inspection_date",
      "inspection_time",
      "deposit_amount",
      "deposit_return_days",
      "landlord_name",
      "company_name",
      "contact_email",
      "contact_phone",
    ],
  },
  };
}

// Lazy getter - only creates templates when first accessed
let _cachedTemplates: Record<EmailTemplateType, EmailTemplate> | null = null;

function getTemplates(): Record<EmailTemplateType, EmailTemplate> {
  if (!_cachedTemplates) {
    _cachedTemplates = createEmailTemplates();
  }
  return _cachedTemplates;
}

// Export getter function
export function getEmailTemplates(): Record<EmailTemplateType, EmailTemplate> {
  return getTemplates();
}

// Export object that uses getter - safe for build time
export const emailTemplates = {
  get room_tour() { return getTemplates().room_tour; },
  get guest_keys() { return getTemplates().guest_keys; },
  get inspections() { return getTemplates().inspections; },
  get maintenance_request() { return getTemplates().maintenance_request; },
  get rent_reminder() { return getTemplates().rent_reminder; },
  get welcome_tenant() { return getTemplates().welcome_tenant; },
  get lease_renewal() { return getTemplates().lease_renewal; },
  get move_out_notice() { return getTemplates().move_out_notice; },
} as Record<EmailTemplateType, EmailTemplate>;

export function getTemplate(type: EmailTemplateType): EmailTemplate {
  return getTemplates()[type];
}

export function getAllTemplates(): EmailTemplate[] {
  return Object.values(getTemplates());
}

export function replaceVariables(
  template: EmailTemplate,
  variables: Record<string, string>
): { subject: string; body: string } {
  let subject = template.subject;
  let body = template.body;

  // Replace all variables in subject and body
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    subject = subject.replace(regex, value);
    body = body.replace(regex, value);
  });

  return { subject, body };
}
