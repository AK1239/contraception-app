import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { UserRole } from "../constants/userRole";
import { isHealthcareProvider } from "../constants/userRole";

/**
 * Returns the current user role.
 * Legacy users (role null) are treated as healthcare-provider for backward compatibility.
 */
export function useUserRole(): UserRole {
  const role = useSelector((state: RootState) => state.userRole?.role);
  return role ?? "healthcare-provider";
}

/**
 * Returns true if user has full (healthcare provider) access.
 */
export function useIsHealthcareProvider(): boolean {
  const role = useUserRole();
  return isHealthcareProvider(role);
}
