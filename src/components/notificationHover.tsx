"use client"
//Componentes
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
//icones e imagens
import { GoBell } from "@/lib/icons";
//Bibliotecas
import { format } from 'date-fns';
//Hooks
import { useNotificationStore } from "@/hooks/useNotifications";

export function NotificationsHover() {
    const { notifications, isLoading, error, unreadNotificationsCount } = useNotificationStore();

    const totalNotificationsUnread =  notifications.filter(msg => msg.leitura === "não lida");

    return (
        <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
                <Button className="size-8  cursor-pointer bg-transparent hover:bg-transparent text-white shadow-none">
                    <GoBell className="size-6"/>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="space-y-6 w-60 bg-slate-800">
                <div className="flex justify-between">
                    <h2 className="text-gray-100 font-semibold text-base">
                        Notificações ({unreadNotificationsCount})
                    </h2>
                </div>

                <div className="flex flex-col space-y-4">
                    {isLoading ? (
                        <p className="text-gray-100">Carregando notificações...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : notifications.length === 0 ? (
                        <p className="text-gray-100">Nenhuma notificação disponível.</p>
                    ) : (
                        totalNotificationsUnread.slice(0, 4).map((notification) => (
                            <div
                                key={notification.id_notficacao_entidade}
                                className="border-[2px] border-[#EDEFF6] flex space-x-5 border-l-8 rounded-[12px]"
                                style={{ borderLeftColor: "#20C06B" }}
                            >
                                <div className="space-y-1 flex flex-col pt-3 pl-3 pb-4">
                                    <span className="text-gray-100 font-semibold text-sm">
                                        {notification.descricao_notificado}
                                    </span>
                                    <span className="text-gray-100 font-normal text-xs">
                                        {format(new Date(notification.data_notificada), 'dd/MM/yyyy HH:mm:ss')}
                                    </span>
                                </div>
                                <div className="pt-3">
                                    <span className="text-[#969696] text-xs mr-2">
                                        {new Date(notification.data_notificada).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}