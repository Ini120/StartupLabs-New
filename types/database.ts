// This file contains TypeScript types for your Supabase database
// Update these based on your actual Supabase schema

export interface User {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Startup {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  expertise: string | null;
  bio: string | null;
  created_at: string;
}

export interface Milestone {
  id: string;
  startup_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  startup_id: string;
  mentor_id: string;
  title: string;
  description: string | null;
  scheduled_at: string;
  duration_minutes: number | null;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

// Type for Supabase database responses
export type Database = {
  public: {
    Tables: {
      users: { Row: User };
      startups: { Row: Startup };
      mentors: { Row: Mentor };
      milestones: { Row: Milestone };
      meetings: { Row: Meeting };
      messages: { Row: Message };
    };
  };
};
