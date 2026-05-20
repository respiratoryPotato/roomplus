'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Tab = 'search' | 'chats' | 'profile';

interface RoommateCard {
  id: number;
  name: string;
  age: number;
  budget: string;
  moveIn: string;
  highlights: string[];
  image: string;
}

const mockRoommates: RoommateCard[] = [
  {
    id: 1,
    name: 'Alex Chen',
    age: 21,
    budget: '$1,200 - $1,400',
    moveIn: 'June 2026',
    highlights: ['Quiet', 'Clean', 'Early riser'],
    image: '👨‍💻',
  },
  {
    id: 2,
    name: 'Jamie Rodriguez',
    age: 22,
    budget: '$1,000 - $1,300',
    moveIn: 'July 2026',
    highlights: ['Social', 'Pet friendly', 'Loves cooking'],
    image: '👩‍🎓',
  },
  {
    id: 3,
    name: 'Taylor Kim',
    age: 20,
    budget: '$1,100 - $1,500',
    moveIn: 'June 2026',
    highlights: ['Night owl', 'Creative', 'Introverted'],
    image: '🧑‍🎨',
  },
  {
    id: 4,
    name: 'Morgan Lee',
    age: 23,
    budget: '$1,300 - $1,600',
    moveIn: 'May 2026',
    highlights: ['Gym enthusiast', 'Organized', 'Quiet'],
    image: '🏃',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedCards, setLikedCards] = useState<Set<number>>(new Set());

  const handleLike = (id: number) => {
    const newLiked = new Set(likedCards);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedCards(newLiked);
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-600">RoomPlus</h1>
            <button
              onClick={handleProfileClick}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Profile
            </button>
          </div>

          {activeTab === 'search' && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, budget, or move-in date..."
                className="w-full rounded-full border border-slate-300 bg-slate-50 px-5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white"
              />
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {activeTab === 'search' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Recommended matches for you
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Based on your preferences, here are some great options
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {mockRoommates.map((roommate) => (
                  <div
                    key={roommate.id}
                    className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-md transition hover:shadow-lg"
                  >
                    {/* Avatar */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{roommate.image}</div>
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {roommate.name}
                          </h3>
                          <p className="text-xs text-slate-500">{roommate.age}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLike(roommate.id)}
                        className="text-2xl transition"
                      >
                        {likedCards.has(roommate.id) ? '❤️' : '🤍'}
                      </button>
                    </div>

                    {/* Details */}
                    <div className="mb-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="font-medium text-slate-500">Budget:</span>
                        <span>{roommate.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="font-medium text-slate-500">Move-in:</span>
                        <span>{roommate.moveIn}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {roommate.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => router.push(`/profile/${roommate.id}`)}
                      className="mt-auto w-full rounded-2xl border border-indigo-300 bg-indigo-50 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
                    >
                      View profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chats' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
              <h2 className="text-xl font-semibold text-slate-900">
                No chats yet
              </h2>
              <p className="mt-2 text-slate-600">
                Start matching with people to begin conversations
              </p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-slate-900">My Profile</h2>
              <p className="mt-4 text-slate-600">
                Your profile information will appear here. You can edit your
                preferences and lifestyle details.
              </p>
              <button
                onClick={() => router.push('/')}
                className="mt-6 rounded-2xl bg-indigo-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Edit profile
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t border-slate-200 bg-white px-4 py-3 shadow-lg sm:px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-around">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition ${
              activeTab === 'search'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-xl">🔍</span>
            <span className="text-xs font-medium">Search</span>
          </button>

          <button
            onClick={() => setActiveTab('chats')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition ${
              activeTab === 'chats'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-xl">💬</span>
            <span className="text-xs font-medium">Chats</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition ${
              activeTab === 'profile'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-xl">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
