import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: "We're working hard to bring this feature to you. Stay tuned!",
};

export default function CatchAllComingSoonPage() {
  return <ComingSoonPage />;
}
