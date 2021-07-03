import { NextApiRequest, NextApiResponse } from 'next'

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const { slug = '' } = req.query
  const params = req.url?.split('?') || []

  if (req.query.secret !== 'MY_SECRET_TOKEN') {
    return res.status(401).json({ message: 'Invalid token' })
  }

  res.setPreviewData({ })

  // Set cookie to None, so it can be read in the Storyblok iframe
  const cookies = res.getHeader('Set-Cookie')
  const cookieList = Array.isArray(cookies) ? cookies : [cookies];
  res.setHeader(
    'Set-Cookie',
    cookieList
      .filter((cookie) => !!cookie)
      .map((cookie) => cookie!.toString().replace('SameSite=Lax', 'SameSite=None;Secure'))
  )

  // Redirect to the path from entry
  res.redirect(`/${slug}?${params[1]}`)
}