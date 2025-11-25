import { defineStore } from "pinia";

interface LoginResponse {
  ok: boolean;
  message?: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: null as Record<string, any> | null,
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials: { username: string; password: string }): Promise<LoginResponse> {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();

        if (!res.ok) {
          this.error = data.message || "Invalid username or password";
          return { ok: false };
        }

        this.token = data.token;
        this.user = data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));

        return { ok: true };
      } catch (err: any) {
        this.error = err.message || "Login failed";
        return { ok: false};
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    
    loadFromStorage() {
      const t = localStorage.getItem("token");
      const u = localStorage.getItem("user");
      if (t) this.token = t;
      if (u) this.user = JSON.parse(u);
    },
  },
});
