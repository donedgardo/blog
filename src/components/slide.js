import styled, { keyframes } from "styled-components";
import logos from "../images/brand-logos-2-rows.png";
import logosMobile from "../images/brand-logos.png";

const slide = keyframes`
  100% {
    transform: translateX(-66.6666%);
  }
`;

export const Slide = styled.div`
  width: 5900px;
  background-image: url(${logos});
  background-repeat: repeat-x;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  margin-left: 10px;
  transform: translate3d(0, 0, 0);
  animation: ${slide} 160s linear infinite;
  @media (max-width: 790px) {
    background-image: url(${logosMobile});
  }
`;

export const SlideContainer = styled.div`
  height: 286px;
  margin: 0 auto 0;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  transform: translate3d(0, 0, 0);
  background: #231f20;
  @media (min-width: 790px) {
    height: 286px;
    margin-bottom: 2.5em;
  }
`;