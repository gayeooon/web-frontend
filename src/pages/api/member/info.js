import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const { name, email, phone, birth, gender } = req.body;
    const userInfo = JSON.stringify({ name, email, phone, birth, gender });

    // 쿠키 설정
    res.setHeader(
      'Set-Cookie',
      serialize('userInfo', userInfo, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );

    return res.status(200).json({ message: '유저 정보가 저장되었습니다.' });
  }

  if (req.method === 'GET') {
    const cookies = req.headers.cookie || '';

    // userInfo 쿠키 찾기
    const userCookie = cookies
      .split('; ')
      .find((row) => row.startsWith('userInfo='));

    if (!userCookie) {
      return res.status(200).json({
        message: '저장된 정보 없음',
        result: {
          name: '',
          email: '',
          phone: '',
          birth: '',
          gender: '',
        },
      });
    }

    // 쿠키에서 정보 가져오기
    const userInfo = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
    return res.status(200).json({ result: userInfo });
  }
  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
