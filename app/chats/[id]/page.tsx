'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getChatByProfileId, getProfile } from '@/lib/mock-data';

export default function ChatThreadPage() {
  const router = useRouter();
  const params = useParams();
  const profileId = parseInt(params.id as string, 10);
  const profile = useMemo(() => getProfile(profileId), [profileId]);
  const initialChat = useMemo(() => getChatByProfileId(profileId), [profileId]);

  const [messages, setMessages] = useState(initialChat?.messages ?? []);
  const [messageText, setMessageText] = useState('');

  if (!profile || !initialChat) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => router.push('/chats')}
            className="mb-6 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            ← Back to chats
          </button>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Chat not found</h1>
            <p className="mt-2 text-slate-600">That conversation does not exist or the profile is unavailable.</p>
          </div>
        </div>
      </main>
    );
  }

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!messageText.trim()) {
      return;
    }

    setMessages((current) => [
      ...current,
      { sender: 'me', text: messageText.trim(), time: 'Now' },
    ]);
    setMessageText('');
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col rounded-[32px] border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => router.push('/chats')}
              className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
            >
              ← Back to chats
            </button>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-3xl">
                {profile.image}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Chatting with</p>
                <h1 className="text-xl font-semibold text-slate-950">{profile.name}</h1>
              </div>
            </div>
            <button
              onClick={() => router.push(`/profile/${profile.id}`)}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              View profile
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}-${message.time}`}
                className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-6 ${
                  message.sender === 'me'
                    ? 'self-end bg-indigo-600 text-white'
                    : 'self-start bg-slate-100 text-slate-800'
                }`}
              >
                <p>{message.text}</p>
                <span className="mt-2 block text-xs text-slate-500">{message.time}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="border-t border-slate-200 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              placeholder={`Message ${profile.name}...`}
              className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400"
            />
            <button
              type="submit"
              className="rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
