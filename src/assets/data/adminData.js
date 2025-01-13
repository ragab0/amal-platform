import { HiUsers, HiOfficeBuilding, HiStar, HiHome } from "react-icons/hi";

export const navItems = [
  {
    href: "/admin",
    icon: HiHome,
    label: "لوحة التحكم",
  },
  {
    href: "/admin/users",
    icon: HiUsers,
    label: "المستخدمين",
  },
  {
    href: "/admin/jobs",
    icon: HiOfficeBuilding,
    label: "الوظائف",
  },
  // {
  //   href: "/admin/reviews",
  //   icon: HiStar,
  //   label: "التقييمات",
  // },
];
