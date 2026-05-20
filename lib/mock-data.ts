export type LifestyleOption = 'smoker' | 'pets' | 'noPets' | 'quiet' | 'social';

export interface ProfileData {
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

export interface ChatMessage {
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface ChatThread {
  profileId: number;
  chatId: number;
  name: string;
  image: string;
  lastMessage: string;
  lastActivity: string;
  unread: number;
  messages: ChatMessage[];
}

export const mockProfiles: Record<number, ProfileData> = {
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

export const mockChats: ChatThread[] = [
  {
    profileId: 2,
    chatId: 2,
    name: 'Jamie Rodriguez',
    image: '👩‍🎓',
    lastMessage: 'Sounds great! I can move in with the right roommate.',
    lastActivity: '2h ago',
    unread: 1,
    messages: [
      { sender: 'them', text: 'Hey Alex! I saw your profile and love that you enjoy cooking.', time: '10:12 AM' },
      { sender: 'me', text: 'Thanks Jamie — I think we would get along well! Do you have any pets?', time: '10:14 AM' },
      { sender: 'them', text: 'Yes, I have a cat and I am looking for a quiet, friendly roommate.', time: '10:18 AM' },
    ],
  },
  {
    profileId: 3,
    chatId: 3,
    name: 'Taylor Kim',
    image: '🧑‍🎨',
    lastMessage: 'I usually work late, but I can be quiet during the day.',
    lastActivity: 'Yesterday',
    unread: 0,
    messages: [
      { sender: 'me', text: 'Hi Taylor, your art schedule sounds interesting. How do you feel about shared studio space?', time: 'Yesterday' },
      { sender: 'them', text: 'I like the idea of a good shared schedule. I am most creative at night.', time: 'Yesterday' },
    ],
  },
  {
    profileId: 4,
    chatId: 4,
    name: 'Morgan Lee',
    image: '🏃',
    lastMessage: 'I am very organized and can make sure the apartment stays neat.',
    lastActivity: 'May 18',
    unread: 0,
    messages: [
      { sender: 'them', text: 'Hey! I love staying active and keeping the place tidy.', time: 'May 18' },
      { sender: 'me', text: 'That sounds perfect. I also care about a quiet environment for studying.', time: 'May 18' },
    ],
  },
];

export function getProfile(profileId: number) {
  return mockProfiles[profileId] ?? null;
}

export function getChatByProfileId(profileId: number) {
  const profile = getProfile(profileId);
  if (!profile) {
    return null;
  }

  const existing = mockChats.find((chat) => chat.profileId === profileId);
  if (existing) {
    return existing;
  }

  return {
    profileId,
    chatId: profileId,
    name: profile.name,
    image: profile.image,
    lastMessage: `Start a conversation with ${profile.name}.`,
    lastActivity: 'Just now',
    unread: 0,
    messages: [
      {
        sender: 'them',
        text: `Hey there! I would love to chat and see if we're a good roommate match.`,
        time: 'Now',
      },
    ],
  };
}
