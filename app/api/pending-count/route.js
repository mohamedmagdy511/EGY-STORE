import { NextResponse } from 'next/server';
import { readDb } from '../../../lib/db.mjs';

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

export async function GET() {
  try {
    const db = readDb();
    const pendingCount = db.users.filter(u => !u.approved).length;
    return NextResponse.json({ pendingCount }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'خطأ في معالجة الطلب' }, { status: 500 });
  }
}
