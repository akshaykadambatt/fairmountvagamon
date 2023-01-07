import type { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY);
type Data = {
  message: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { name, email, message }: { name: string; email: string; message: string } = req.body;
    const msg = `Name: ${name}\r\n Email: ${email}\r\n Message: ${message}`;
    const data = {
      to: "akshayakn6@gmail.com",
      from: "fairmountvagamonresort@gmail.com",
      subject: `hry sent you a message from Contact Form`,
      text: `Email => yoooo`,
      html: msg.replace(/\r\n/g, "<br>"),
    };
    const msgs = {
      to: "test@example.com", // Change to your recipient
      from: "test@example.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
      .send(msgs)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error: any) => {
        console.error(error);
      });
    try {
      await sgMail.send(data);
      console.log(process.env.NEXT_PUBLIC_SENDGRID_KEY);

      res.status(200).json({ message: "Your message was sent successfully." });
    } catch (err) {
      res.status(500).json({ message: `There was an error sending your message. ${err}` });
    }
  }
}
