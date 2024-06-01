import React from 'react';
import feather from 'feather-icons';

const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  const svg = feather.icons[name].toSvg({ width: size, height: size, color });
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default Icon;
