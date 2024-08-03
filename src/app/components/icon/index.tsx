'use client';

import React, { lazy, Suspense } from 'react';
import type { IconType } from 'react-icons';

import iconModuleMap from './icon-module.map';

type TIconComponent = React.LazyExoticComponent<IconType>;

const loadIcon = (iconName: string, module: string): TIconComponent => {
  const IconModule = iconModuleMap[module];

  if (!IconModule) {
    throw new Error(`Icon module ${module} not found.`);
  }

  const IconComponent = IconModule[iconName as keyof typeof IconModule] as IconType;

  if (!IconComponent) {
    throw new Error(`Icon ${iconName} not found in module ${module}.`);
  }

  return lazy(() => Promise.resolve({ default: IconComponent }));
};

interface IconProps {
  name: string;
  module: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, module, size, color }) => {
  const IconComponent = loadIcon(name, module);

  return (
    <Suspense fallback={null}>
      <IconComponent size={size} color={color} />
    </Suspense>
  );
};
export default Icon;
