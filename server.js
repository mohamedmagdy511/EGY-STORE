const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const DB_PATH = path.join(__dirname, 'db.json');
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2), 'utf8');
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users', (req, res) => {
  const db = readDb();
  const email = normalizeEmail(req.query.email);
  if (!email) {
    return res.status(400).json({ error: 'Missing email query parameter' });
  }
  const user = db.users.find(u => normalizeEmail(u.email) === email);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ user });
});

app.post('/api/login', (req, res) => {
  const db = readDb();
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || '');
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = db.users.find(u => normalizeEmail(u.email) === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
  }
  return res.json({ user });
});

app.post('/api/register', (req, res) => {
  const db = readDb();
  const name = String(req.body.name || '').trim();
  const email = normalizeEmail(req.body.email);
  const phone = String(req.body.phone || '').trim();
  const password = String(req.body.password || '').trim();

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: 'يرجى ملء جميع الحقول' });
  }
  if (!/^01[025][0-9]{8}$/.test(phone)) {
    return res.status(400).json({ error: 'الرجاء إدخال رقم هاتف مصري صحيح مكون من 11 رقماً' });
  }
  if (db.users.some(u => normalizeEmail(u.email) === email)) {
    return res.status(409).json({ error: 'هذا البريد الإلكتروني مستخدم بالفعل' });
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
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  writeDb(db);
  return res.status(201).json({ user });
});

app.get('/api/pending-count', (req, res) => {
  const db = readDb();
  const pendingCount = db.users.filter(u => !u.approved).length;
  return res.json({ pendingCount });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`EGY STORE auth server running on port ${PORT}`);
});
