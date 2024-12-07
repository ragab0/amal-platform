import Link from "next/link";
import CcMasterCardIco from "@/assets/icons/CcMasterCardIco";
import CcPaypalIco from "@/assets/icons/CcPaypalIco";
import CcVisaIco from "@/assets/icons/CcVisaIco";
import FFacebookIco from "@/assets/icons/FFacebookIco";
import FInstaIco from "@/assets/icons/FInstaIco";
import FTwitterIco from "@/assets/icons/FTwitterIco";
import FLinkedinIco from "@/assets/icons/FLinkedinIco";
import CopyrightIco from "@/assets/icons/CopyrightIco";
import LogoIco from "@/assets/icons/LogoIco";

const footerLinks = [
  { title: "من نحن", href: "/about" },
  { title: "الخدمات", href: "/services" },
  { title: "سياسة الخصوصية", href: "/privacy" },
  { title: "الشروط والأحكام", href: "/terms" },
];

const contactLinks = [
  { title: "تواصل معنا", href: "/contact" },
  { title: "الأسئلة الشائعة FAQ", href: "/faq" },
];

const socialIcons = [
  { Icon: FTwitterIco, href: "#" },
  { Icon: FLinkedinIco, href: "#" },
  { Icon: FInstaIco, href: "#" },
  { Icon: FFacebookIco, href: "#" },
];

const paymentIcons = [
  { Icon: CcMasterCardIco },
  { Icon: CcPaypalIco },
  { Icon: CcVisaIco },
];

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-second pt-16 pb-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First Column */}
            <div className="flex flex-col">
              <div className="w-[151px] h-[150px] mb-8">
                <LogoIco className="text-white" />
              </div>
              <h3 className="text-white text-[22px] font-medium mb-8">
                واجهتك لإنشاء سيرتك الذاتية
              </h3>
              <ul className="flex flex-col gap-[30px]">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white text-[20px] font-medium hover:text-accent transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second Column */}
            <div className="flex flex-col">
              <h2 className="text-white text-[40px] font-bold mb-8">
                التواصــــل
              </h2>
              <ul className="flex flex-col gap-[30px] mb-12">
                {contactLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white text-[20px] font-medium hover:text-accent transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="text-white text-[24px] font-medium mb-8">
                تابعنا على منصات التواصل الاجتماعي
              </h3>
              <div className="flex gap-4">
                {socialIcons.map(({ Icon, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="text-white hover:text-accent transition-colors"
                  >
                    <Icon className="w-10 h-10" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Third Column */}
            <div className="flex flex-col">
              <h2 className="text-white text-[40px] font-bold mb-8">
                وسائــــل الدفع
              </h2>
              <div className="flex gap-6">
                {paymentIcons.map(({ Icon }, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Icon />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-main py-5">
        <div className="container mx-auto px-4">
          <p className="text-white text-[22px] text-center flex items-center justify-center gap-2">
            <CopyrightIco />
            حقوق النشر محفوظة لدى عمل
          </p>
        </div>
      </div>
    </footer>
  );
}
