export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

export function isAdmin() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("role") === "admin";
}
