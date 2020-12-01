import { NextApiRequest, NextApiResponse } from "next";

/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      console.log(req.cookies);

      return res.send("WIP");
    }
  }
}
