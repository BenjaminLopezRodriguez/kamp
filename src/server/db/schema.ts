// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator, varchar, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kamp_${name}`);

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

// Properties table
export const properties = createTable(
  "property",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    ownerId: d.varchar({ length: 256 }).notNull(),
    address: d.varchar({ length: 512 }).notNull(),
    description: d.text(),
    bedrooms: d.integer(),
    bathrooms: d.integer(),
    rent: d.integer(),
    status: d.varchar({ length: 50 }).default("available"),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("owner_idx").on(t.ownerId)],
);

// Tenants table
export const tenants = createTable(
  "tenant",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: d.varchar({ length: 256 }),
    name: d.varchar({ length: 256 }).notNull(),
    email: d.varchar({ length: 256 }).notNull(),
    phone: d.varchar({ length: 50 }),
    propertyId: d.integer().references(() => properties.id),
    leaseStart: d.timestamp({ withTimezone: true }),
    leaseEnd: d.timestamp({ withTimezone: true }),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("tenant_email_idx").on(t.email), index("property_tenant_idx").on(t.propertyId)],
);

// Room Tours table
export const roomTours = createTable(
  "room_tour",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    propertyId: d.integer().references(() => properties.id).notNull(),
    tenantEmail: d.varchar({ length: 256 }).notNull(),
    tenantName: d.varchar({ length: 256 }).notNull(),
    scheduledDate: d.timestamp({ withTimezone: true }).notNull(),
    status: d.varchar({ length: 50 }).default("scheduled"), // scheduled, completed, cancelled
    type: d.varchar({ length: 50 }).default("in-person"), // in-person, virtual
    notes: d.text(),
    createdBy: d.varchar({ length: 256 }).notNull(),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("tour_property_idx").on(t.propertyId), index("tour_date_idx").on(t.scheduledDate)],
);

// Inspections table
export const inspections = createTable(
  "inspection",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    propertyId: d.integer().references(() => properties.id).notNull(),
    tenantId: d.integer().references(() => tenants.id),
    type: d.varchar({ length: 50 }).notNull(), // move-in, move-out, routine, emergency
    scheduledDate: d.timestamp({ withTimezone: true }).notNull(),
    status: d.varchar({ length: 50 }).default("scheduled"), // scheduled, completed, cancelled
    checklist: d.text(), // JSON string of checklist items
    notes: d.text(),
    findings: d.text(),
    createdBy: d.varchar({ length: 256 }).notNull(),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("inspection_property_idx").on(t.propertyId), index("inspection_date_idx").on(t.scheduledDate)],
);

// Peer Previews table
export const peerPreviews = createTable(
  "peer_preview",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    propertyId: d.integer().references(() => properties.id).notNull(),
    requestedBy: d.varchar({ length: 256 }).notNull(),
    reviewerEmail: d.varchar({ length: 256 }).notNull(),
    reviewerName: d.varchar({ length: 256 }),
    topic: d.varchar({ length: 256 }).notNull(), // What they're asking feedback on
    description: d.text(),
    status: d.varchar({ length: 50 }).default("pending"), // pending, reviewed, expired
    feedback: d.text(),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    reviewedAt: d.timestamp({ withTimezone: true }),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("preview_property_idx").on(t.propertyId), index("preview_reviewer_idx").on(t.reviewerEmail)],
);

// Email Templates table
export const emailTemplates = createTable(
  "email_template",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull(),
    type: d.varchar({ length: 50 }).notNull(), // room_tour, inspection, peer_preview, general
    subject: d.varchar({ length: 512 }).notNull(),
    body: d.text().notNull(),
    variables: d.text(), // JSON string of available variables
    isDefault: d.boolean().default(false),
    createdBy: d.varchar({ length: 256 }),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("template_type_idx").on(t.type)],
);
