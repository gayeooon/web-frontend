import { faker } from '@faker-js/faker';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const comment = new Array(Math.floor(Math.random() * 10))
      .fill()
      .map((_, i) => ({
        commentId: i,
        content: faker.lorem.sentences(),
        nickName: `user${i}`,
        likeCount: 0,
        createdDate: faker.date.recent({ days: 7 }),
        isMyComment: false,
      }))
      .sort((a, b) => b.createdDate - a.createdDate);

    return res.status(200).json({
      message: '요청에 성공했습니다.',
      result: {
        title: `기사 ${id}`,
        content: faker.lorem.sentences(),
        articleSource: `https://www.example.com/${id}`,
        comment,
        likeCount: faker.number.int({ max: 999 }),
        likedArticle: false,
      },
    });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
