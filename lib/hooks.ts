'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Startup, Mentor, Milestone, Meeting } from '@/types/database';

// Cache data with timestamps
const dataCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedData(key: string) {
  const cached = dataCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  dataCache.delete(key);
  return null;
}

function setCachedData(key: string, data: any) {
  dataCache.set(key, { data, timestamp: Date.now() });
}

// Hook to fetch users
export function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const fetchUsers = async () => {
      try {
        // Check cache first
        const cached = getCachedData('users');
        if (cached) {
          if (isMounted.current) {
            setUsers(cached);
            setLoading(false);
          }
          return;
        }

        const { data, error } = await supabase
          .from('users')
          .select('*');

        if (error) throw error;
        
        if (isMounted.current) {
          setCachedData('users', data);
          setUsers(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted.current) {
          setError(err.message);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { users, loading, error };
}

// Hook to fetch startups
export function useStartups() {
  const [startups, setStartups] = useState<Startup[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const fetchStartups = async () => {
      try {
        // Check cache first
        const cached = getCachedData('startups');
        if (cached) {
          if (isMounted.current) {
            setStartups(cached);
            setLoading(false);
          }
          return;
        }

        const { data, error } = await supabase
          .from('startups')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (isMounted.current) {
          setCachedData('startups', data);
          setStartups(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted.current) {
          setError(err.message);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchStartups();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { startups, loading, error };
}

// Hook to fetch mentors
export function useMentors() {
  const [mentors, setMentors] = useState<Mentor[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const fetchMentors = async () => {
      try {
        // Check cache first
        const cached = getCachedData('mentors');
        if (cached) {
          if (isMounted.current) {
            setMentors(cached);
            setLoading(false);
          }
          return;
        }

        const { data, error } = await supabase
          .from('mentors')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        
        if (isMounted.current) {
          setCachedData('mentors', data);
          setMentors(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted.current) {
          setError(err.message);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchMentors();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { mentors, loading, error };
}

// Hook to subscribe to real-time updates
export function useRealtimeSubscription(table: string, callback: (payload: any) => void) {
  useEffect(() => {
    const channel = supabase
      .channel(`public:${table}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
        },
        (payload) => {
          // Clear cache on updates
          dataCache.delete(table.toLowerCase() + 's');
          callback(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, callback]);
}
