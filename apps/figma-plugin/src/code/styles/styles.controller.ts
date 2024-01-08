import { MessageListener } from "../../common/message/message-listen";
import { StylesService } from "./styles.service";

export class StylesController {
  constructor(private readonly stylesService: StylesService) {
    this.getColorStyles();
    this.getEffectStyles();
    this.getTextStyles();
  }

  getColorStyles() {
    MessageListener.get("/styles/colors", () => {
      const colorStyles = this.stylesService.getColorStyles();
      return colorStyles;
    });
  }

  getEffectStyles() {
    MessageListener.get("/styles/effects", () => {
      const effectStyles = this.stylesService.getEffectStyles();
      return effectStyles;
    });
  }

  getTextStyles() {
    MessageListener.get("/styles/texts", () => {
      const effectStyles = this.stylesService.getTextStyles();
      return effectStyles;
    });
  }
}
