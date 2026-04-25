'use client';

import { useMemo, useState } from 'react';
import { Bookmark, BookmarkCheck, ExternalLink, Search, Star, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

type ResourceType = 'Article' | 'Template' | 'Video';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ResourceType;
  author: string;
  duration: string;
  tags: string[];
  featured?: boolean;
}

const CATEGORIES = ['All', 'Fundraising', 'Product', 'Growth', 'Operations', 'Legal', 'Hiring'];

const RESOURCE_DATA: Resource[] = [
  {
    id: 'r1',
    title: 'Seed Fundraising Playbook',
    description: 'A practical guide for preparing your deck, narrative, and outreach process for seed round fundraising.',
    category: 'Fundraising',
    type: 'Article',
    author: 'StartupLabs Team',
    duration: '12 min read',
    tags: ['Deck', 'Narrative', 'Outreach'],
    featured: true,
  },
  {
    id: 'r2',
    title: 'Monthly Investor Update Template',
    description: 'Copy-ready template to communicate traction, asks, and priorities to your investor network.',
    category: 'Fundraising',
    type: 'Template',
    author: 'Nina Gupta',
    duration: 'Template',
    tags: ['Investor Updates', 'Communication', 'Metrics'],
    featured: true,
  },
  {
    id: 'r3',
    title: 'From MVP to Product-Market Fit',
    description: 'Framework for validating demand and identifying leading indicators before scaling your product.',
    category: 'Product',
    type: 'Video',
    author: 'Sarah Wilson',
    duration: '18 min video',
    tags: ['MVP', 'PMF', 'Validation'],
  },
  {
    id: 'r4',
    title: 'First 100 Customers Handbook',
    description: 'Channel experiments and scripts for securing your first paying customers in B2B and B2C.',
    category: 'Growth',
    type: 'Article',
    author: 'David Thompson',
    duration: '10 min read',
    tags: ['Acquisition', 'Channels', 'Early Traction'],
  },
  {
    id: 'r5',
    title: 'Lean Weekly Planning Board',
    description: 'A practical operating template to run team rituals and align weekly startup priorities.',
    category: 'Operations',
    type: 'Template',
    author: 'Robert Chang',
    duration: 'Template',
    tags: ['Planning', 'Execution', 'Ops'],
  },
  {
    id: 'r6',
    title: 'Startup Hiring Scorecard System',
    description: 'Build consistent hiring quality with role scorecards and interview loops for early teams.',
    category: 'Hiring',
    type: 'Article',
    author: 'Jennifer Lee',
    duration: '9 min read',
    tags: ['Hiring', 'Interviews', 'People'],
  },
  {
    id: 'r7',
    title: 'SAFE and Term Sheet Basics',
    description: 'Understand core legal and financing clauses before negotiating your next financing document.',
    category: 'Legal',
    type: 'Video',
    author: 'Priya Patel',
    duration: '15 min video',
    tags: ['SAFE', 'Term Sheet', 'Legal'],
  },
  {
    id: 'r8',
    title: 'Roadmap Prioritization Matrix',
    description: 'Use impact-versus-effort scoring to prioritize product initiatives and reduce roadmap noise.',
    category: 'Product',
    type: 'Template',
    author: 'Sarah Wilson',
    duration: 'Template',
    tags: ['Roadmap', 'Prioritization', 'Product'],
    featured: true,
  },
  {
    id: 'r9',
    title: 'Retention Review Checklist',
    description: 'A quick checklist to run monthly retention analysis and identify churn reduction opportunities.',
    category: 'Growth',
    type: 'Article',
    author: 'David Thompson',
    duration: '7 min read',
    tags: ['Retention', 'Churn', 'Analytics'],
  },
];

const typeStyles: Record<ResourceType, string> = {
  Article: 'bg-blue-100 text-blue-700',
  Template: 'bg-purple-100 text-purple-700',
  Video: 'bg-amber-100 text-amber-700',
};

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['r2', 'r8']));
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const featuredResources = useMemo(
    () => RESOURCE_DATA.filter((resource) => resource.featured).slice(0, 3),
    [],
  );

  const filteredResources = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return RESOURCE_DATA.filter((resource) => {
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      const matchesQuery =
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const toggleBookmark = (resourceId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(resourceId)) {
        next.delete(resourceId);
      } else {
        next.add(resourceId);
      }
      return next;
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 bg-white border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Resources</h1>
            <p className="text-sm text-gray-600">Discover articles, templates, and videos to accelerate your startup execution.</p>
          </div>

          <div className="p-4">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1">Featured Picks</p>
                  <h2 className="text-base font-bold text-gray-900">Curated this week for fundraising and product teams</h2>
                </div>
                <div className="flex items-center gap-2 text-amber-500 text-sm font-medium">
                  <Star size={14} />
                  Editor Recommended
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                {featuredResources.map((resource) => (
                  <button
                    key={resource.id}
                    onClick={() => setSelectedResource(resource)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                  >
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeStyles[resource.type]}`}>
                      {resource.type}
                    </span>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{resource.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{resource.duration}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <aside className="xl:col-span-3 bg-white rounded-lg border border-gray-100 shadow-sm p-4 h-fit">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </aside>

              <section className="xl:col-span-9">
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-4">
                  <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 gap-2">
                    <Search size={16} className="text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
                      placeholder="Search resources by title, topic, or tag..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredResources.map((resource) => {
                    const isBookmarked = bookmarkedIds.has(resource.id);
                    return (
                      <article
                        key={resource.id}
                        className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeStyles[resource.type]}`}>
                            {resource.type}
                          </span>
                          <button
                            onClick={() => toggleBookmark(resource.id)}
                            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                            title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck size={15} className="text-blue-600" />
                            ) : (
                              <Bookmark size={15} className="text-gray-500" />
                            )}
                          </button>
                        </div>

                        <h4 className="text-sm font-semibold text-gray-900 mt-3">{resource.title}</h4>
                        <p className="text-xs text-gray-600 mt-2 leading-relaxed">{resource.description}</p>

                        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                          <span>{resource.category}</span>
                          <span>{resource.duration}</span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {resource.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px]">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setSelectedResource(resource)}
                          className="mt-4 w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                        >
                          Open Resource <ExternalLink size={12} />
                        </button>
                      </article>
                    );
                  })}
                </div>

                {filteredResources.length === 0 && (
                  <div className="bg-white rounded-lg border border-dashed border-gray-300 p-6 text-center mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">No resources found</p>
                    <p className="text-xs text-gray-500">Try another category or search keyword.</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      {selectedResource && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSelectedResource(null)} />
          <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-base font-bold text-gray-900">Resource Details</h3>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="p-4">
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeStyles[selectedResource.type]}`}>
                {selectedResource.type}
              </span>
              <h4 className="text-lg font-bold text-gray-900 mt-3">{selectedResource.title}</h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{selectedResource.description}</p>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><span className="text-gray-500">Category:</span> {selectedResource.category}</p>
                <p><span className="text-gray-500">Author:</span> {selectedResource.author}</p>
                <p><span className="text-gray-500">Duration:</span> {selectedResource.duration}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-500 mb-2">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {selectedResource.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="mt-6 w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                View Resource <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
