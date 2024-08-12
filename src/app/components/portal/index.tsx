'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  rootId?: string;
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ rootId, children }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    containerRef.current = document.querySelector(`${rootId}`);
    return () => setMounted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mounted && Boolean(containerRef.current)
    ? createPortal(children, containerRef.current as HTMLDivElement)
    : null;
};
export default Portal;
