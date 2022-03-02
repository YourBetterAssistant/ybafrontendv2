// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  res.unstable_revalidate(req.headers.host!);
  res.send(200);
}
