'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Paperclip, Search, Send, Smile } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

type Sender = 'me' | 'them';

interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  unread: number;
  lastMessage: string;
  lastTime: string;
  messages: ChatMessage[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'David Thompson',
    role: 'Growth Mentor',
    avatar: 'DT',
    online: true,
    unread: 2,
    lastMessage: 'Can you share your acquisition funnel before our next call?',
    lastTime: '10:30 AM',
    messages: [
      { id: 'm1', sender: 'them', text: 'Morning Alex. How did your campaign experiment go?', time: '09:45 AM' },
      { id: 'm2', sender: 'me', text: 'Good progress. We improved sign-up conversion by 8%.', time: '09:47 AM' },
      { id: 'm3', sender: 'them', text: 'Great. Can you share your acquisition funnel before our next call?', time: '10:30 AM' },
    ],
  },
  {
    id: 'c2',
    name: 'Sarah Wilson',
    role: 'Product Advisor',
    avatar: 'SW',
    online: true,
    unread: 0,
    lastMessage: 'The roadmap draft looks strong. Let us prioritize Q3 bets.',
    lastTime: 'Yesterday',
    messages: [
      { id: 'm1', sender: 'them', text: 'The roadmap draft looks strong. Let us prioritize Q3 bets.', time: 'Yesterday' },
      { id: 'm2', sender: 'me', text: 'Agreed. I will send an updated version by Friday.', time: 'Yesterday' },
    ],
  },
  {
    id: 'c3',
    name: 'Priya Patel',
    role: 'Legal Mentor',
    avatar: 'PP',
    online: false,
    unread: 1,
    lastMessage: 'Please review the SAFE note terms before signing.',
    lastTime: 'Apr 23',
    messages: [
      { id: 'm1', sender: 'them', text: 'Please review the SAFE note terms before signing.', time: 'Apr 23' },
      { id: 'm2', sender: 'me', text: 'Will do. I had one question around liquidation preferences.', time: 'Apr 23' },
    ],
  },
  {
    id: 'c4',
    name: 'Nina Gupta',
    role: 'Founder Mentor',
    avatar: 'NG',
    online: false,
    unread: 0,
    lastMessage: 'Happy to intro you to a potential pilot customer next week.',
    lastTime: 'Apr 22',
    messages: [
      { id: 'm1', sender: 'them', text: 'Happy to intro you to a potential pilot customer next week.', time: 'Apr 22' },
      { id: 'm2', sender: 'me', text: 'That would be amazing. Thank you.', time: 'Apr 22' },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<string>(INITIAL_CONVERSATIONS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [draft, setDraft] = useState('');

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const query = searchQuery.toLowerCase();
      return (
        conversation.name.toLowerCase().includes(query) ||
        conversation.role.toLowerCase().includes(query) ||
        conversation.lastMessage.toLowerCase().includes(query)
      );
    });
  }, [conversations, searchQuery]);

  const selectedConversation = useMemo(() => {
    return conversations.find((conversation) => conversation.id === selectedConversationId) ?? conversations[0];
  }, [conversations, selectedConversationId]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = draft.trim();

    if (!trimmed || !selectedConversation) {
      return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0/, '');

    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== selectedConversation.id) return conversation;

        return {
          ...conversation,
          lastMessage: trimmed,
          lastTime: time,
          unread: 0,
          messages: [...conversation.messages, { id: `msg-${Date.now()}`, sender: 'me', text: trimmed, time }],
        };
      }),
    );

    setDraft('');
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unread: 0 } : conversation,
      ),
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 bg-white border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Messages</h1>
            <p className="text-sm text-gray-600">Stay connected with mentors and keep every startup conversation in one place.</p>
          </div>

          <div className="p-4 h-[calc(100vh-150px)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
              <section className="lg:col-span-4 bg-white rounded-lg border border-gray-100 shadow-sm h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 gap-2">
                    <Search size={16} className="text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
                      placeholder="Search conversations..."
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {filteredConversations.map((conversation) => {
                    const isActive = selectedConversation?.id === conversation.id;
                    return (
                      <button
                        key={conversation.id}
                        onClick={() => handleSelectConversation(conversation.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          isActive
                            ? 'border-blue-200 bg-blue-50'
                            : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative shrink-0">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                              {conversation.avatar}
                            </div>
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white ${
                                conversation.online ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <p className="text-sm font-semibold text-gray-900 truncate">{conversation.name}</p>
                              <p className="text-xs text-gray-500">{conversation.lastTime}</p>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{conversation.role}</p>
                            <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                          </div>

                          {conversation.unread > 0 && (
                            <span className="shrink-0 px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-medium rounded-full">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="lg:col-span-8 bg-white rounded-lg border border-gray-100 shadow-sm h-full flex flex-col">
                {!selectedConversation ? (
                  <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                    Select a conversation to start messaging.
                  </div>
                ) : (
                  <>
                    <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                          {selectedConversation.avatar}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white ${
                            selectedConversation.online ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{selectedConversation.name}</p>
                        <p className="text-xs text-gray-500">
                          {selectedConversation.online ? 'Online now' : 'Offline'} · {selectedConversation.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[75%] px-3 py-2 rounded-lg border text-sm ${
                              message.sender === 'me'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-800 border-gray-200'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`mt-1 text-[10px] ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={sendMessage} className="p-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
                        <button
                          type="button"
                          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                          title="Emoji"
                          aria-label="Emoji"
                        >
                          <Smile size={16} />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                          title="Attach file"
                          aria-label="Attach file"
                        >
                          <Paperclip size={16} />
                        </button>
                        <input
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          className="flex-1 outline-none text-sm text-gray-900 placeholder-gray-400"
                          placeholder="Write a message..."
                        />
                        <button
                          type="submit"
                          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          aria-label="Send message"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
