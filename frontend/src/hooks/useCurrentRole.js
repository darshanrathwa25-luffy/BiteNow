import { useUser } from "@clerk/clerk-react";

export function useCurrentRole() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return { role: null, isLoaded, isSignedIn };
  if (!isSignedIn) return { role: null, isLoaded, isSignedIn };

  // Extract role from public metadata
  const role = user?.publicMetadata?.role || null;
  
  return { role, isLoaded, isSignedIn };
}
