import { NextRequest, NextResponse } from 'next/server';

const profileStore = new Map<number, Record<string, any>>();
const defaultProfile = {
  userId: 1,
  lookingFor: 'room',
  budget: '1200',
  moveInDate: '2026-06-01',
  smoker: false,
  pets: false,
  noPets: false,
  quiet: true,
  social: false,
  notes: 'Looking for a quiet place with easy access to work and friends.',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, lookingFor, budget, moveInDate, lifestyle, notes } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const profile = {
      userId,
      lookingFor: lookingFor ?? defaultProfile.lookingFor,
      budget: budget ?? defaultProfile.budget,
      moveInDate: moveInDate ?? defaultProfile.moveInDate,
      smoker: lifestyle?.smoker ?? defaultProfile.smoker,
      pets: lifestyle?.pets ?? defaultProfile.pets,
      noPets: lifestyle?.noPets ?? defaultProfile.noPets,
      quiet: lifestyle?.quiet ?? defaultProfile.quiet,
      social: lifestyle?.social ?? defaultProfile.social,
      notes: notes ?? defaultProfile.notes,
    };

    profileStore.set(userId, profile);
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const id = parseInt(userId, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    let profile = profileStore.get(id) ?? null;
    let isDefault = false;
    if (!profile && id === 1) {
      profile = defaultProfile;
      isDefault = true;
    }

    // Attach a flag to indicate this is the server-side default fallback
    const responseBody = profile ? { ...profile, _isDefault: isDefault } : null;
    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
