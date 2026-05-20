'use client';

import { useRouter } from 'next/navigation';
import { mockChats } from '@/lib/mock-data';

export default function ChatsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Chats</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Your roommate conversations</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              See all the people you have matched with and continue the conversation right here.
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Back to dashboard
          </button>
        </div>

        <div className="grid gap-4">
          {mockChats.map((chat) => (
            <button
              key={chat.chatId}
              onClick={() => router.push(`/chats/${chat.chatId}`)}
              className="group rounded-[28px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-2xl">
                  {chat.image}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-slate-950">{chat.name}</h2>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                      {chat.lastActivity}
                    </span>
                  </div>
                  <p className="mt-2 truncate text-sm text-slate-600">{chat.lastMessage}</p>
                </div>
              </div>
              {chat.unread > 0 && (
                <div className="mt-4 inline-flex items-center rounded-full bg-indigo-500 px-3 py-1 text-sm font-semibold text-white">
                  {chat.unread} new message{chat.unread > 1 ? 's' : ''}
                </div>
              )}
            </button>
          ))}

          {mockChats.length === 0 && (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
              <h2 className="text-xl font-semibold text-slate-900">No chats yet</h2>
              <p className="mt-2 text-sm">Connect with roommates from the dashboard to start a conversation.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
