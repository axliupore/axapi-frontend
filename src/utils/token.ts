interface Token {
  setToken(token: string): void;

  getToken(): string | null;

  clearToken(): void;
}

const token: Token = {
  setToken(token: string) {
    localStorage.setItem("a-token", token);
  },
  getToken(): string | null {
    return localStorage.getItem("a-token") || "";
  },
  clearToken() {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie =
      "a-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
};

export default token;
