import { ReactNode } from "react";
import {
  ComboBox,
  ComboBoxOption,
  Header,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  SidePanelButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToggleGroup,
} from "..";
import { useVariablesCollection } from "@ui/hooks";

export type VariableAndStyleTokensPageLayoutProps = {
  title: string;
  collectionKey: string;
  placeholder?: {
    emptyGroups?: string;
  };
  filterSelectCollectionVariable?: (variable: Variable) => boolean;
  renderVariableTab?: () => ReactNode;
  renderStyleTab?: () => ReactNode;
};

export const VariableAndStyleTokensPageLayout = ({
  title,
  collectionKey,
  placeholder,
  filterSelectCollectionVariable,
  renderVariableTab,
  renderStyleTab,
}: VariableAndStyleTokensPageLayoutProps) => {
  const { collections, selectedCollection, selectCollection, selectGroup } =
    useVariablesCollection(collectionKey, filterSelectCollectionVariable);

  const collectionComboBoxOptions: ComboBoxOption[] = collections
    .map((collection) => ({
      label: collection.name,
      value: collection.id,
    }))
    .concat({
      label: "Not Selected",
      value: "",
    });

  const selectedCollectionGroupsKey = selectedCollection
    ? Object.keys(selectedCollection.groups)
    : [];

  return (
    <Tabs defaultValue="variable" className="w-full">
      <Header
        title={
          <>
            {title}
            <TabsList className="ml-2">
              <TabsTrigger value="variable">Figma Variable</TabsTrigger>
              <TabsTrigger value="style">Figma Style</TabsTrigger>
            </TabsList>
          </>
        }
      />
      <TabsContent value="variable" className="h-[calc(100vh-79px)]">
        <ResizablePanelGroup direction="horizontal" className="gap-4 pl-4">
          <ResizablePanel defaultSize={18} minSize={18} maxSize={25}>
            <h2 className="text-xl font-bold mb-2">Collections</h2>
            <ComboBox
              defaultValue={selectedCollection?.collection.id ?? ""}
              options={collectionComboBoxOptions}
              onSelect={selectCollection}
              messages={{
                empty: "empty",
                placeholder: "Select Collection",
              }}
              className={{ trigger: "w-full mb-2", content: "w-full" }}
            />
            <ScrollArea className="h-[calc(100vh-161px)] pb-4">
              {selectedCollection && (
                <p className="text-xs text-muted-foreground mb-2">Groups</p>
              )}
              <ToggleGroup
                type="single"
                className="flex-col justify-start items-cente"
                defaultValue={selectedCollection?.selectedGroup}
                onValueChange={selectGroup}
              >
                {selectedCollection &&
                selectedCollectionGroupsKey.length > 0 ? (
                  selectedCollectionGroupsKey.map((key) => (
                    <SidePanelButton size="sm" key={key} value={key}>
                      {key}
                    </SidePanelButton>
                  ))
                ) : selectedCollection === undefined ? (
                  <p className="w-full text-center mt-8 text-sm text-muted-foreground">
                    Please select variables collection
                  </p>
                ) : (
                  <p className="w-full text-center mt-8 text-sm text-muted-foreground">
                    {placeholder?.emptyGroups}
                  </p>
                )}
              </ToggleGroup>
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="pr-4">
            <ScrollArea>
              <h2 className="text-xl font-bold mb-2">Variables</h2>
              {selectedCollection?.selectedGroup ? (
                <>{renderVariableTab && renderVariableTab()}</>
              ) : (
                <p className="w-full h-[calc(100%-36px)] flex justify-center items-center text-muted-foreground">
                  Please select variables group
                </p>
              )}
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </TabsContent>
      <TabsContent value="style">
        {renderStyleTab && renderStyleTab()}
      </TabsContent>
    </Tabs>
  );
};
