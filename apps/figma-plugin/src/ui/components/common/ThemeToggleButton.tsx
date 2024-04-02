import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { Button, useTheme } from "..";

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const toggledTheme = theme === "dark" ? "light" : "dark";
    setTheme(toggledTheme);
  };
  return (
    <Button onClick={handleToggleTheme} size="icon" variant="outline">
      <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
    </Button>
  );
};
