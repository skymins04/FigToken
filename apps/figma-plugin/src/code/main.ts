import { StorageModule } from "./storage/storage.module";
import { StylesModule } from "./styles/styles.module";
import { VariablesModule } from "./variables/variables.module";

figma.showUI(__html__, {
  width: 1200,
  height: 600,
});

new StylesModule();
new VariablesModule();
new StorageModule();
