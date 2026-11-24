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
      await screen.findByRole("heading", { name: /my meal plan/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /shopping list/i }));
    expect(
      await screen.findByRole("heading", { name: /shopping list/i }),
    ).toBeInTheDocument();

    await user.click(within(navigation).getByRole("link", { name: "Scan" }));
    expect(await screen.findByText("Beef Noodle Soup")).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /primary navigation/i }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close food scan/i }));
    const homeNavigation = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });

    await user.click(
      within(homeNavigation).getByRole("link", { name: "Nudges" }),
    );
    expect(
      await screen.findByRole("heading", { name: /nudge settings/i }),
    ).toBeInTheDocument();

    const nudgesNavigation = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });
    await user.click(
      within(nudgesNavigation).getByRole("link", { name: "Me" }),
    );
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

  it("renders the selected F03 Figma meal-plan content", async () => {
    seedOnboardedProfile();
    renderApp("/plan");

    expect(
      await screen.findByRole("heading", { name: /my meal plan/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Week of 23 Nov")).toBeInTheDocument();
    expect(screen.getByText("↻ Regenerate")).toBeInTheDocument();

    for (const day of ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]) {
      expect(screen.getByRole("button", { name: new RegExp(day) })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: /Tue/ })).toHaveClass("on");

    for (const text of ["💷 £35/wk", "⏱ ≤ 30 min", "🧊 6 items"] ) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    for (const item of ["🥚 Eggs", "🥬 Spinach", "🍚 Rice", "🍗 Chicken", "🍅 Tomato"]) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    for (const meal of [
      "Spinach & Feta Omelette",
      "Chicken Rice Bowl",
      "Tomato Egg Stir-fry",
    ]) {
      expect(screen.getByText(meal)).toBeInTheDocument();
    }
    expect(screen.getAllByRole("button", { name: /swap meal/i })).toHaveLength(3);
    expect(
      screen.getByRole("link", { name: /shopping list/i }),
    ).toHaveAttribute("href", "/plan/shopping-list");
  });

  it("renders the selected F06 scan result and updates the portion", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/scan");

    expect(await screen.findByText("Scan food")).toBeInTheDocument();
    expect(screen.getByText("Beef Noodle Soup")).toBeInTheDocument();
    expect(screen.getByText("92% match")).toBeInTheDocument();
    expect(screen.getByLabelText("Estimated calories")).toHaveTextContent("610");
    expect(screen.getByLabelText("Portion quantity")).toHaveTextContent("1");
    expect(screen.queryByRole("navigation", { name: /primary navigation/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /increase portion/i }));
    expect(screen.getByLabelText("Estimated calories")).toHaveTextContent("1,220");
    expect(screen.getByText("68 g")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /log to dinner/i }));
    expect(
      await screen.findByRole("heading", {
        name: /personalised meal recommendations/i,
      }),
    ).toBeInTheDocument();
  });
});
