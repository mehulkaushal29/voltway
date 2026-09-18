export const Colors = {
  volt: '#00E676', voltDark: '#00C853', voltGlow: 'rgba(0,230,118,0.15)',
  bg: '#0A0E1A', bg2: '#111827', bg3: '#1a2235', bg4: '#1e2a3a',
  text: '#F0F4FF', text2: '#8FA3C7', text3: '#4A5E80',
  border: 'rgba(255,255,255,0.07)', borderGlow: 'rgba(0,230,118,0.25)',
  green: '#00E676', greenBg: 'rgba(0,230,118,0.12)',
  amber: '#FFB020', amberBg: 'rgba(255,176,32,0.12)',
  red: '#FF4D4D', redBg: 'rgba(255,77,77,0.12)',
  blue: '#2979FF', blueBg: 'rgba(41,121,255,0.12)',
  white: '#FFFFFF', black: '#000000',
};
export const Spacing = { xs:4, sm:8, md:12, lg:16, xl:20, xxl:24, xxxl:32 };
export const Radius = { sm:8, md:12, lg:16, xl:20, full:999 };
export const FontSize = { xs:10, sm:12, md:14, lg:16, xl:18, xxl:22, xxxl:28 };
export const MapStyle = [
  {elementType:'geometry',stylers:[{color:'#0d1a2e'}]},
  {elementType:'labels.text.fill',stylers:[{color:'#8FA3C7'}]},
  {elementType:'labels.text.stroke',stylers:[{color:'#0A0E1A'}]},
  {featureType:'road',elementType:'geometry',stylers:[{color:'#1a2235'}]},
  {featureType:'road.highway',elementType:'geometry',stylers:[{color:'#243048'}]},
  {featureType:'water',elementType:'geometry',stylers:[{color:'#07111e'}]},
  {featureType:'poi',elementType:'labels',stylers:[{visibility:'off'}]},
  {featureType:'transit',stylers:[{visibility:'off'}]},
];
