import { Svg, Path } from "@react-pdf/renderer";

const PhoneIcon = (props) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#fff"
      d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
    />
  </Svg>
);

const EmailIcon = (props) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#fff"
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);

const LocationIcon = (props) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#fff"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
    />
  </Svg>
);

const BirthdayIcon = (props) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#fff"
      d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"
    />
  </Svg>
);

const FlagIcon = (props) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" {...props}>
    <Path fill="#fff" d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
  </Svg>
);

export const personalIcons = new Map([
  ["nationality", FlagIcon],
  ["phone", PhoneIcon],
  ["email", EmailIcon],
  ["birthDate", BirthdayIcon],
  ["location", LocationIcon],
]);
