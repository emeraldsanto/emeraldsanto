import { NextApiRequest, NextApiResponse } from 'next';

export default async function exit(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { slug = '' } = req.query;

  // Exit the current user from "Preview Mode".
  res.clearPreviewData();

  const cookies = res.getHeader('Set-Cookie');
  const cookieList = Array.isArray(cookies) ? cookies : [cookies];
  res.setHeader(
    'Set-Cookie',
    cookieList
      .filter((cookie) => !!cookie)
      .map((cookie) => cookie!.toString().replace('SameSite=Lax', 'SameSite=None;Secure'))
  );

  res.redirect(`/${slug}`);
}