import { NestedGroupObject, addDataToObjectByPath } from "../utils";

export type FigmaBaseStyle = {
  id: string;
  description: string;
  name: string;
};

export type FigmaColorStyle = {
  paints: readonly Paint[];
} & FigmaBaseStyle;

export type FigmaEffectStyle = {
  effects: readonly Effect[];
} & FigmaBaseStyle;

export type FigmaTextStyle = {
  fontName: FontName;
  fontSize: number;
  hangingList: boolean;
  hangingPunctuation: boolean;
  leadingTrim: LeadingTrim;
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  listSpacing: number;
  paragraphIndent: number;
  paragraphSpacing: number;
  textCase: TextCase;
  textDecoration: TextDecoration;
} & FigmaBaseStyle;

export type FigmaStyle = FigmaColorStyle | FigmaEffectStyle | FigmaTextStyle;
export type FigmaStyleNestedGroupObject = NestedGroupObject<FigmaStyle>;

export class StylesService {
  getColorStyles() {
    const colorStyles: FigmaColorStyle[] = figma
      .getLocalPaintStyles()
      .map((style) => ({
        id: style.id,
        description: style.description,
        name: style.name,
        paints: style.paints,
      }));

    const groupedObject: FigmaStyleNestedGroupObject = {};
    colorStyles.forEach((style) => {
      const splitedName = style.name.split("/");
      addDataToObjectByPath(groupedObject, splitedName, {
        ...style,
        name: splitedName[splitedName.length - 1],
      });
    });

    return groupedObject;
  }

  getEffectStyles() {
    const effectStyles: FigmaEffectStyle[] = figma
      .getLocalEffectStyles()
      .map((style) => ({
        id: style.id,
        description: style.description,
        name: style.name,
        effects: style.effects,
      }));

    const groupedObject: FigmaStyleNestedGroupObject = {};
    effectStyles.forEach((style) => {
      const splitedName = style.name.split("/");
      addDataToObjectByPath(groupedObject, splitedName, {
        ...style,
        name: splitedName[splitedName.length - 1],
      });
    });

    return groupedObject;
  }

  getTextStyles() {
    const textStyles: FigmaTextStyle[] = figma
      .getLocalTextStyles()
      .map((style) => ({
        id: style.id,
        description: style.description,
        name: style.name,
        fontName: style.fontName,
        fontSize: style.fontSize,
        hangingList: style.hangingList,
        hangingPunctuation: style.hangingPunctuation,
        leadingTrim: style.leadingTrim,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        listSpacing: style.listSpacing,
        paragraphIndent: style.paragraphIndent,
        paragraphSpacing: style.paragraphSpacing,
        textCase: style.textCase,
        textDecoration: style.textDecoration,
      }));

    const groupedObject: FigmaStyleNestedGroupObject = {};
    textStyles.forEach((style) => {
      const splitedName = style.name.split("/");
      addDataToObjectByPath(groupedObject, splitedName, {
        ...style,
        name: splitedName[splitedName.length - 1],
      });
    });

    return groupedObject;
  }
}
