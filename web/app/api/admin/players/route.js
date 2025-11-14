import { createClient } from '@/lib/supabaseServer';

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name?.trim()) {
      return Response.json({ error: 'Name required' }, { status: 400 });
    }

    const { data, error } = await (await createClient())
      .from('players')
      .insert({ name: name.trim() || '', total_matches: 0, total_runs: 0, total_wickets: 0 })
      .select('*');

    if (error) throw error;

    return Response.json({ success: true, data: data?.[0] });
  } catch (error) {
    return Response.json({ error: error.message || 'Failed' }, { status: 500 });
  }
}
