
import { Calendar, FileText, MessageSquare, Settings } from "lucide-react";

export const routes = [
  { id: "home", icon: Calendar, title: "Home", url:"/dashboard" },
  { id: "agenda", icon: Calendar, title: "Agenda", url:"/gender" },
  { id: "espaço de trabalho", icon: FileText, title: "Meus espaço", url:"/workspace" },
  { id: "conversas", icon: MessageSquare, title: "Conversas", hasNotification: true, url:"/chat" },
  { id: "carreira", icon: MessageSquare, title: "Carreira", hasNotification: true, url:"/carrer" },
  { id: "perfil", icon: MessageSquare, title: "Perfil", url:"/profile" },
  { id: "definicoes", icon: Settings, title: "Definições", url:"/settings" },
];