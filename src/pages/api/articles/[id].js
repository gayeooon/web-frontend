import { faker } from '@faker-js/faker';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    return res.status(200).json({
      message: '요청에 성공했습니다.',
      result: {
        title: `기사 ${id}`,
        content: faker.lorem.sentences(),
        articleSource: `https://www.example.com/${id}`,
        comment: [
          {
            commentId: 1,
            content: 'comment',
            nickName: 'user1',
            likeCount: 0,
            createdDate: faker.date.recent({ days: 7 }),
            isMyComment: false,
          },
          {
            commentId: 2,
            content: 'comment',
            nickName: 'user2',
            likeCount: 0,
            createdDate: faker.date.recent({ days: 7 }),
            isMyComment: false,
          },
        ],
        likeCount: faker.number.int({ max: 999 }),
        likedArticle: false,
      },
    });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
