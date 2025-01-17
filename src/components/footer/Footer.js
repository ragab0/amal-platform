import "./Footer.css";
import Link from "next/link";
import CcMasterCardIco from "@/assets/icons/CcMasterCardIco";
import CcPaypalIco from "@/assets/icons/CcPaypalIco";
import CcVisaIco from "@/assets/icons/CcVisaIco";
import FFacebookIco from "@/assets/icons/FFacebookIco";
import FInstaIco from "@/assets/icons/FInstaIco";
import FTwitterIco from "@/assets/icons/FTwitterIco";
import FLinkedinIco from "@/assets/icons/FLinkedinIco";
import LogoIco from "@/assets/icons/LogoIco";
// import CopyrightIco from "@/assets/icons/CopyrightIco";

const footerLinks = [
  { title: "من نحن", href: "/about" },
  { title: "الخدمات", href: "/services" },
  { title: "سياسة الخصوصية", href: "/privacy", notYet: true },
  { title: "الشروط والأحكام", href: "/terms", notYet: true },
];

const contactLinks = [
  { title: "تواصل معنا", href: "/contact", notYet: true },
  { title: "الأسئلة الشائعة FAQ", href: "/faq", notYet: true },
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
          <div className="grid grid-cols-1 max-md:text-center max-md:content-center md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-32">
            {/* First Column */}
            <div className="flex flex-col max-md:items-center">
              <Link href="/" className="mb-8">
                <LogoIco className="text-white" />
              </Link>
              <h3 className="heading-h3 text-white  font-medium mb-8">
                واجهتك لإنشاء سيرتك الذاتية
              </h3>
              <ul className="flex flex-col gap-[30px]">
                {footerLinks.map((link, index) => (
                  <li
                    key={index}
                    className={
                      link.notYet ? "opacity-80 pointer-events-none" : ""
                    }
                  >
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
            <div className="flex flex-col max-md:items-center">
              <h2 className="heading-sub text-white mb-8">التواصــــل</h2>
              <ul className="flex flex-col gap-[30px] mb-12">
                {contactLinks.map((link, index) => (
                  <li
                    key={index}
                    className={
                      link.notYet ? "opacity-80 pointer-events-none" : ""
                    }
                  >
                    <Link
                      href={link.href}
                      className="text-white text-[20px] font-medium hover:text-accent transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="heading-h3 text-white  font-medium mb-8">
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
            <div className="flex flex-col max-md:items-center">
              <h2 className="heading-sub text-white mb-8">وسائــــل الدفع</h2>
              <div className="flex gap-6">
                {paymentIcons.map(({ Icon }, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Icon className="max-sm: w-[70px] h-auto" />
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
          <p className="text-white text-[22px] text-center ">
            <span className="font-bold text-3xl leading-[0] align-middle">
              &copy;
            </span>{" "}
            حقوق النشر محفوظة لدى عمل
          </p>
        </div>
      </div>
      {/* <Link
        href={process.env.CREATED_BY_PORTFOLIO}
        className="container mx-auto block px-4 text-center text-main"
      >
        123
      </Link> */}
    </footer>
  );
}
