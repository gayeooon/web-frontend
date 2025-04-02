import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const categories = JSON.stringify(req.body);

    // 쿠키 설정
    res.setHeader(
      'Set-Cookie',
      serialize('categories', categories, {
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

    // categories 쿠키 찾기
    const categoryCookie = cookies
      .split('; ')
      .find((row) => row.startsWith('categories='));

    if (!categoryCookie) {
      return res.status(200).json({
        message: '저장된 정보 없음',
        result: [],
      });
    }

    // 쿠키에서 정보 가져오기
    const categories = JSON.parse(
      decodeURIComponent(categoryCookie.split('=')[1])
    );
    return res.status(200).json({ result: categories });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
