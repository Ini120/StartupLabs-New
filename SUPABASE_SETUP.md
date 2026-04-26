# Supabase Backend Setup

This project is set up with Supabase as the backend database service. Follow these steps to get started:

## 1. Initial Setup

### Create a Supabase Project
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Enter your project details and create it
4. Wait for the project to initialize

### Get Your Credentials
1. Go to Project Settings → API
2. Copy the **Project URL** and paste it into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the **anon (public) key** and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy the **Service Role Key** and paste it as `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

Your `.env.local` should look like:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAi...
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAi...
```

## 2. Create Database Tables

In Supabase Dashboard → SQL Editor, create these tables:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Startups Table
```sql
CREATE TABLE startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Mentors Table
```sql
CREATE TABLE mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  expertise VARCHAR,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Milestones Table
```sql
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Meetings Table
```sql
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP,
  duration_minutes INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Project Structure

```
lib/
├── supabase.ts       # Supabase client initialization
└── hooks.ts          # React hooks for data fetching

types/
└── database.ts       # TypeScript types for your database

app/api/
├── health/           # Health check endpoint
├── users/            # Users API routes
└── startups/         # Startups API routes
```

## 4. Using Supabase in Your Project

### Client-Side (React Components)
```typescript
'use client';
import { useUsers, useMentors, useRealtimeSubscription } from '@/lib/hooks';

export function MyComponent() {
  const { users, loading, error } = useUsers();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Server-Side (API Routes)
```typescript
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*');
  
  return Response.json({ users: data });
}
```

### Real-Time Subscriptions
```typescript
'use client';
import { useRealtimeSubscription } from '@/lib/hooks';

export function LiveUpdates() {
  useRealtimeSubscription('users', (payload) => {
    console.log('Users updated:', payload);
  });
  
  return <div>Listen for live updates...</div>;
}
```

## 5. Authentication

Supabase provides built-in authentication. To set it up:

1. Go to Supabase Dashboard → Authentication
2. Configure providers (Google, GitHub, etc.)
3. Set up email templates for password reset, etc.

You can use the Supabase auth client:
```typescript
import { supabase } from '@/lib/supabase';

// Sign up
await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Get current user
const { data } = await supabase.auth.getUser();
```

## 6. Testing Your Setup

Run the health check endpoint:
```bash
curl http://localhost:3000/api/health
```

Fetch users:
```bash
curl http://localhost:3000/api/users
```

## 7. Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase Real-Time](https://supabase.com/docs/guides/realtime)

## 8. Next Steps

1. Update `types/database.ts` with your actual schema
2. Update the example API routes as needed
3. Create more API routes for other resources
4. Implement authentication if needed
5. Set up Row Level Security (RLS) for data protection
