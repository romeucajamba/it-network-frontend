import { create } from "zustand";
import { Notification } from "@/types/types";

interface NotificationStore {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  page: number;
  notificationsPerPage: number;
  unreadNotificationsCount: number;
  pages: number;
  paginatedNotifications: Notification[];
  setNotifications: (notifications: Notification[] | ((prev: Notification[]) => Notification[])) => void;
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
  changePage: (page: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  isLoading: false,
  error: null,
  page: 1,
  notificationsPerPage: 7,
  unreadNotificationsCount: 0,
  pages: 1,
  paginatedNotifications: [],

  setNotifications: (notifications) => {
    const currentPage = get().page;
    const notificationsPerPage = get().notificationsPerPage;

    const newNotifications = typeof notifications === "function"
      ? notifications(get().notifications)
      : notifications;

    const unreadCount = newNotifications.filter(msg => msg.leitura === "não lida").length;
    const totalPages = Math.ceil(newNotifications.length / notificationsPerPage);

    // Garante que a página atual nunca seja maior que o total de páginas
    const safePage = Math.min(currentPage, totalPages || 1);

    const paginated = newNotifications.slice(
      (safePage - 1) * notificationsPerPage,
      safePage * notificationsPerPage
    );

    set({
      notifications: newNotifications,
      unreadNotificationsCount: unreadCount,
      pages: totalPages,
      paginatedNotifications: paginated,
      page: safePage,
      isLoading: false,
      error: null,
    });
  },

  markAsRead: (id: number) => {
    get().setNotifications((prev) =>
      prev.map(notification =>
        notification.id_notficacao_entidade === id
          ? { ...notification, leitura: "lida" }
          : notification
      )
    );
  },

  markAllAsRead: () => {
    get().setNotifications((prev) =>
      prev.map(notification => ({
        ...notification,
        leitura: "lida",
      }))
    );
  },

  changePage: (page: number) => {
    const totalPages = get().pages;
    const notificationsPerPage = get().notificationsPerPage;

    if (page >= 1 && page <= totalPages) {
      const paginated = get().notifications.slice(
        (page - 1) * notificationsPerPage,
        page * notificationsPerPage
      );
      set({ page, paginatedNotifications: paginated });
    }
  },
}));