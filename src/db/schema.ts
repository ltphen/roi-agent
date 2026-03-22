import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  businessName: text('business_name'),
  industry: text('industry'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').references(() => sessions.id).notNull(),
  role: text('role', { enum: ['user', 'assistant', 'system'] }).notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const reports = sqliteTable('reports', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').references(() => sessions.id).notNull(),
  reportJson: text('report_json').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
