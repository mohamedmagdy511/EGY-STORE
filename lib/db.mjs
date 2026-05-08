import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const defaultData = { users: [], orders: [], products: [], governorates: [], shippingCompanies: [], expenses: [], returns: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf8');
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [], orders: [], products: [], governorates: [], shippingCompanies: [], expenses: [], returns: [] };
  }
}

export function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing database:', error);
  }
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}
