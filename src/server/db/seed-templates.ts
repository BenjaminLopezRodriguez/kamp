/**
 * Default Email Templates for Kamp Property Management
 * These templates can be customized by users or used as-is
 */

export const defaultEmailTemplates = [
  {
    name: "Room Tour Confirmation",
    type: "room_tour" as const,
    subject: "Your Room Tour is Scheduled - {{property_address}}",
    body: `Hi {{tenant_name}},

Great news! Your room tour has been confirmed.

📍 Property: {{property_address}}
📅 Date & Time: {{tour_date}}
🎯 Type: {{tour_type}}

{{#if tour_type === 'Virtual'}}
We'll send you a video call link 15 minutes before the tour.
{{else}}
Please arrive on time at the property address above.
{{/if}}

What to bring:
- Valid ID
- Questions about the property
- Comfortable shoes for walking

If you need to reschedule or have any questions, please reply to this email.

Looking forward to showing you around!

Best regards,
{{landlord_name}}
Kamp Property Management`,
    variables: JSON.stringify([
      "tenant_name",
      "property_address",
      "tour_date",
      "tour_type",
      "landlord_name"
    ]),
    isDefault: true,
  },
  {
    name: "Room Tour Reminder",
    type: "room_tour" as const,
    subject: "Reminder: Room Tour Tomorrow - {{property_address}}",
    body: `Hi {{tenant_name}},

This is a friendly reminder about your room tour tomorrow!

📍 Property: {{property_address}}
📅 Time: {{tour_time}}
🎯 Type: {{tour_type}}

{{#if tour_type === 'Virtual'}}
You'll receive a video call link 15 minutes before the scheduled time.
{{else}}
The address is: {{property_address}}
{{/if}}

See you soon!

Best,
{{landlord_name}}`,
    variables: JSON.stringify([
      "tenant_name",
      "property_address",
      "tour_time",
      "tour_type",
      "landlord_name"
    ]),
    isDefault: false,
  },
  {
    name: "Inspection Notification",
    type: "inspection" as const,
    subject: "{{inspection_type}} Inspection Scheduled - {{property_address}}",
    body: `Dear {{tenant_name}},

This email is to notify you that a {{inspection_type}} inspection has been scheduled for your unit.

🏠 Property: {{property_address}}
📅 Date: {{inspection_date}}
⏰ Time: {{inspection_time}}
📋 Type: {{inspection_type}}

Purpose:
{{inspection_purpose}}

What to expect:
- The inspection will take approximately {{estimated_duration}}
- Please ensure access to all areas of the property
- You're welcome to be present during the inspection
- We'll provide a detailed report within 48 hours

Preparation checklist:
✓ Clear access to all rooms
✓ Ensure smoke detectors are accessible
✓ Remove any obstacles that might hinder inspection

If you have any questions or need to reschedule, please contact us as soon as possible.

Thank you for your cooperation!

Best regards,
{{landlord_name}}
Kamp Property Management`,
    variables: JSON.stringify([
      "tenant_name",
      "property_address",
      "inspection_date",
      "inspection_time",
      "inspection_type",
      "inspection_purpose",
      "estimated_duration",
      "landlord_name"
    ]),
    isDefault: true,
  },
  {
    name: "Inspection Complete",
    type: "inspection" as const,
    subject: "Inspection Report - {{property_address}}",
    body: `Dear {{tenant_name}},

Thank you for accommodating our {{inspection_type}} inspection on {{inspection_date}}.

Overall Status: {{overall_status}}

{{#if issues_found}}
Items Requiring Attention:
{{issues_list}}

Timeline for Resolution:
{{resolution_timeline}}
{{else}}
Great news! No issues were found during the inspection. The property is in excellent condition.
{{/if}}

A detailed report has been attached to this email for your records.

If you have any questions about the inspection findings, please don't hesitate to reach out.

Best regards,
{{landlord_name}}
Kamp Property Management`,
    variables: JSON.stringify([
      "tenant_name",
      "property_address",
      "inspection_date",
      "inspection_type",
      "overall_status",
      "issues_found",
      "issues_list",
      "resolution_timeline",
      "landlord_name"
    ]),
    isDefault: false,
  },
  {
    name: "Peer Preview Request",
    type: "peer_preview" as const,
    subject: "Peer Review Request: {{topic}}",
    body: `Hi {{reviewer_name}},

I hope this email finds you well! I'm reaching out to request your expert feedback on a property management matter.

🏠 Property: {{property_address}}
📝 Topic: {{topic}}

Background:
{{description}}

I value your experience and would greatly appreciate your insights on this situation. Your feedback will help me make a more informed decision.

Specific questions:
{{questions}}

Please feel free to share your honest thoughts and any relevant experiences you've had with similar situations.

You can reply directly to this email or use our peer preview portal: {{preview_link}}

Thank you for taking the time to help a fellow landlord!

Best regards,
{{requester_name}}

---
Sent via Kamp Property Management - Peer Preview System`,
    variables: JSON.stringify([
      "reviewer_name",
      "property_address",
      "topic",
      "description",
      "questions",
      "preview_link",
      "requester_name"
    ]),
    isDefault: true,
  },
  {
    name: "Peer Preview Response",
    type: "peer_preview" as const,
    subject: "Re: Peer Review Request - {{topic}}",
    body: `Hi {{requester_name}},

Thank you for requesting my feedback. I've reviewed the situation and here are my thoughts:

{{feedback}}

Additional Recommendations:
{{recommendations}}

I hope this helps! Feel free to reach out if you have any follow-up questions.

Best of luck!

{{reviewer_name}}

---
Sent via Kamp Property Management - Peer Preview System`,
    variables: JSON.stringify([
      "requester_name",
      "topic",
      "feedback",
      "recommendations",
      "reviewer_name"
    ]),
    isDefault: false,
  },
  {
    name: "Welcome New Tenant",
    type: "general" as const,
    subject: "Welcome to {{property_address}}! 🎉",
    body: `Dear {{tenant_name}},

Welcome to your new home at {{property_address}}! We're thrilled to have you as our tenant.

🔑 Move-In Details:
- Move-in Date: {{move_in_date}}
- Lease Start: {{lease_start}}
- Lease End: {{lease_end}}

Important Information:
📱 Emergency Contact: {{emergency_contact}}
💰 Rent Due: {{rent_due_date}} each month
🏦 Payment Method: {{payment_method}}

What's Next:
1. Complete your move-in inspection
2. Set up utilities in your name
3. Review house rules and regulations
4. Save our contact information

Need Help?
We're here to make your stay comfortable. If you have any questions or concerns, don't hesitate to reach out.

Looking forward to a great tenancy!

Best regards,
{{landlord_name}}
Kamp Property Management`,
    variables: JSON.stringify([
      "tenant_name",
      "property_address",
      "move_in_date",
      "lease_start",
      "lease_end",
      "emergency_contact",
      "rent_due_date",
      "payment_method",
      "landlord_name"
    ]),
    isDefault: true,
  },
  {
    name: "Rent Reminder",
    type: "general" as const,
    subject: "Rent Payment Reminder - {{property_address}}",
    body: `Hi {{tenant_name}},

This is a friendly reminder that your rent payment is due soon.

💰 Amount Due: {{rent_amount}}
📅 Due Date: {{due_date}}
🏠 Property: {{property_address}}

Payment Methods:
{{payment_methods}}

If you've already sent your payment, please disregard this message.

If you're experiencing any difficulties with payment, please contact us as soon as possible so we can discuss options.

Thank you for your prompt attention to this matter!

Best regards,
{{landlord_name}}
Kamp Property Management`,
    variables: JSON.stringify([
      "tenant_name",
      "property_address",
      "rent_amount",
      "due_date",
      "payment_methods",
      "landlord_name"
    ]),
    isDefault: false,
  },
];
