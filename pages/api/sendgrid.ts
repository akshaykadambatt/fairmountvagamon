import type { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY);
type Data = {
  message: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { name, email, message }: { name: string; email: string; message: string } = req.body;
    const datas = JSON.parse(req.body)
    const msg = `Name: ${datas.name}\r\n 
    Email: ${datas.email}\r\n 
    Phone: ${datas.phone}\r\n 
    Message: ${datas.message}`;
    const data = {
      to: "admin@fairmountvagamon.com",
      from: "noreply@fairmountvagamon.com",
      subject: `${datas.name} sent you a message from Contact Form`,
      html: msg.replace(/\r\n/g, "<br>"),
    };
    try {
      await sgMail.send(data);
      console.log(req.body);

      res.status(200).json({ message: "Your message was sent successfully." });
    } catch (err) {
      res.status(500).json({ message: `There was an error sending your message. ${err}` });
    }
  }
}
