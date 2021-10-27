import { useMemo } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children, selector }) {
  const root = useMemo(() => document.querySelector(selector), [selector]);
  if (!root || !children) return;
  return createPortal(children, root);
}
