import { PUBLISHER_LIST } from '@/lib/constants';
import { faker } from '@faker-js/faker';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { keyword, page, pageSize } = req.query;

    const paredSize = pageSize ? parseInt(pageSize) : 5;
    const parsedPage = page ? page : 0;

    const articles = Array.from({ length: paredSize }).map((_, index) => {
      const picNum = Math.floor(Math.random() * 39) + 1;

      return {
        articleId: parseInt(parsedPage + index),
        title: `${keyword} 기사 ${parseInt(parsedPage + index)}`,
        press:
          PUBLISHER_LIST[Math.floor(Math.random() * PUBLISHER_LIST.length)],
        thumbnail: `https://newsfit-image.s3.ap-northeast-2.amazonaws.com/${picNum}pic.jpg`,
        publishDate: faker.date.recent({ days: 7 }),
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
