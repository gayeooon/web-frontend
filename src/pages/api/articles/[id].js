import { faker } from '@faker-js/faker';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    return res.status(200).json({
      message: '요청에 성공했습니다.',
      result: {
        title: '기사 등록.',
        content: faker.lorem.sentences(),
        articleSource: `https://www.example.com/${id}`,
        comment: [
          {
            commentId: 1,
            content: '텍스트',
            nickName: 'nnijgnus',
            likeCount: 0,
            createdDate: '2024-10-26T04:48:40.221635',
            isMyComment: true,
          },
        ],
        likeCount: faker.number.int({ max: 999 }),
        likedArticle: false,
      },
    });
  }

  return res.status(405).json({ message: '잘못된 요청입니다.' });
}
