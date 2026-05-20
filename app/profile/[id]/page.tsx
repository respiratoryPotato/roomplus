'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';

type LifestyleOption =
  | 'smoker'
  | 'pets'
  | 'noPets'
  | 'quiet'
  | 'social';

interface ProfileData {
  id: number;
  name: string;
  age: number;
  image: string;
  lookingFor: 'room' | 'roommate';
  budget: string;
  moveInDate: string;
  lifestyle: Record<LifestyleOption, boolean>;
  notes: string;
  joinDate: string;
}

const lifestyleLabels: Record<LifestyleOption, string> = {
  smoker: 'I smoke',
  pets: 'I have pets',
  noPets: 'I want a pet-free home',
  quiet: 'I prefer quiet spaces',
  social: 'I enjoy social living',
};

// Mock profile data - in a real app, this would come from a database
const mockProfiles: Record<number, ProfileData> = {
  1: {
    id: 1,
    name: 'Alex Chen',
    age: 21,
    image: '👨‍💻',
    lookingFor: 'roommate',
    budget: '$1,200 - $1,400',
    moveInDate: 'June 2026',
    lifestyle: {
      smoker: false,
      pets: false,
      noPets: false,
      quiet: true,
      social: false,
    },
    notes: 'I am a computer science student who loves coding and spending time in the library. I prefer a clean, quiet living space.',
    joinDate: 'May 2026',
  },
  2: {
    id: 2,
    name: 'Jamie Rodriguez',
    age: 22,
    image: '👩‍🎓',
    lookingFor: 'room',
    budget: '$1,000 - $1,300',
    moveInDate: 'July 2026',
    lifestyle: {
      smoker: false,
      pets: true,
      noPets: false,
      quiet: false,
      social: true,
    },
    notes: 'Education major who loves cooking and entertaining. I have a friendly cat and enjoy hosting game nights with friends.',
    joinDate: 'April 2026',
  },
  3: {
    id: 3,
    name: 'Taylor Kim',
    age: 20,
    image: '🧑‍🎨',
    lookingFor: 'roommate',
    budget: '$1,100 - $1,500',
    moveInDate: 'June 2026',
    lifestyle: {
      smoker: false,
      pets: false,
      noPets: true,
      quiet: false,
      social: false,
    },
    notes: 'Artist and musician. I work late into the night on creative projects, so I am a night owl. Very introverted but friendly.',
    joinDate: 'May 2026',
  },
  4: {
    id: 4,
    name: 'Morgan Lee',
    age: 23,
    image: '🏃',
    lookingFor: 'room',
    budget: '$1,300 - $1,600',
    moveInDate: 'May 2026',
    lifestyle: {
      smoker: false,
      pets: false,
      noPets: false,
      quiet: true,
      social: false,
    },
    notes: 'Fitness enthusiast and very organized. I value a clean space and quiet environment for morning workouts and studying.',
    joinDate: 'March 2026',
  },
};

export default function ViewProfilePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = parseInt(params.id as string);
  const profile = mockProfiles[profileId];

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => router.back()}
            className="mb-6 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            ← Back
          </button>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Profile not found</h1>
            <p className="mt-2 text-slate-600">This profile doesn't exist or has been removed.</p>
          </div>
        </div>
      </main>
    );
  }

  const selectedLifestyle = Object.entries(profile.lifestyle)
    .filter(([_, selected]) => selected)
    .map(([key]) => lifestyleLabels[key as LifestyleOption]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          ← Back
        </button>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10">
          {/* Header */}
          <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <div className="text-7xl">{profile.image}</div>
              <div>
                <h1 className="text-3xl font-bold text-slate-950">{profile.name}</h1>
                <p className="mt-1 text-lg text-slate-600">{profile.age} years old</p>
                <p className="text-sm text-slate-500">Joined {profile.joinDate}</p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/chats/${profile.id}`)}
              className="rounded-3xl bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
            >
              Connect
            </button>
          </div>

          {/* Main Info Grid */}
          <div className="mb-8 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-2">
            {/* Looking For */}
            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Looking for
              </h3>
              <p className="mt-3 text-2xl font-bold text-slate-950">
                {profile.lookingFor === 'room' ? 'A room' : 'A roommate'}
              </p>
            </div>

            {/* Budget */}
            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Monthly budget
              </h3>
              <p className="mt-3 text-2xl font-bold text-slate-950">{profile.budget}</p>
            </div>

            {/* Move-in Date */}
            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Move-in date
              </h3>
              <p className="mt-3 text-2xl font-bold text-slate-950">{profile.moveInDate}</p>
            </div>

            {/* Lifestyle */}
            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Lifestyle
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedLifestyle.length > 0 ? (
                  selectedLifestyle.map((item, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-600">No preferences selected</p>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-950">About me</h3>
            <p className="mt-4 leading-relaxed text-slate-700">{profile.notes}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => router.push(`/chats/${profile.id}`)}
              className="flex-1 rounded-3xl bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
            >
              Send message
            </button>
            <button className="flex-1 rounded-3xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
              Mark as interested
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
