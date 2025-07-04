import { LuCalendarRange, GrHomeOption, FaLaptopCode, BsChat, HiOutlineAcademicCap, PiVideoLight, RiHomeLine } from "@/lib/icons";

export const routes = [
  { id: "home", icon: RiHomeLine, title: "Home", url:"/dashboard" },
  { id: "agenda", icon: LuCalendarRange, title: "Agenda", url:"/gender" },
  { id: "espaço de trabalho", icon: FaLaptopCode, title: "Meus espaço", url:"/workspace" },
  { id: "conversas", icon: BsChat, title: "Conversas", hasNotification: true, url:"/chat" },
  { id: "carreira", icon: HiOutlineAcademicCap, title: "Carreira", url:"/carrer" },
  { id: "ia", icon: GrHomeOption, title: "IA", url:"/ai" },
  { id: "reals", icon: PiVideoLight, title: "reels", url:"/reeals" },
];