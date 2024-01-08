import { StrictMode } from "react";
import { SWRConfig } from "swr";
import { Router } from "./router";

function App() {
  return (
    <StrictMode>
      <SWRConfig>
        <Router />
      </SWRConfig>
    </StrictMode>
  );
}

export default App;
