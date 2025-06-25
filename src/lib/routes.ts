import { Settings, LuCalendarRange, GrHomeOption, CiUser, FaLaptopCode, BsChat, HiOutlineAcademicCap, IoIosNotificationsOutline } from "@/lib/icons";

export const routes = [
  { id: "home", icon: GrHomeOption, title: "Home", url:"/dashboard" },
  { id: "agenda", icon: LuCalendarRange, title: "Agenda", url:"/gender" },
  { id: "espaço de trabalho", icon: FaLaptopCode, title: "Meus espaço", url:"/workspace" },
  { id: "conversas", icon: BsChat, title: "Conversas", hasNotification: true, url:"/chat" },
  { id: "carreira", icon: HiOutlineAcademicCap, title: "Carreira", url:"/carrer" },
  { id: "perfil", icon: CiUser, title: "Perfil", url:"/profile" },
  {id: 'notificacoes', icon:IoIosNotificationsOutline, title: 'Notificações', url: "/notifications"},
  { id: "definicoes", icon: Settings, title: "Definições", url:"/settings" },
];