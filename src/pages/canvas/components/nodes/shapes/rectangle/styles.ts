import styled from "styled-components";

import { getDescriptionFonts, getTitleFonts } from "../styling/default.theming";

interface ContainerProps {
  background: string;
}

interface WrapperProps {
  border: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100px;
  min-height: 75px;
  height: auto;

  border: 2px solid transparent; /* Make the border initially transparent */
  background: ${(props) => props.background};

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
`;

export const TopWrapper = styled.div`
  width: 100%;
  height: 15px;

  display: flex;
  justify-content: center;
`;
export const IconWrapper = styled.div<WrapperProps>`
  height: 17px;
  width: 20%;
  display: flex;
  justify-content: center;
  position: relative; /* Needed for absolute positioning of the pseudo-element */

  /* Keeps space for the border */
  border-right: 2px solid transparent;

  /* Pseudo-element for gradient right border */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0; /* Align to the right */
    width: 2px; /* Width of the right border */
    height: 110%; /* Full height of the wrapper */
    background: ${(props) => props.border};
    border-radius: 0 3px 3px 0; /* Match the corners */
    z-index: 1; /* Ensure it appears above the background */
  }
`;

export const LabelWrapper = styled.div`
  width: 80%;

  display: flex;
  justify-content: center;
`;

export const MainWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  position: relative; /* Needed for absolute positioning of the pseudo-element */

  /* Keeps space for the border */
  border-top: 2px solid transparent;

  /* Pseudo-element for gradient top border */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px; /* Height of the top border */
    background: ${(props) => props.border};
    border-radius: 3px 3px 0 0; /* Match the corners */
    z-index: 1; /* Ensure it appears above the background */
  }
`;

export const RectangleIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RectangleMainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

export const RectangleMainSpan = styled.span`
  width: 100%;
  line-height: 13px;

  ${getTitleFonts()}
`;

export const ProviderCircle = styled.div`
  z-index: 2;
  position: absolute;
  top: -10px;
  left: -10px;
  width: 20px; /* Adjust the size as needed */
  height: 20px; /* Adjust the size as needed */
  background: white;
  border-radius: 50%; /* Makes it a circle */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RectangleContentContainer = styled.div`
  width: 100%;
`;

export const RectangleContentLabelWrapper = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  padding: 2px;
`;

export const RectangleContentDescription = styled.span`
  ${getDescriptionFonts()};
`;

export const OptionContainer = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 15px;
  border-top: 2px solid transparent; /* Make the border initially transparent */
  background: ${(props) => props.background};
`;

export const OptionLabel = styled.span`
  width: 100%;
  ${getTitleFonts()};
  text-align: center;
`;
