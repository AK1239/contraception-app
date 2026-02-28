/**
 * User role constants for personalizing app experience
 */

export type UserRole = "healthcare-provider" | "general-public";

export const USER_ROLE = {
  HEALTHCARE_PROVIDER: "healthcare-provider" as const,
  GENERAL_PUBLIC: "general-public" as const,
} as const;

/** Features hidden for general public */
export const GENERAL_PUBLIC_HIDDEN_FEATURES = {
  NATURAL_METHOD_ELIGIBILITY: "natural-method-eligibility",
  STERILIZATION_ELIGIBILITY: "sterilization-eligibility",
  FEMALE_STERILIZATION: "female-sterilization",
  MALE_STERILIZATION: "male-sterilization",
} as const;

export function isHealthcareProvider(role: UserRole | null | undefined): boolean {
  return role === USER_ROLE.HEALTHCARE_PROVIDER;
}

export function isGeneralPublic(role: UserRole | null | undefined): boolean {
  return role === USER_ROLE.GENERAL_PUBLIC;
}
