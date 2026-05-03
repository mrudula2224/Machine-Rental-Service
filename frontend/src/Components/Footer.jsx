import React from "react";

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer {
            background: #020617;
            color: #e2e8f0;
            text-align: center;
            padding: 20px;
            margin-top: 40px;
          }

          .footer a {
            color: #38bdf8;
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="footer">
        <p>Have questions or need help? Reach out to us 👇</p>
        <p>📞 <a href="tel:+917324065700">+91 7324065700</a></p>
        <p>📧 <a href="mailto:rentalservice@gmail.com">rentalservice@gmail.com</a></p>
        <p>© 2026 Machine Rental Service</p>
      </div>
    </>
  );
};

export default Footer;