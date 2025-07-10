import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '잘못된 요청입니다.' });
  }

  const { memberInfo: userInfo, categories, publishers } = req.body;

  // 필수값 검증
  if (!userInfo || !categories || !publishers) {
    return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
  }

  const authToken = 'auth_token'; // 임시 토큰

  res.setHeader('Set-Cookie', [
    serialize('auth-token', authToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    }),
    serialize('userInfo', JSON.stringify(userInfo), {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    }),
    serialize('categories', JSON.stringify(categories), {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    }),
    serialize('publishers', JSON.stringify(publishers), {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    }),
  ]);

  return res.status(201).json({ message: '회원가입 완료되었습니다 (mock)' });
}
