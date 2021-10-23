import React from "react";
import styled from 'styled-components';

const BtnButton = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 0.5em;
  height: auto;
  min-height: 40px;
  border: 0;
  outline: none;
  background-color: #000000;
  cursor: pointer;
  position: relative;
  font-family: Tomorrow, sans-serif;
  font-size: .85rem;
  text-transform: uppercase;
  color: #000000;
  display: inline-block;
  clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);
`;

interface BtnContentProps {
  color: string;
}

const BtnContent = styled.span<BtnContentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background-color: ${props => props.color};
  clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);
`;

BtnContent.defaultProps = {
  color: ""
}

const BtnGlitch = styled.span<BtnContentProps>`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  filter: drop-shadow(-2px 3px ${props => props.color}) drop-shadow(-1px -3px ${props => props.color}) drop-shadow(2px 1px ${props => props.color});
`;

const GlitchButton = ({ disabled=false, id = "glitch-btn", color, glitchColor, content = "", onclick }: { disabled: boolean, id: string, color: string, glitchColor: string, content: string, onclick: Function }) => {

  return (
    <>
    <BtnButton disabled={disabled} className="btn" id={id} onClick={onclick}>
      <BtnContent className="btn__content" color={color}>{content}</BtnContent>
      <BtnGlitch className="btn__glitch" color={glitchColor}></BtnGlitch>
      <span className="btn__label">r25</span>
    </BtnButton>
      <style>{`
          .btn:hover .btn__glitch,
          .btn:hover .btn__content::after,
          .btn:focus .btn__glitch,
          .btn:focus .btn__content::after {
            display: block;
            animation: glitch-animation 2s linear 0s infinite;
          }
        /* secret trick */
        @keyframes glitch-animation {
          0% {
            opacity: 1;
            transform: translateZ(0);
            clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
          }
          2% {
            clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
            transform: translate(-5px);
          }
          6% {
            clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
            transform: translate(5px);
          }
          8% {
            clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
            transform: translate(-5px);
          }
          9% {
            clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
            transform: translate(0);
          }
          10% {
            clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
            transform: translate3d(5px, 0, 0);
          }
          13% {
            clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
            transform: translateZ(0);
          }
          13.1% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            transform: translate3d(5px, 0, 0);
          }
          15% {
            clip-path: polygon(0 60%, 100% 60%, 100% 40%, 0 40%);
            transform: translate3d(5px, 0, 0);
          }
          20% {
            clip-path: polygon(0 60%, 100% 60%, 100% 40%, 0 40%);
            transform: translate3d(-5px, 0, 0);
          }
          20.1% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            transform: translate3d(5px, 0, 0);
          }
          25% {
            clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
            transform: translate3d(5px, 0, 0);
          }
          30% {
            clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
            transform: translate3d(-5px, 0, 0);
          }
          30.1% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          }
          35% {
            clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
            transform: translate(-5px);
          }
          40% {
            clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
            transform: translate(5px);
          }
          45% {
            clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
            transform: translate(-5px);
          }
          50% {
            clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
            transform: translate(0);
          }
          55% {
            clip-path: polygon(0 10%, 100% 10%, 100% 0, 0 0);
            transform: translate3d(5px, 0, 0);
          }
          60% {
            clip-path: polygon(0 10%, 100% 10%, 100% 0, 0 0);
            transform: translateZ(0);
            opacity: 1;
          }
          60.1% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            opacity: 1;
          }
          to {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}

export default GlitchButton;