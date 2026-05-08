import { NextResponse } from 'next/server';

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
  return NextResponse.json({ status: 'ok' }, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
