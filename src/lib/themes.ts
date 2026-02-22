export type ThemeId = "lover" | "midnights" | "folklore" | "reputation" | "1989";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  swatch: [string, string, string];
}

export const TAYLOR_THEMES: ThemeOption[] = [
  {
    id: "lover",
    name: "Lover",
    tagline: "Pastel daydreams with cotton candy skies.",
    swatch: ["#ffd9ec", "#f8b4d9", "#b8c9ff"],
  },
  {
    id: "midnights",
    name: "Midnights",
    tagline: "Deep midnight blues with a hint of starlight.",
    swatch: ["#0f172a", "#1d2671", "#7c5cff"],
  },
  {
    id: "folklore",
    name: "Folklore",
    tagline: "Warm woods and linen-washed neutrals.",
    swatch: ["#f1ede2", "#d7cec2", "#9a8874"],
  },
  {
    id: "reputation",
    name: "Reputation",
    tagline: "Chromatic noir with metallic edge.",
    swatch: ["#1a1a1a", "#2e2e2e", "#f5f5f5"],
  },
  {
    id: "1989",
    name: "1989",
    tagline: "Polaroid breezes and sun-faded blues.",
    swatch: ["#d8ecff", "#ffe4d9", "#6fa8ff"],
  },
];
