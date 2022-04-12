import { acceptHMRUpdate, defineStore } from "pinia";

import { User, Token } from "@/@types";
import { useMapStore } from "@stores/map";

type State = {
  user: User;
  token: Token;
  keepOnline: boolean;
  credentialGoogleToken: string;
  credentialFacebookToken: string;
  expired: boolean;
};

export const useAuthStore = defineStore("auth", {
  persist: {
    enabled: true,
  },
  state: (): State => ({
    user: {
      _id: "",
      email: "",
      name: "",
      role: [],
    },
    token: {
      accessToken: "",
      iat: 0,
      exp: 0,
    },
    keepOnline: false,
    credentialGoogleToken: "",
    credentialFacebookToken: "",
    expired: false,
  }),

  actions: {
    setExpired(data: boolean) {
      this.expired = data;
    },
    setData(data: any) {
      this.user = data.user;
      this.token = data.token;
    },
    setKeepOnline(keepOnline: boolean) {
      this.keepOnline = keepOnline;
    },

    setDataSocialGoogle(data: any) {
      this.token.accessToken = data;
      this.token.iat = 0;
      this.token.exp = 0;
    },

    setDataSocialFacebook(data: any) {
      this.token.accessToken = data;
      this.token.iat = 0;
      this.token.exp = 0;
    },

    setCredentialGoogleToken(data: string) {
      this.credentialFacebookToken = "";
      this.credentialGoogleToken = data;
    },

    setCredentialFacebookToken(data: string) {
      this.credentialGoogleToken = "";
      this.credentialFacebookToken = data;
    },

    verifyExp(exp: number, intervalFn: any) {
      const mapStore = useMapStore();
      const now = new Date().getTime() / 1000;
      if (exp < now && !this.keepOnline) {
        clearInterval(intervalFn);
        mapStore.setIsDisabledMap(false);
      }
    },

    clearStore() {
      this.setKeepOnline(false);
      const gapi = window.gapi;
      const fb = window.FB;

      if (gapi) {
        let auth2 = gapi.auth2.getAuthInstance();
        if (auth2) {
          auth2.signOut().then(function () {});
          auth2.disconnect();
        }
      }

      if (fb.getUserID()) {
        fb.logout();
      }

      this.user = {
        _id: "",
        email: "",
        name: "",
        role: [],
      };

      this.token = {
        accessToken: "",
        iat: 0,
        exp: 0,
      };

      this.credentialGoogleToken = "";
      this.credentialFacebookToken = "";
      this.setExpired(true);

      setTimeout(() => {
        this.setExpired(false);
      }, 400);
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
