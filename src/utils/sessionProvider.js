// SessionProvider.js
import { useSession } from "next-auth/react";

const useCustomSession = () => {
  const session = useSession();

  if (session.status === "loading") {
    return { loading: true, isAuthenticated: false, session: null };
  }

  if (session.status === "unauthenticated") {
    return { loading: false, isAuthenticated: false, session: null };
  }

  return { loading: false, isAuthenticated: true, session: session };
};

export default useCustomSession;
