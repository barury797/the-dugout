import { createClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return Response.json(
        { error: error.message || 'Logout failed' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { error: error.message || 'Logout failed' },
      { status: 500 }
    );
  }
}
