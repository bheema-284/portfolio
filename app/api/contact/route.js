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
                pass: process.env.EMAIL_PASS,
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
            from: `"Bheemudu Guguloth" <${process.env.EMAIL_USER}>`,
            to: value.email,
            subject: `Thank you for reaching out, ${value.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 16px; line-height: 1.6;">
                    <h2 style="color: #16a34a;">Hello ${value.name},</h2>
                    <p>Thank you for taking the time to contact me – I truly appreciate it.</p>
                    
                    <p>I'm currently exploring new opportunities as a <strong>MERN Stack / Frontend Developer</strong> with 4+ years of experience.</p>
                    
                    <div style="background: #e6f7ff; padding: 16px; border-radius: 12px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 16px;"><strong>📢 Quick request:</strong></p>
                        <p style="margin: 8px 0 0;">If you come across any <strong>relevant openings</strong> in your organization or network, would you mind letting me know? A referral or a simple heads-up would be incredibly helpful.</p>
                    </div>

                    <p><strong>My core skills:</strong></p>
                    <ul>
                        <li>✅ React.js, Next.js, React Native, Node.js, MongoDB</li>
                        <li>✅ OTT platforms, Real Estate portals, CRM/CMS</li>
                        <li>✅ Problem solving, team collaboration, performance optimization</li>
                    </ul>

                    <p>Feel free to reply to this email or reach me at <strong>+91-9000133416</strong> (WhatsApp).</p>

                    <p>Thank you again for your support – I look forward to staying in touch.</p>
                    <p>Best regards,<br/>
                    <strong>Bheemudu Guguloth</strong><br/>
                    📞 9000133416 / 8309819073<br/>
                    ✉️ bheemudug@gmail.com<br/>
                    🔗 <a href="https://portfolio-bheema.vercel.app">portfolio-bheema.vercel.app</a></p>
                    <hr/>
                    <p style="font-size: 12px; color: #6b7280;">This is an automated confirmation. Feel free to reply directly.</p>
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
        return Response.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
    }
}