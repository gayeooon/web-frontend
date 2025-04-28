import { faker } from '@faker-js/faker';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { page, pageSize } = req.query;

    const paredSize = pageSize ? parseInt(pageSize) : 10;
    const parsedPage = page ? page : 1;

    const articles = Array.from({ length: paredSize }).map((_, index) => ({
      articleId: parseInt(parsedPage + index),
      title: `기사 ${parsedPage + index}`,
      press: 'JOONGANG',
      thumbnail: faker.image.url(),
      publishDate: faker.date.recent({ days: 7 }),
    }));

    return res.status(200).json({
      message: '요청에 성공했습니다.',
      result: articles,
      hasMore: parsedPage < 10,
    });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
