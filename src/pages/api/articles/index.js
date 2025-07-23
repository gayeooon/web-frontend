import { faker } from '@faker-js/faker';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { page, pageSize } = req.query;

    const paredSize = pageSize ? parseInt(pageSize) : 10;
    const parsedPage = page ? page : 1;

    const cookies = req.headers.cookie || '';

    const publisherCookie = cookies
      .split('; ')
      .find((row) => row.startsWith('publishers='));

    // publishers 쿠키가 없을 때 에러 처리
    if (!publisherCookie) {
      return res.status(400).json({
        message: 'publishers 쿠키가 필요합니다.',
      });
    }

    const publishers = JSON.parse(
      decodeURIComponent(publisherCookie.split('=')[1])
    );

    const articles = Array.from({ length: paredSize }).map((_, index) => {
      const articleId = parseInt(parsedPage + index);

      const picNum = Math.floor(Math.random() * 39) + 1;

      return {
        articleId,
        title: `기사 ${parsedPage + index}`,
        press: publishers[index % publishers.length],
        thumbnail: `https://newsfit-image.s3.ap-northeast-2.amazonaws.com/${picNum}pic.jpg`,
        publishDate: faker.date.recent({ days: 7 }),
        articleSource: `https://www.example.com/${articleId}`,
      };
    });

    return res.status(200).json({
      message: '요청에 성공했습니다.',
      result: articles,
      hasMore: parsedPage < 10,
    });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
