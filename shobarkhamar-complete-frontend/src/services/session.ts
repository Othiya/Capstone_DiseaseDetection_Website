// Clear only account/session data; preserve language and other preferences.
export function clearSession() {
  ["isLoggedIn", "authToken", "refreshToken", "userName", "userEmail", "userId"]
    .forEach((key) => localStorage.removeItem(key));
}
