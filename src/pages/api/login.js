// pages/api/login.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  // Replace this with your user validation logic (e.g., check a database)
  const user = { email: 'user@example.com', password: 'password' }; // Example user

  if (email === user.email && password === user.password) {
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
