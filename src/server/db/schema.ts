// Property Management Platform Schema
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { boolean, decimal, index, integer, pgTableCreator, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kamp_${name}`);

// Users table - extends Kinde auth with role and profile info
export const users = createTable(
  "user",
  (d) => ({
    id: d.varchar({ length: 255 }).primaryKey(), // Kinde user ID
    email: d.varchar({ length: 255 }).notNull(),
    name: d.varchar({ length: 255 }),
    role: d.varchar({ length: 50 }).notNull().default("tenant"), // 'landlord' or 'tenant'
    phone: d.varchar({ length: 20 }),
    avatar: d.text(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("user_email_idx").on(t.email),
    index("user_role_idx").on(t.role),
  ],
);

// Properties table
export const properties = createTable(
  "property",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    landlordId: d.varchar({ length: 255 }).notNull(), // References users.id
    name: d.varchar({ length: 255 }).notNull(),
    address: d.text().notNull(),
    city: d.varchar({ length: 100 }).notNull(),
    state: d.varchar({ length: 50 }).notNull(),
    zipCode: d.varchar({ length: 20 }).notNull(),
    propertyType: d.varchar({ length: 50 }).notNull(), // 'apartment', 'house', 'condo', etc.
    bedrooms: d.integer(),
    bathrooms: d.decimal({ precision: 3, scale: 1 }),
    squareFeet: d.integer(),
    monthlyRent: d.decimal({ precision: 10, scale: 2 }).notNull(),
    description: d.text(),
    images: d.text().array(), // Array of image URLs
    amenities: d.text().array(), // Array of amenity strings
    isAvailable: d.boolean().default(true).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("property_landlord_idx").on(t.landlordId),
    index("property_city_idx").on(t.city),
    index("property_available_idx").on(t.isAvailable),
  ],
);

// Leases table
export const leases = createTable(
  "lease",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    propertyId: d.integer().notNull(), // References properties.id
    tenantId: d.varchar({ length: 255 }).notNull(), // References users.id
    landlordId: d.varchar({ length: 255 }).notNull(), // References users.id
    startDate: d.timestamp({ withTimezone: true }).notNull(),
    endDate: d.timestamp({ withTimezone: true }).notNull(),
    monthlyRent: d.decimal({ precision: 10, scale: 2 }).notNull(),
    securityDeposit: d.decimal({ precision: 10, scale: 2 }),
    status: d.varchar({ length: 50 }).notNull().default("active"), // 'active', 'expired', 'terminated'
    leaseDocumentUrl: d.text(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("lease_property_idx").on(t.propertyId),
    index("lease_tenant_idx").on(t.tenantId),
    index("lease_landlord_idx").on(t.landlordId),
    index("lease_status_idx").on(t.status),
  ],
);

// Maintenance requests table
export const maintenanceRequests = createTable(
  "maintenance_request",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    propertyId: d.integer().notNull(), // References properties.id
    leaseId: d.integer(), // References leases.id (optional)
    tenantId: d.varchar({ length: 255 }).notNull(), // References users.id
    landlordId: d.varchar({ length: 255 }).notNull(), // References users.id
    title: d.varchar({ length: 255 }).notNull(),
    description: d.text().notNull(),
    priority: d.varchar({ length: 50 }).notNull().default("medium"), // 'low', 'medium', 'high', 'urgent'
    status: d.varchar({ length: 50 }).notNull().default("pending"), // 'pending', 'in_progress', 'completed', 'cancelled'
    images: d.text().array(), // Array of image URLs
    completedAt: d.timestamp({ withTimezone: true }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("maintenance_property_idx").on(t.propertyId),
    index("maintenance_tenant_idx").on(t.tenantId),
    index("maintenance_landlord_idx").on(t.landlordId),
    index("maintenance_status_idx").on(t.status),
  ],
);

// Payments table
export const payments = createTable(
  "payment",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    leaseId: d.integer().notNull(), // References leases.id
    tenantId: d.varchar({ length: 255 }).notNull(), // References users.id
    landlordId: d.varchar({ length: 255 }).notNull(), // References users.id
    amount: d.decimal({ precision: 10, scale: 2 }).notNull(),
    type: d.varchar({ length: 50 }).notNull(), // 'rent', 'deposit', 'fee', 'refund'
    dueDate: d.timestamp({ withTimezone: true }).notNull(),
    paidDate: d.timestamp({ withTimezone: true }),
    status: d.varchar({ length: 50 }).notNull().default("pending"), // 'pending', 'paid', 'overdue', 'failed'
    paymentMethod: d.varchar({ length: 50 }), // 'bank_transfer', 'credit_card', 'check', etc.
    transactionId: d.varchar({ length: 255 }),
    receiptUrl: d.text(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("payment_lease_idx").on(t.leaseId),
    index("payment_tenant_idx").on(t.tenantId),
    index("payment_landlord_idx").on(t.landlordId),
    index("payment_status_idx").on(t.status),
    index("payment_due_date_idx").on(t.dueDate),
  ],
);

// Messages table for communication between landlords and tenants
export const messages = createTable(
  "message",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    senderId: d.varchar({ length: 255 }).notNull(), // References users.id
    recipientId: d.varchar({ length: 255 }).notNull(), // References users.id
    propertyId: d.integer(), // References properties.id (optional context)
    subject: d.varchar({ length: 255 }),
    content: d.text().notNull(),
    isRead: d.boolean().default(false).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("message_sender_idx").on(t.senderId),
    index("message_recipient_idx").on(t.recipientId),
    index("message_property_idx").on(t.propertyId),
    index("message_read_idx").on(t.isRead),
  ],
);

// Documents table for storing lease documents, receipts, etc.
export const documents = createTable(
  "document",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    propertyId: d.integer(), // References properties.id (optional)
    leaseId: d.integer(), // References leases.id (optional)
    userId: d.varchar({ length: 255 }).notNull(), // References users.id (owner/uploader)
    name: d.varchar({ length: 255 }).notNull(),
    type: d.varchar({ length: 50 }).notNull(), // 'lease', 'receipt', 'invoice', 'other'
    url: d.text().notNull(),
    mimeType: d.varchar({ length: 100 }),
    size: d.integer(), // Size in bytes
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("document_property_idx").on(t.propertyId),
    index("document_lease_idx").on(t.leaseId),
    index("document_user_idx").on(t.userId),
    index("document_type_idx").on(t.type),
  ],
);

// Tenant applications table
export const applications = createTable(
  "application",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    propertyId: d.integer().notNull(), // References properties.id
    tenantId: d.varchar({ length: 255 }).notNull(), // References users.id
    landlordId: d.varchar({ length: 255 }).notNull(), // References users.id
    status: d.varchar({ length: 50 }).notNull().default("pending"), // 'pending', 'approved', 'rejected', 'withdrawn'
    message: d.text(),
    income: d.decimal({ precision: 10, scale: 2 }),
    employmentStatus: d.varchar({ length: 100 }),
    references: d.text().array(), // Array of reference contact info
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("application_property_idx").on(t.propertyId),
    index("application_tenant_idx").on(t.tenantId),
    index("application_landlord_idx").on(t.landlordId),
    index("application_status_idx").on(t.status),
  ],
);

// Keep posts table for backward compatibility (can be removed later)
export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);
