export interface DietaryPreferences {
  cuisines: string[];
  dietStyles: string[];
  avoidAllergens: string[];
  updatedAt: string;
}

export interface HealthTargets {
  dailyCalories: number;
  proteinTargetG: number;
  carbsTargetG?: number;
  fatTargetG?: number;
  weeklyBudget: number;
  maxCookMinutes: number;
}

export interface Profile {
  profileId: string;
  displayName: string;
  onboardingCompleted: boolean;
  createdAt: string;
  preferences: DietaryPreferences;
  healthTargets: HealthTargets;
}

export interface DietaryPreferencesInput {
  cuisines: string[];
  dietStyles: string[];
  avoidAllergens: string[];
}
