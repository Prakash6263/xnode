// Utility functions for authentication
export const authUtils = {
  // Get stored user data
  getStoredUser: () => {
    const sessionUser = sessionStorage.getItem("adminUser");
    const localUser = localStorage.getItem("adminUser");

    if (sessionUser) {
      return JSON.parse(sessionUser);
    }
    if (localUser) {
      return JSON.parse(localUser);
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return authUtils.getStoredUser() !== null;
  },

  // Logout user
  logout: () => {
    sessionStorage.removeItem("adminUser");
    localStorage.removeItem("adminUser");
  },

  // Get user email
  getUserEmail: () => {
    const user = authUtils.getStoredUser();
    return user && user.admin ? user.admin.email : null;
  },

  // Get user ID
  getUserId: () => {
    const user = authUtils.getStoredUser();
    return user && user.admin ? user.admin.id : null;
  },

  // ✅ Get auth token (NEW)
  getToken: () => {
    const user = authUtils.getStoredUser();
    return user ? user.token : null;
  },
};
