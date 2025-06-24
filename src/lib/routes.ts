
import { Calendar, FileText, MessageSquare, Settings } from "lucide-react";

export const routes = [
  { id: "agenda", icon: Calendar, title: "Agenda", url:"/gender" },
  { id: "pratica", icon: FileText, title: "Meus espaço", url:"/workspace" },
  { id: "guia", icon: FileText, title: "Guia", url:"/guide" },
  { id: "conversas", icon: MessageSquare, title: "Conversas", hasNotification: true, url:"/message" },
  { id: "definicoes", icon: Settings, title: "Definições", url:"/settings" },
];