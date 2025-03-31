import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const publishers = JSON.stringify(req.body);

    // 쿠키 설정
    res.setHeader(
      'Set-Cookie',
      serialize('publishers', publishers, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );

    return res.status(200).json({ message: '카테고리 정보가 저장되었습니다.' });
  }

  if (req.method === 'GET') {
    const cookies = req.headers.cookie || '';

    // publishers 쿠키 찾기
    const publisherCookie = cookies
      .split('; ')
      .find((row) => row.startsWith('publishers='));

    if (!publisherCookie) {
      return res.status(200).json({
        message: '저장된 정보 없음',
        result: [],
      });
    }

    // 쿠키에서 정보 가져오기
    const publishers = JSON.parse(
      decodeURIComponent(publisherCookie.split('=')[1])
    );
    return res.status(200).json({ result: publishers });
  }
  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
