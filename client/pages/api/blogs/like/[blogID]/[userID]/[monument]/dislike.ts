import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default async function like(req: NextApiRequest, res: NextApiResponse) {
  const { blogID, userID } = req.query as {
    blogID: string;
    userID: string;
    monument: string;
  };

  const { likes } = JSON.parse(req.body) as {
    likes: number;
  };

  try {
    await prisma.blogs.update({
      where: {
        blogId: blogID,
      },
      data: {
        likeCount: likes,
        likes: {
          delete: {
            userId_blogsBlogId: {
              blogsBlogId: blogID,
              userId: userID,
            },
          },
        },
      },
    });
    res.send('ok');
  } catch (e) {
    res.send({
      error: false,
      message: "YOU DIDN'T LIKE THIS TO BEGIN WITH",
    });
  }
}
