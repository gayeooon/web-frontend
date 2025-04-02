import { faker } from '@faker-js/faker';

const HEADLINE_SIZE = 5;

export default function handler(req, res) {
  if (req.method === 'GET') {
    const articles = Array.from({ length: HEADLINE_SIZE }).map((_, index) => ({
      articleId: `H${index}`,
      title: `기사 H${index}`,
      press: 'JOONGANG',
      headLine: faker.lorem.sentence(),
      thumbnail: faker.image.url(),
      publishDate: faker.date.recent({ days: 7 }),
    }));

    return res.status(200).json({
      message: '요청에 성공했습니다.',
      result: articles,
    });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
