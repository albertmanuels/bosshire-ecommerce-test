import { NextResponse } from 'next/server';

import { deleteSession } from '@/utils/session';

export async function POST() {
  try {
    await deleteSession();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to logout' }, { status: 500 });
  }
}