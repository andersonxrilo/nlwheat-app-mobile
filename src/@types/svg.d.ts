declare module "*.svg" {
  import * as React from "react";
  import Svg, { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
