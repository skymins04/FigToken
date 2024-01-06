import { MessageListener } from "../common/message/message-listen";

figma.showUI(__html__, {
  width: 800,
  height: 600,
  title: "Design Token Exporter",
});

MessageListener.get("/", () => {
  return figma.getLocalPaintStyles();
});
