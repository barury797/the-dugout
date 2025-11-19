import { createClient } from '@/lib/supabaseServer';

export async function POST(request) {
  try {
    console.log('Login attempt');
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return Response.json(
        { error: error.message || 'Invalid credentials' },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      message: 'Login successful',
      user: data?.user,
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
