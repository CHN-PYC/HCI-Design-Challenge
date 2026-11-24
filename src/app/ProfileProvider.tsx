import { useState, type PropsWithChildren } from "react";
import type { DietaryPreferencesInput } from "../domain/profile";
import {
  readProfile,
  savePreferences as persistPreferences,
} from "../data/profile-repository";
import { ProfileContext } from "./profile-context";

export function ProfileProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState(readProfile);

  function savePreferences(preferences: DietaryPreferencesInput) {
    setProfile((current) => persistPreferences(current, preferences));
  }

  return (
    <ProfileContext.Provider value={{ profile, savePreferences }}>
      {children}
    </ProfileContext.Provider>
  );
}
