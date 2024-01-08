import { StylesModule } from "./styles/styles.module";
import { VariablesModule } from "./variables/variables.module";

figma.showUI(__html__, {
  width: 800,
  height: 600,
  title: "Design Token Exporter",
});

new StylesModule();
new VariablesModule();
