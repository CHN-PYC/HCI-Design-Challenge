import { createContext, useContext } from "react";
import type { DietaryPreferencesInput, Profile } from "../domain/profile";

export interface ProfileContextValue {
  profile: Profile;
  savePreferences: (preferences: DietaryPreferencesInput) => void;
}

export const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfile(): ProfileContextValue {
  const value = useContext(ProfileContext);

  if (!value) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return value;
}
