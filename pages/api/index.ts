// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  pageURL: string | undefined;
  message?: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res
    .status(200)
    .json({ pageURL: req.headers.host, message: "API NOT IMPLEMENTED" });
}
