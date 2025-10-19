import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { closeSidebar, toggleOpen } from '@/store/sidebarSlice';
import { Menu } from 'lucide-react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayouts = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Only close the sidebar if it's open, don't affect collapse state
        if (isOpen) {
          dispatch(closeSidebar());
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onToggle={() => dispatch(toggleOpen())} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar with menu button for mobile */}
        <div className="lg:hidden flex items-center p-4 bg-white border-b border-gray-200 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleOpen())}
            className="h-8 w-8"
            aria-label="Open sidebar"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div className="ml-3 text-lg font-semibold text-gray-800">
            Kidency
          </div>
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayouts;
