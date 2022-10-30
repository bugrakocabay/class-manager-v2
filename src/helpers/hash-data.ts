import * as bcrypt from 'bcrypt';

export async function hashData(_data: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(_data, salt);
}

export async function compareData(_rawData: string, hashedData: string) {
  return bcrypt.compare(_rawData, hashedData);
}
