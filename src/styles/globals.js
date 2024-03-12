import { css } from '@emotion/react';

export const globalStyles = (theme) => css`
  html,
  body {
    padding: 0 !important;
    margin: 0 !important;
    overflow-x: hidden !important;
  }

  a {
    color: inherit !important;
    text-decoration: none !important;
  }

  * {
    box-sizing: border-box;
    scrollbar-width: thin !important;
    scroll-behavior: smooth !important;
    -webkit-tap-highlight-color: transparent !important;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.palette.secondary.light};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.palette.secondary.main};
    border-radius: 100vw;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.secondary.dark};
  }
`;

export const bootstrapCarouselStyles = (theme) => css`
  .carousel-item {
    transition: transform 2s ease-in-out !important;
  }

  .hide-indicators .carousel-indicators {
    display: none !important;
  }

  .carousel-indicators button:hover {
    background-color: ${theme.palette.secondary.dark} !important;
  }

  .carousel-indicators .active {
    background-color: ${theme.palette.secondary.main} !important;
  }

  .custom-indicators .carousel-indicators button {
    width: 10px !important;
    height: 10px !important;
    border-radius: 100% !important;
    background-color: transparent !important;
    border: 2px solid ${theme.palette.secondary.main} !important;
  }

  .custom-indicators .carousel-indicators button:hover {
    background-color: ${theme.palette.secondary.dark} !important;
  }

  .custom-indicators .carousel-indicators .active {
    background-color: ${theme.palette.secondary.main} !important;
  }

  .carousel:hover {
    cursor: pointer;
  }

  .carousel .carousel-control-prev {
    left: -4% !important;
    top: -20% !important;
  }

  .carousel .carousel-control-next {
    right: -4% !important;
    top: -20% !important;
  }

  .carousel .carousel-control-prev,
  .carousel .carousel-control-next {
    opacity: 0 !important;
    transition: opacity 0.5s ease-in-out !important;
  }

  .carousel:hover .carousel-control-prev,
  .carousel:hover .carousel-control-next {
    opacity: 1 !important;
  }
`;
