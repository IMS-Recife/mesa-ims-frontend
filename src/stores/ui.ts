import { acceptHMRUpdate, defineStore } from "pinia";

const TIME_TOGGLE = 600;

type State = {
  openMoadals: string[];
  dataChangeComponent: string[];
  isLoading: boolean;
  snackbar: {
    isOpen: boolean;
    message?: string;
    title?: string;
    type?: "info" | "error" | "success" | "default";
  };
  sidebarCollapsed: boolean;
  searchInputOpen: boolean;
  notificationsTabOpen: boolean;
  unreadNotifications: Object[];
  sidebarVision: boolean;
  preConfigSidebarVision: boolean;
  infoPopupLayer: boolean;
};

export const useUIStore = defineStore("ui", {
  state: (): State => ({
    openMoadals: [],
    isLoading: false,
    dataChangeComponent: [],
    snackbar: {
      isOpen: false,
      title: "",
      message: "",
      type: "default",
    },
    searchInputOpen: false,
    sidebarCollapsed: false,
    notificationsTabOpen: false,
    unreadNotifications: [],
    sidebarVision: false,
    preConfigSidebarVision: false,
    infoPopupLayer: false,
  }),
  actions: {
    toggleModal(modal: string) {
      this.openMoadals = this.openMoadals.includes(modal)
        ? this.openMoadals.filter((element) => element !== modal)
        : [...this.openMoadals, modal];
    },
    toggleLoading(loading: boolean) {
      const toggle = loading ?? !this.isLoading;

      if (!toggle) {
        return setTimeout(() => {
          this.isLoading = toggle;
        }, TIME_TOGGLE);
      }
      this.isLoading = toggle;
    },
    changeComponent(name: string) {
      this.dataChangeComponent = [...this.dataChangeComponent, name];
    },
    clearChangeComponent() {
      this.dataChangeComponent = [];
    },
    setSnackbar(
      isOpen: boolean,
      title?: string,
      message?: string,
      type: "success" | "error" | "info" | "default" = "default"
    ) {
      this.snackbar = {
        isOpen,
        message,
        type,
        title,
      };
    },
    collapseSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    toggleSearchInput() {
      if (this.notificationsTabOpen && !this.searchInputOpen) {
        this.notificationsTabOpen = false;
      }
      this.searchInputOpen = !this.searchInputOpen;
    },
    toggleNotificationsTab() {
      if (this.searchInputOpen && !this.notificationsTabOpen) {
        this.searchInputOpen = false;
      }
      this.notificationsTabOpen = !this.notificationsTabOpen;
    },
    setUnreadNotifications(notifications: Object[]) {
      this.unreadNotifications = notifications;
    },
    toggleSidebarVision(payload: boolean) {
      this.sidebarVision = payload;
    },
    togglePreConfigSidebarVision(payload: boolean) {
      this.preConfigSidebarVision = payload;
    },
    toggleInfoPopupLayer(payload: boolean) {
      this.infoPopupLayer = payload;
    },
  },
  getters: {
    isInfoPopupLayer: (state) => state.infoPopupLayer,
    isModalOpen: (state) => (modal: string) =>
      state.openMoadals.includes(modal),
    isSidebarCollapsed: (state) => state.sidebarCollapsed,
    isSearchInputOpen: (state) => state.searchInputOpen,
    isNotificationsTabOpen: (state) => state.notificationsTabOpen,
    unreadNotifications: (state) => state.unreadNotifications,
    isSidebarVision: (state) => state.sidebarVision,
    isPreConfigVision: (state) => state.preConfigSidebarVision,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
