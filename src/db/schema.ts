import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  businessName: text('business_name'),
  industry: text('industry'),
  companySize: text('company_size'),
  annualRevenue: text('annual_revenue'),
  primaryGoal: text('primary_goal'),
  topChallenges: text('top_challenges'), // JSON array as string
  techStack: text('tech_stack'),
  aiExperience: text('ai_experience'), // 'yes' | 'no'
  aiTools: text('ai_tools'), // existing AI tools if any
  biggestTask: text('biggest_task'), // biggest manual/repetitive task
  status: text('status').default('intake'), // 'intake' | 'chatting' | 'report_ready' | 'report_generated'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').references(() => sessions.id).notNull(),
  role: text('role', { enum: ['user', 'assistant'] }).notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const reports = sqliteTable('reports', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').references(() => sessions.id).notNull(),
  reportJson: text('report_json').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
