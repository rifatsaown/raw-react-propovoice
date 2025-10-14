import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paintbrush } from "lucide-react";

type ThemeColor = {
  name: string;
  value: string;
  hsl: string;
};

const themeColors: ThemeColor[] = [
  { name: "Blue", value: "#1E9EFF", hsl: "206, 100%, 56%" },
  { name: "Purple", value: "#7C3AED", hsl: "263, 83%, 58%" },
  { name: "Green", value: "#047857", hsl: "162, 94%, 24%" },
  { name: "Teal", value: "#0D9488", hsl: "175, 84%, 32%" },
  { name: "Violet", value: "#6B21A8", hsl: "277, 68%, 39%" },
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeColor>(themeColors[0]);

  const setThemeColor = (theme: ThemeColor) => {
    // Update CSS variable
    document.documentElement.style.setProperty("--primary", theme.hsl);
    
    // Save to localStorage
    localStorage.setItem("theme-color", JSON.stringify(theme));
    
    // Update state
    setCurrentTheme(theme);
  };

  // Load saved theme on component mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme-color");
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme) as ThemeColor;
        setCurrentTheme(parsedTheme);
        document.documentElement.style.setProperty("--primary", parsedTheme.hsl);
      } catch (e) {
        console.error("Failed to parse saved theme", e);
      }
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeColors.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setThemeColor(theme)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: theme.value }}
            />
            <span>{theme.name}</span>
            {currentTheme.value === theme.value && (
              <span className="ml-auto font-bold">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}