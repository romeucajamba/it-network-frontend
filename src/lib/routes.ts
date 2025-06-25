
import { Settings } from "lucide-react";
import { HiAcademicCap } from "react-icons/hi2";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { LuCalendarRange } from "react-icons/lu";
import { GrHomeOption } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { FaLaptopCode } from "react-icons/fa";





export const routes = [
  { id: "home", icon: GrHomeOption, title: "Home", url:"/dashboard" },
  { id: "agenda", icon: LuCalendarRange, title: "Agenda", url:"/gender" },
  { id: "espaço de trabalho", icon: FaLaptopCode, title: "Meus espaço", url:"/workspace" },
  { id: "conversas", icon: HiChatBubbleOvalLeft, title: "Conversas", hasNotification: true, url:"/chat" },
  { id: "carreira", icon: HiAcademicCap, title: "Carreira", url:"/carrer" },
  { id: "perfil", icon: CiUser, title: "Perfil", url:"/profile" },
  { id: "definicoes", icon: Settings, title: "Definições", url:"/settings" },
];