const numberRangeMap = (
  x: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) => {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export const getFigmaVariableValue = (
  type: Variable["resolvedType"],
  variableValue: VariableValue
) => {
  if (
    type === "COLOR" &&
    typeof variableValue === "object" &&
    !variableValue.hasOwnProperty("type")
  ) {
    const colorVariable = variableValue as RGBA;
    const rgbColorMap = (x: number) => numberRangeMap(x, 0, 1, 0, 255);
    const [r, g, b, a] = [
      rgbColorMap(colorVariable.r),
      rgbColorMap(colorVariable.g),
      rgbColorMap(colorVariable.b),
      colorVariable.a,
    ].map((value) => value.toFixed(2).replace(".00", ""));
    return `rgba(${r},${g},${b},${a})`;
  } else {
    return variableValue;
  }
};
