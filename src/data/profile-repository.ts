import type {
  DietaryPreferencesInput,
  Profile,
} from "../domain/profile";

export const PROFILE_STORAGE_KEY = "nutripal.v1.profile";

function createProfile(): Profile {
  const now = new Date().toISOString();

  return {
    profileId: crypto.randomUUID(),
    displayName: "Alex",
    onboardingCompleted: false,
    createdAt: now,
    preferences: {
      cuisines: [],
      dietStyles: [],
      avoidAllergens: [],
      updatedAt: now,
    },
    healthTargets: {
      dailyCalories: 1900,
      proteinTargetG: 110,
      weeklyBudget: 35,
      maxCookMinutes: 30,
    },
  };
}

function isProfile(value: unknown): value is Profile {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Profile>;

  return (
    typeof candidate.profileId === "string" &&
    typeof candidate.onboardingCompleted === "boolean" &&
    typeof candidate.preferences === "object" &&
    Array.isArray(candidate.preferences?.cuisines)
  );
}

export function readProfile(): Profile {
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (stored) {
    try {
      const parsed: unknown = JSON.parse(stored);
      if (isProfile(parsed)) return parsed;
    } catch {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }

  const profile = createProfile();
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

export function savePreferences(
  profile: Profile,
  preferences: DietaryPreferencesInput,
): Profile {
  const updated: Profile = {
    ...profile,
    onboardingCompleted: true,
    preferences: {
      ...preferences,
      updatedAt: new Date().toISOString(),
    },
  };

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
