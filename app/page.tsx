'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type LifestyleOption =
  | 'smoker'
  | 'pets'
  | 'noPets'
  | 'quiet'
  | 'social';

const lifestyleOptions: Array<{ key: LifestyleOption; label: string }> = [
  { key: 'smoker', label: 'I smoke' },
  { key: 'pets', label: 'I have pets' },
  { key: 'noPets', label: 'I want a pet-free home' },
  { key: 'quiet', label: 'I prefer quiet spaces' },
  { key: 'social', label: 'I enjoy social living' },
];

export default function ProfileCreationPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lookingFor, setLookingFor] = useState<'room' | 'roommate'>('room');
  const [budget, setBudget] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [lifestyle, setLifestyle] = useState<Record<LifestyleOption, boolean>>({
    smoker: false,
    pets: false,
    noPets: false,
    quiet: false,
    social: false,
  });
  const [notes, setNotes] = useState('');

  // Load existing profile data on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // For now, using a default userId of 1. In a real app, this would come from authentication
        const currentUserId = 1;
        setUserId(currentUserId);

        const response = await fetch(`/api/profile?userId=${currentUserId}`);
        const data = await response.json();

        if (data) {
          setLookingFor(data.lookingFor as 'room' | 'roommate');
          setBudget(data.budget);
          setMoveInDate(data.moveInDate);
          setLifestyle({
            smoker: data.smoker,
            pets: data.pets,
            noPets: data.noPets,
            quiet: data.quiet,
            social: data.social,
          });
          setNotes(data.notes);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleCheckboxChange = (option: LifestyleOption) => {
    setLifestyle((current) => ({
      ...current,
      [option]: !current[option],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      alert('User ID not set');
      return;
    }

    setIsSaving(true);

    const profileData = {
      userId,
      lookingFor,
      budget,
      moveInDate,
      lifestyle,
      notes,
    };

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      // Navigate to dashboard after profile creation
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/80 backdrop-blur-sm sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr]">
          <section className="space-y-6">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                Welcome to RoomPlus
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Create your roommate profile
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Tell us whether you are looking for a room or a roommate, your budget, move-in timeline, and lifestyle preferences.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5 shadow-sm shadow-slate-200">
                <h2 className="text-sm font-semibold text-slate-900">Match with confidence</h2>
                <p className="mt-2 text-sm text-slate-600">
                  The more details you share, the better RoomPlus can recommend roommates who fit your needs.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 shadow-sm shadow-slate-200">
                <h2 className="text-sm font-semibold text-slate-900">Responsive setup</h2>
                <p className="mt-2 text-sm text-slate-600">
                  This form works well on mobile and desktop, so you can complete it anytime, anywhere.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-slate-950/95 p-6 text-white shadow-xl shadow-slate-950/10 sm:p-8">
            <h2 className="text-xl font-semibold text-white">Profile details</h2>
            <p className="mt-2 text-sm text-slate-300">
              Answer a few questions to set up your roommate preferences.
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <fieldset className="space-y-3 rounded-3xl bg-slate-900/90 p-4">
                <legend className="text-sm font-medium text-slate-100">I am looking for</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'room', label: 'A room' },
                    { value: 'roommate', label: 'A roommate' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                        lookingFor === option.value
                          ? 'border-indigo-400 bg-indigo-500/10 text-white'
                          : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="lookingFor"
                        value={option.value}
                        checked={lookingFor === option.value}
                        onChange={() => setLookingFor(option.value as 'room' | 'roommate')}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-100">
                  <span>Monthly budget</span>
                  <div className="flex rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2">
                    <span className="mr-2 self-center text-slate-400">$</span>
                    <input
                      type="text"
                      value={budget}
                      onChange={(event) => setBudget(event.target.value)}
                      placeholder="1200"
                      className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none"
                    />
                  </div>
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-100">
                  <span>Move-in date</span>
                  <input
                    type="date"
                    value={moveInDate}
                    onChange={(event) => setMoveInDate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition duration-150 focus:border-indigo-400"
                  />
                </label>
              </div>

              <div className="space-y-3 rounded-3xl bg-slate-900/90 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-100">Lifestyle preferences</h3>
                  <p className="text-xs text-slate-500">Choose all that apply</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {lifestyleOptions.map((option) => (
                    <label
                      key={option.key}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300 transition hover:border-slate-500"
                    >
                      <input
                        type="checkbox"
                        checked={lifestyle[option.key]}
                        onChange={() => handleCheckboxChange(option.key)}
                        className="mt-1 h-4 w-4 rounded border-slate-500 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="block text-sm font-medium text-slate-100">
                <span>Your ideal living vibe</span>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Tell us any other habits or preferences..."
                  className="mt-2 h-28 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition duration-150 focus:border-indigo-400"
                />
              </label>

              <button
                type="submit"
                disabled={isSaving || isLoading}
                className="w-full rounded-3xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save profile'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
