import { sendMail } from "@/server/mailService";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "POST": {
        //Do some thing
        await sendMail(
          "TEST",
          "dontkillme@bunnyfiedlabs.com",
          "THI IS A TEST FOR MY MEDIUM USERS"
        );
        res.status(200).send("Success");
        break;
      }
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: err,
    });
  }
};

export default handler;