import { StrictMode } from "react";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@ui/components";
import { Pages } from "@ui/pages";

export const App = () => {
  return (
    <StrictMode>
      <SWRConfig>
        <ThemeProvider defaultTheme="light" storageKey="theme">
          <Pages />
        </ThemeProvider>
      </SWRConfig>
    </StrictMode>
  );
};
