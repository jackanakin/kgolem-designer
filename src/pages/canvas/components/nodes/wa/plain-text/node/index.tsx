import { NodeProps } from "@xyflow/react";

import { WAStartNodeType } from "../../types";
import { RectangleShape } from "../../../shapes/rectangle/node";
import waTheming from "../../wa.theming";
import { fonts, textFont } from "../../../shapes/styling/default.theming";
import { waPlainTextParams } from "../wa-plain-text.params";
import {
  RectangleContentContainer,
  RectangleContentDescription,
  RectangleContentLabelWrapper,
} from "../../../shapes/rectangle/styles";

export function WAPlainTextNode({
  data,
  selected,
}: NodeProps<WAStartNodeType>) {
  return (
    <RectangleShape
      shape={{
        border: waTheming.border,
        background: waTheming.background,
      }}
      properties={{
        title: waPlainTextParams.title,
        providerIcon: waPlainTextParams.providerIcon,
        familyIcon: waPlainTextParams.familyIcon,
        selected,
      }}
      children={{
        content: (
          <RectangleContentContainer>
            <RectangleContentLabelWrapper>
              <RectangleContentDescription
                style={{ ...fonts, fontSize: textFont.description }}
              >
                {data.label}
              </RectangleContentDescription>
            </RectangleContentLabelWrapper>
          </RectangleContentContainer>
        ),
        handles: data.handles,
      }}
    />
  );
}
