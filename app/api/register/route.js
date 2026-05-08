import { NextResponse } from 'next/server';
import { readDb, writeDb, normalizeEmail } from '../../../lib/db.mjs';

// معالجة CORS لـ OPTIONS requests
export async function OPTIONS(request) {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = normalizeEmail(body.email);
    const phone = String(body.phone || '').trim();
    const password = String(body.password || '').trim();

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: 'يرجى ملء جميع الحقول' }, { status: 400 });
    }

    if (!/^01[025][0-9]{8}$/.test(phone)) {
      return NextResponse.json({ error: 'الرجاء إدخال رقم هاتف مصري صحيح مكون من 11 رقماً' }, { status: 400 });
    }

    const db = readDb();
    if (db.users.some(u => normalizeEmail(u.email) === email)) {
      return NextResponse.json({ error: 'هذا البريد الإلكتروني مستخدم بالفعل' }, { status: 409 });
    }

    const user = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
      role: 'employee',
      permissions: [],
      approved: false,
      createdAt: new Date().toISOString(),
    };

    db.users.push(user);
    writeDb(db);

    return NextResponse.json({ user }, { 
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'خطأ في معالجة الطلب' }, { status: 500 });
  }
}
