import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { AppRouter } from "../app/AppRouter";
import { PROFILE_STORAGE_KEY } from "../data/profile-repository";

function renderApp(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppRouter />
    </MemoryRouter>,
  );
}

function seedOnboardedProfile() {
  const now = new Date().toISOString();
  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify({
      profileId: "test-profile",
      displayName: "Alex",
      onboardingCompleted: true,
      createdAt: now,
      preferences: {
        cuisines: ["Chinese"],
        dietStyles: ["Vegetarian"],
        avoidAllergens: [],
        updatedAt: now,
      },
      healthTargets: {
        dailyCalories: 1900,
        proteinTargetG: 110,
        weeklyBudget: 35,
        maxCookMinutes: 30,
      },
    }),
  );
}

describe("ATDD scaffold acceptance", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("routes a new user to preferences without showing the app navigation", async () => {
    renderApp("/home");

    expect(
      await screen.findByRole("heading", {
        name: /dietary & cultural preferences/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /primary navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("persists preferences and opens home with the primary navigation", async () => {
    const user = userEvent.setup();
    renderApp("/preferences");

    await user.click(screen.getByRole("button", { name: "Chinese" }));
    await user.click(screen.getByRole("button", { name: "Vegetarian" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      await screen.findByRole("heading", {
        name: /personalised meal recommendations/i,
      }),
    ).toBeInTheDocument();

    const navigation = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });
    expect(within(navigation).getByRole("link", { name: "Home" })).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) ?? "{}");
    expect(stored.onboardingCompleted).toBe(true);
    expect(stored.preferences.cuisines).toContain("Chinese");
    expect(stored.preferences.dietStyles).toContain("Vegetarian");
  });

  it("navigates the scaffold modules through the app shell", async () => {
    const user = userEvent.setup();
    renderApp("/preferences");

    await user.click(screen.getByRole("button", { name: "Continue" }));
    const navigation = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });

    await user.click(within(navigation).getByRole("link", { name: "Plan" }));
    expect(
      await screen.findByRole("heading", { name: /practical meal planning/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /open shopping list/i }));
    expect(
      await screen.findByRole("heading", { name: /shopping list/i }),
    ).toBeInTheDocument();

    await user.click(within(navigation).getByRole("link", { name: "Scan" }));
    expect(
      await screen.findByRole("heading", { name: /food scan/i }),
    ).toBeInTheDocument();

    await user.click(within(navigation).getByRole("link", { name: "Nudges" }));
    expect(
      await screen.findByRole("heading", { name: /nudge settings/i }),
    ).toBeInTheDocument();

    await user.click(within(navigation).getByRole("link", { name: "Me" }));
    expect(
      await screen.findByRole("heading", {
        name: /dietary & cultural preferences/i,
      }),
    ).toBeInTheDocument();
  });

  it("opens the F04 nudge preview without the primary navigation", async () => {
    seedOnboardedProfile();
    renderApp("/nudges/preview");

    expect(
      await screen.findByRole("heading", { name: /heading home/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /primary navigation/i }),
    ).not.toBeInTheDocument();
  });
});
