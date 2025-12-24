export const getProErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/configuration-not-found":
      return "Authentication service is currently misconfigured. Please verify your environment settings.";
    case "auth/invalid-credential":
      return "The credentials provided are incorrect. Please try again or reset your password.";
    case "auth/email-already-in-use":
      return "This email is already associated with an account. Try signing in instead.";
    case "auth/weak-password":
      return "For your security, your password must be at least 6 characters long.";
    case "auth/user-not-found":
      return "We couldn't find an account with that email address.";
    case "auth/network-request-failed":
      return "A connection error occurred. Please check your internet and try again.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily disabled due to many failed login attempts.";
    default:
      return "An unexpected error occurred within our security layer. Please try again later.";
  }
};