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
        cuisines: ["Chinese", "Indian", "Mediterr."],
        dietStyles: ["Halal", "High-protein"],
        avoidAllergens: ["Nuts", "Shellfish"],
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

describe("ATDD Figma screen acceptance", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the F01 preference screen without simulated device chrome", async () => {
    renderApp("/home");

    expect(
      await screen.findByRole("heading", { name: /what do you love to eat/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("9:41")).not.toBeInTheDocument();
    expect(screen.getByText("2 / 4")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Cuisines" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Diet style" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Avoid & allergies" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mediterr." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "High-protein" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Shellfish" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  it("persists preferences and restores the F02 home design", async () => {
    const user = userEvent.setup();
    renderApp("/preferences");

    await user.click(screen.getByRole("button", { name: "Chinese" }));
    await user.click(screen.getByRole("button", { name: "Halal" }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByRole("heading", { name: /what's on your plate today/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("1,240")).toBeInTheDocument();
    expect(screen.getByText("Mapo Tofu & Brown Rice")).toBeInTheDocument();
    expect(screen.getByText("Halloumi Quinoa Bowl")).toBeInTheDocument();
    expect(screen.getByText("Miso Salmon Rice")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /primary navigation/i }),
    ).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) ?? "{}");
    expect(stored.onboardingCompleted).toBe(true);
    expect(stored.preferences.cuisines).toContain("Chinese");
    expect(stored.preferences.dietStyles).toContain("Halal");
  });

  it("renders the F03 plan and opens the F03b shopping list", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/plan");

    expect(
      await screen.findByRole("heading", { name: /my meal plan/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Spinach & Feta Omelette")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /swap meal/i })).toHaveLength(3);

    await user.click(screen.getByRole("link", { name: /shopping list/i }));
    expect(
      await screen.findByRole("heading", { name: /shopping list/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("£12.40")).toBeInTheDocument();
    expect(screen.getByText("Chicken thighs")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /share list/i })).toBeInTheDocument();
  });

  it("supports the F03b item check-off interaction", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/plan/shopping-list");

    const item = await screen.findByRole("button", { name: /chicken thighs/i });
    await user.click(item);

    expect(item).toHaveClass("done");
    expect(within(item).getByText("✓")).toBeInTheDocument();
  });

  it("renders the F04 proactive suggestion without the tab bar", async () => {
    seedOnboardedProfile();
    renderApp("/nudges/preview");

    expect(await screen.findByText("18:42")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /heading home/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("📍 Leaving the gym")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cook this/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /other ideas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /not now/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /why am i seeing this/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /primary navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the F05 nudge controls and toggles a category", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/nudges/settings");

    expect(
      await screen.findByRole("heading", { name: /nudge settings/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Balanced" })).toHaveClass("on");
    const hydration = screen.getByRole("button", { name: "Hydration reminders" });
    expect(hydration).toHaveAttribute("aria-pressed", "false");
    await user.click(hydration);
    expect(hydration).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Why you got the last nudge")).toBeInTheDocument();
  });

  it("renders F06, updates the portion and logs the meal", async () => {
    const user = userEvent.setup();
    seedOnboardedProfile();
    renderApp("/scan");

    expect(await screen.findByText("Scan food")).toBeInTheDocument();
    expect(screen.getByText("Beef Noodle Soup")).toBeInTheDocument();
    expect(screen.getByText("92% match")).toBeInTheDocument();
    expect(screen.getByLabelText("Estimated calories")).toHaveTextContent("610");
    expect(screen.getByLabelText("Portion quantity")).toHaveTextContent("1");
    expect(
      screen.queryByRole("navigation", { name: /primary navigation/i }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /increase portion/i }));
    expect(screen.getByLabelText("Estimated calories")).toHaveTextContent("1,220");
    expect(screen.getByText("68 g")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /log to dinner/i }));
    expect(
      await screen.findByRole("heading", { name: /what's on your plate today/i }),
    ).toBeInTheDocument();
  });
});
