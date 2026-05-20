import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, lookingFor, budget, moveInDate, lifestyle, notes } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Create or update profile
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        lookingFor,
        budget,
        moveInDate,
        smoker: lifestyle.smoker,
        pets: lifestyle.pets,
        noPets: lifestyle.noPets,
        quiet: lifestyle.quiet,
        social: lifestyle.social,
        notes,
      },
      create: {
        userId,
        lookingFor,
        budget,
        moveInDate,
        smoker: lifestyle.smoker,
        pets: lifestyle.pets,
        noPets: lifestyle.noPets,
        quiet: lifestyle.quiet,
        social: lifestyle.social,
        notes,
      },
    });

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

    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!profile) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
