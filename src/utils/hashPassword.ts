import bcryptjs from 'bcryptjs';

export default async function hashPassword(password: string) {
  const hashedPassword = await bcryptjs.hash(password, 10);
  return hashedPassword;
}
