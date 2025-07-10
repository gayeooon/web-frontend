import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    // 삭제할 쿠키 목록
    const cookiesToDelete = [
      'auth-token',
      'userInfo',
      'categories',
      'publishers',
    ];

    // 여러 개의 Set-Cookie 헤더 생성
    const cookieHeaders = cookiesToDelete.map((cookieName) =>
      serialize(cookieName, '', {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      })
    );

    // 쿠키 삭제 설정
    res.setHeader('Set-Cookie', cookieHeaders);

    return res.status(200).json({ message: '모든 쿠키가 삭제되었습니다.' });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
