import { Outlet } from "react-router-dom";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  SidePanel,
} from "@ui/components";

export const PageLayout = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <SidePanel />
      <ResizableHandle withHandle />
      <ResizablePanel>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
