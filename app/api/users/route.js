import { NextResponse } from 'next/server';
import { readDb, normalizeEmail } from '../../../lib/db.mjs';

// معالجة CORS لـ OPTIONS requests
export async function OPTIONS(request) {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = normalizeEmail(url.searchParams.get('email'));

    if (!email) {
      return NextResponse.json({ error: 'Missing email query parameter' }, { status: 400 });
    }

    const db = readDb();
    const user = db.users.find(u => normalizeEmail(u.email) === email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'خطأ في معالجة الطلب' }, { status: 500 });
  }
}
