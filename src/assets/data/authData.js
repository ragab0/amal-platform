// Define authentication-related paths
export const authRoutes = {
  public: ["/login", "/signup", "/forgotPassword", "/resetPassword"],
  protected: ["/profile", "/cv", "/customize", "/notifications", "/dashboard"],
};

// auth/callback is public here in order to make private call for the server to check auth;
// by the cookie of his request;
