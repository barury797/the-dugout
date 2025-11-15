import { createClient } from '@/lib/supabaseServer';

/**
 * GET /api/players
 * Public endpoint to fetch all players.
 * Returns player rows with full stats.
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('players').select('*');

    if (error) throw error;

    return Response.json({ data });
  } catch (err) {
    console.error('Failed to fetch players:', err.message);
    return Response.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

/**
 * POST /api/players
 * Authenticated endpoint to create a new player.
 * Requires: authenticated user session.
 * Body: { name: string }
 */
export async function POST(request) {
  try {
    const supabase = await createClient();
    
    if (!userData?.user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { name } = await request.json();
    if (!name?.trim()) {
      return Response.json({ error: 'Player name is required' }, { status: 400 });
    }

    // Insert new player with default stats
    const { error } = await supabase
      .from('players')
      .insert({ name: name.trim() })

    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    console.error('Failed to create player:', err.message);
    return Response.json({ error: 'Failed to create player' }, { status: 500 });
  }
}
