import clientPromise from "@/app/components/lib/db";
import Joi from "joi";
import nodemailer from "nodemailer";

// Schema for portfolio contact form
const contactSchema = Joi.object({
    name: Joi.string().min(2).max(75).required(),
    company_name: Joi.string().allow("", null).max(200),
    email: Joi.string().email().required(),
    subject: Joi.string().allow("", null).max(200),
    message: Joi.string().min(5).required(),
});

export async function POST(req) {
    try {
        const body = await req.json();
        const { error, value } = contactSchema.validate(body);

        if (error) {
            return Response.json({ error: error.details[0].message }, { status: 400 });
        }

        // Set defaults for optional fields
        const company = value.company_name || "Not provided";
        const subject = value.subject || "General Inquiry";

        // Save to MongoDB
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DBNAME);
        const result = await db.collection("portfolio_contacts").insertOne({
            ...value,
            company_name: company,
            subject: subject,
            createdAt: new Date(),
        });

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // 1️⃣ Email to Admin (Bheemudu)
        const adminMailOptions = {
            from: `"${value.name}" <${value.email}>`,
            to: process.env.EMAIL_USER,
            replyTo: value.email,
            subject: `📬 New Portfolio Contact from ${value.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 16px;">
                    <h2 style="color: #2563eb;">New message from your portfolio</h2>
                    <p><strong>Name:</strong> ${value.name}</p>
                    <p><strong>Company/Organization:</strong> ${company}</p>
                    <p><strong>Email:</strong> ${value.email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: #f3f4f6; padding: 12px; border-radius: 8px;">${value.message.replace(/\n/g, "<br/>")}</p>
                    <hr/>
                    <p style="font-size: 12px; color: #6b7280;">Reply directly to this email to contact ${value.name}.</p>
                </div>
            `,
        };

        await transporter.sendMail(adminMailOptions);

        // 2️⃣ Thank you email to the person who contacted you (HR / friend / recruiter)
        const userMailOptions = {
            from: `"Bheemudu Guguloth – MERN Architect" <${process.env.EMAIL_USER}>`,
            to: value.email,
            subject: `🚀 Thank you for connecting, ${value.name} – Let's build the future together`,
            html: `
    <div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border-radius: 24px; box-shadow: 0 20px 35px -10px rgba(0,0,0,0.05);">
      
      <!-- Header with brand -->
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #059669; font-size: 28px; font-weight: 800; margin: 0;">Bheemudu Guguloth</h1>
        <p style="color: #4b5563; font-size: 16px; margin-top: 4px;">Senior Full‑Stack Engineer | MERN • React Native • Flutter</p>
        <div style="width: 60px; height: 4px; background: #10b981; margin: 16px auto 0; border-radius: 4px;"></div>
      </div>

      <!-- Hero greeting -->
      <div style="background: #f0fdf4; padding: 20px; border-radius: 20px; margin-bottom: 28px;">
        <p style="font-size: 18px; font-weight: 600; color: #065f46; margin: 0 0 8px 0;">Hello ${value.name},</p>
        <p style="font-size: 16px; color: #1f2937; margin: 0;">Thank you for reaching out – I genuinely appreciate your time and interest.</p>
      </div>

      <!-- Value proposition (CEO style) -->
      <div style="margin-bottom: 28px;">
        <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 12px 0;">⚡ My value at a glance</h2>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">✅ <strong>3.5+ years</strong> – MERN, React Native, Flutter, Node.js, MongoDB</li>
          <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">🚀 <strong>3+ production apps</strong> – OTT platforms, Real Estate CRM, Job Portals</li>
          <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">📊 <strong>Performance & scale</strong> – Reduced load times by 35%, served 50k+ users</li>
          <li style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">🏢 <strong>Leadership</strong> – Led frontend teams, mentored juniors, Agile delivery</li>
        </ul>
      </div>

      <!-- Referral ask (direct but respectful) -->
      <div style="background: #eff6ff; padding: 20px; border-radius: 20px; margin-bottom: 28px; border-left: 4px solid #2563eb;">
        <p style="font-size: 16px; font-weight: 600; color: #1e3a8a; margin: 0 0 8px 0;">🤝 How you can help (if you're open to it)</p>
        <p style="font-size: 15px; color: #1f2937; margin: 0;">
          I'm actively seeking <strong>Full‑Stack / MERN Lead roles</strong>. If your organisation or any in your network has an opening, 
          a quick <strong>referral or heads‑up</strong> would mean the world to me. I'm happy to share my resume or discuss how I can add value.
        </p>
      </div>

      <!-- Contact & call to action -->
     <div style="text-align: center; margin-bottom: 24px;">
     <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; align-items: center;">
        <a href="tel:+919000133416" style="display: inline-block; background: #059669; color: white; text-decoration: none; padding: 10px 24px; border-radius: 40px; font-weight: 600;">📞 Call me</a>
        <a href="https://portfolio-bheema.vercel.app" style="display: inline-block; background: #1f2937; color: white; text-decoration: none; padding: 10px 24px; border-radius: 40px; font-weight: 600;">🌐 View portfolio</a>
      </div>
      </div>

      <!-- Signature -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
        <p style="font-size: 14px; color: #4b5563; margin: 0;">With gratitude,</p>
        <p style="font-size: 18px; font-weight: 700; color: #059669; margin: 4px 0 0;">Bheemudu Guguloth</p>
        <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">+91 9000133416 / 8309819073  |  bheemudug@gmail.com</p>
        <p style="font-size: 12px; color: #9ca3af; margin-top: 16px;">This is an automated confirmation – feel free to reply directly.</p>
      </div>
    </div>
  `,
        };

        await transporter.sendMail(userMailOptions);

        return Response.json({
            success: true,
            insertedId: result.insertedId,
            message: "Message sent successfully! I'll get back to you soon.",
        });
    } catch (error) {
        console.error("Contact API error:", error);
        return Response.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}