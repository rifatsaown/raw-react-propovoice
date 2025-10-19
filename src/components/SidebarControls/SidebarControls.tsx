import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCollapsed, toggleCollapse } from '../../store/sidebarSlice';
import { Button } from '../ui/button';

// Example component showing how to control sidebar from any component
export function SidebarControls() {
  const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700">Sidebar Controls:</h3>

      <Button
        variant="outline"
        size="sm"
        onClick={() => dispatch(toggleCollapse())}
        className="flex items-center gap-2"
      >
        {isCollapsed ? (
          <>
            <PanelLeftOpen className="w-4 h-4" />
            Expand Sidebar
          </>
        ) : (
          <>
            <PanelRightOpen className="w-4 h-4" />
            Collapse Sidebar
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => dispatch(setCollapsed(false))}
        disabled={!isCollapsed}
      >
        Force Expand
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => dispatch(setCollapsed(true))}
        disabled={isCollapsed}
      >
        Force Collapse
      </Button>

      <span className="text-xs text-gray-500">
        Status: {isCollapsed ? 'Collapsed' : 'Expanded'}
      </span>
    </div>
  );
}
