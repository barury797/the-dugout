import { createClient } from '@/lib/supabaseServer';

/**
 * GET /api/teams
 * Public endpoint to fetch all teams
 * Returns team rows with player details
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('teams').select('*');

    if (error) throw error;

    return Response.json({ data });
  } catch (err) {
    console.error('Failed to fetch teams:', err.message);
    return Response.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}

/**
 * POST /api/teams
 * Authenticated endpoint to create a new team.
 * Requires: authenticated user session.
 * Body: { name: string, players: number[] }
 */
export async function POST(request) {
  try {
    const supabase = await createClient();
    const { name, players } = await request.json();

    // Validate team name
    if (!name?.trim()) {
      return Response.json({ error: 'Team name is required' }, { status: 400 });
    }

    // Validate players array
    if (!Array.isArray(players) || players.length === 0) {
      return Response.json({ error: 'At least one player is required' }, { status: 400 });
    }

    // Insert new team - no auth check needed, middleware handles it
    const { data, error } = await supabase
      .from('teams')
      .insert({ name: name.trim(), players })

    if (error) throw error;

    return Response.json({ data }, { status: 201 });
  } catch (err) {
    console.error('Failed to create team:', err.message);
    return Response.json({ error: 'Failed to create team' }, { status: 500 });
  }
}