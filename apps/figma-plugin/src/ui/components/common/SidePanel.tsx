import { forwardRef } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPalette } from "@fortawesome/free-solid-svg-icons/faPalette";
import { faFont } from "@fortawesome/free-solid-svg-icons/faFont";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons/faWandMagicSparkles";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBoolean } from "@ui/hooks";
import {
  ResizablePanel,
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupItemProps,
} from "..";
import { cn } from "@ui/utils";
import { Link } from "react-router-dom";

export type SideTab = "color" | "text" | "effect" | "etc";

export type SidePanelButtonProps = {
  isCollapse?: boolean;
  icon?: IconProp;
} & ToggleGroupItemProps;

export const SidePanelButton = forwardRef<
  HTMLButtonElement,
  SidePanelButtonProps
>(({ isCollapse, icon, children, ...props }, ref) => {
  return (
    <ToggleGroupItem
      {...props}
      ref={ref}
      className={cn("w-full text-left overflow-hidden", {
        "flex justify-start gap-2": !isCollapse,
      })}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {!isCollapse && children}
    </ToggleGroupItem>
  );
});

export const SidePanel = () => {
  const [isCollapsePanel, setIsCollapsePanel] = useBoolean(false);

  return (
    <ResizablePanel
      defaultSize={20}
      minSize={20}
      maxSize={20}
      collapsible
      collapsedSize={3}
      className="py-4 px-2"
      onCollapse={setIsCollapsePanel.on}
      onExpand={setIsCollapsePanel.off}
    >
      <ToggleGroup
        type="single"
        className="flex-col justify-start items-center gap-2 w-full"
        defaultValue="color"
      >
        <Link className="w-full" to="/color">
          <SidePanelButton
            value="color"
            icon={faPalette}
            isCollapse={isCollapsePanel}
          >
            Color Tokens
          </SidePanelButton>
        </Link>
        <Link className="w-full" to="/text">
          <SidePanelButton
            value="text"
            icon={faFont}
            isCollapse={isCollapsePanel}
          >
            Text Tokens
          </SidePanelButton>
        </Link>
        <Link className="w-full" to="/effect">
          <SidePanelButton
            value="effect"
            icon={faWandMagicSparkles}
            isCollapse={isCollapsePanel}
          >
            Effect Tokens
          </SidePanelButton>
        </Link>
        <Link className="w-full" to="/etc">
          <SidePanelButton
            value="etc"
            icon={faEllipsis}
            isCollapse={isCollapsePanel}
          >
            Etc Tokens
          </SidePanelButton>
        </Link>
      </ToggleGroup>
    </ResizablePanel>
  );
};
