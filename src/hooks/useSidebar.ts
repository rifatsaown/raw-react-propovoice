import { useState } from 'react';

export interface UseSidebarReturn {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleOpen: () => void;
  toggleCollapse: () => void;
  setOpen: (open: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
}

export function useSidebar(
  initialOpen = false,
  initialCollapsed = false
): UseSidebarReturn {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const setOpen = (open: boolean) => setIsOpen(open);
  const setCollapsed = (collapsed: boolean) => setIsCollapsed(collapsed);

  return {
    isOpen,
    isCollapsed,
    toggleOpen,
    toggleCollapse,
    setOpen,
    setCollapsed,
  };
}
