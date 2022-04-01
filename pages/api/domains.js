import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import createError from 'http-errors';
import clientPromise from '@lib/mongodb';

const postHandler = async (req, res, next) => {
  try {
    // Connect to database
    const client = await clientPromise;

    // Get domain
    const { domain } = req.body;

    // Get session
    const session = await getSession({ req });
    if (!session) {
      return next(createError(401));
    }

    const domains = await client.db().collection('domains').insert({ domain, owner: session.user.userId });
    console.log(domains);
    // Return new workspace
    return res.status(200).json({ workspace: 'foo' });
  } catch (error) {
    console.log(error);
    return next(createError(500));
  }
};

const handler = nextConnect();
handler.post(postHandler);

export default handler;
