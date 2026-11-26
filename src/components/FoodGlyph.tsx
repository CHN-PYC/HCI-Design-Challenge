import {
  Apple,
  Bean,
  CakeSlice,
  Carrot,
  Cheese,
  Cherry,
  Citrus,
  Container,
  CookingPot,
  Croissant,
  Donut,
  Drumstick,
  Egg,
  Fish,
  Leaf,
  Nut,
  Pizza,
  Salad,
  Sandwich,
  Soup,
  UtensilsCrossed,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import type { FoodGlyphName } from "../domain/food-glyph";

export type { FoodGlyphName };

const glyphs: Record<FoodGlyphName, LucideIcon> = {
  apple: Apple,
  beans: Bean,
  beef: Drumstick,
  berries: Cherry,
  bowl: Soup,
  carrot: Carrot,
  cheese: Cheese,
  chicken: Drumstick,
  citrus: Citrus,
  curry: CookingPot,
  egg: Egg,
  fish: Fish,
  grain: Wheat,
  leaf: Leaf,
  noodles: Soup,
  onion: Leaf,
  pancake: Donut,
  pasta: UtensilsCrossed,
  pie: CakeSlice,
  pizza: Pizza,
  rice: Wheat,
  salad: Salad,
  sauce: Container,
  stew: CookingPot,
  sushi: Fish,
  taco: Sandwich,
  tomato: Cherry,
  wrap: Croissant,
  yogurt: Nut,
};

export function FoodGlyph({
  className,
  name,
  size = 24,
}: {
  className?: string;
  name: FoodGlyphName;
  size?: number;
}) {
  const Icon = glyphs[name];
  return (
    <Icon
      aria-hidden="true"
      className={className}
      size={size}
      strokeWidth={1.7}
    />
  );
}
