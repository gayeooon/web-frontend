import { PUBLISHER_LIST } from '@/lib/constants';
import { faker } from '@faker-js/faker';

const HEADLINE_SIZE = 5;

export default function handler(req, res) {
  if (req.method === 'GET') {
    const articles = Array.from({ length: HEADLINE_SIZE }).map((_, index) => {
      const picNum = Math.floor(Math.random() * 39) + 1;

      return {
        articleId: `H${index}`,
        title: `헤드라인 기사 ${index}`,
        press:
          PUBLISHER_LIST[Math.floor(Math.random() * PUBLISHER_LIST.length)],
        headLine: faker.lorem.sentence(),
        thumbnail: `https://newsfit-image.s3.ap-northeast-2.amazonaws.com/${picNum}pic.jpg`,
        publishDate: faker.date.recent({ days: 7 }),
      };
    });

    return res.status(200).json({
      message: '요청에 성공했습니다.',
      result: articles,
    });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
