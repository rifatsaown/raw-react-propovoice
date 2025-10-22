import { AlignStart2Icon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCollapsed } from '@/store/sidebarSlice';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import {
  Calendar,
  Calendar as CalendarIcon,
  ChevronDown,
  Flag,
  ListFilter,
  Menu,
  Plus,
  Rows3,
  Settings,
  User,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { loadSalesPipelineData } from './api/mockApi';
import { PipelineSubSidebar } from './components/PipelineSubSidebar';
import type { Columns, Task, TaskMovement } from './types';
import { CalendarView, ListView, PipelineView } from './views';

// View types
type ViewType = 'pipeline' | 'list' | 'calendar';

export default function SelesPipeline() {
  const [columns, setColumns] = useState<Columns>({}); // State to track current column data
  const [activeId, setActiveId] = useState<string | null>(null); // State to track which task is currently being dragged
  // const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewType>('pipeline');
  const [showFilterButtons, setShowFilterButtons] = useState<boolean>(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  // Track if the columns were actually changed by a user action
  const columnsChanged = useRef<boolean>(false);
  const lastChangedTask = useRef<TaskMovement | null>(null);

  // Redux hooks for sidebar management
  const dispatch = useAppDispatch();
  const isMainSidebarCollapsed = useAppSelector(
    (state) => state.sidebar.isCollapsed
  );

  // Collapse main sidebar when entering this page and restore on unmount
  useEffect(() => {
    // Save the previous state
    const previousCollapsedState = isMainSidebarCollapsed;

    // Collapse the main sidebar
    dispatch(setCollapsed(true));

    // Cleanup: restore the previous state when leaving this page
    return () => {
      dispatch(setCollapsed(previousCollapsedState));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount/unmount

  // Load initial data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await loadSalesPipelineData();
        setColumns(data.columns);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle escape key for mobile sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showMobileSidebar) {
        setShowMobileSidebar(false);
      }
    };

    if (showMobileSidebar) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showMobileSidebar]);

  // Effect to call API when columns state changes and it was triggered by a user action
  /*   useEffect(() => {
    // Only proceed if columns were changed by a user action and we're not already updating
    if (columnsChanged.current && !isUpdating) {
      setIsUpdating(true);

      // Log the specific changes if we have the information
     if (lastChangedTask.current) {
        const { taskId, fromColumn, toColumn, position } =
          lastChangedTask.current;
        console.log(
          `Successfully moved task ${taskId} from ${fromColumn} to ${toColumn} at position ${position}`
        );
      } else {
        console.log('Columns state updated');
      } 

      // Call the API to save the data to the database
      saveSalesPipelineData(columns)
        .then(() => {
          setIsUpdating(false);
          // Reset the flag after successful update
          columnsChanged.current = false;
        })
        .catch((error) => {
          console.error('Error updating database:', error);
          setIsUpdating(false);
          // Reset the flag even on error
          columnsChanged.current = false;
        }); 
    }
  }, [columns, isUpdating]); */

  // Helper function to find which column contains a specific task ID
  // Returns the column key (e.g., "QUALIFICATION", "PROPOSAL", etc.)
  const findContainer = (id: string): string | undefined => {
    // If the ID is a column name, return it directly
    if (id in columns) return id;

    // Otherwise, search through all columns to find which one contains the task
    const container = Object.keys(columns).find((key) =>
      columns[key].find((item: Task) => item.id === id)
    );

    return container;
  };

  // Helper function to find a task object by its ID
  const findTask = (id: string): Task | undefined => {
    const container = findContainer(id);
    if (!container) return undefined;

    return columns[container].find((item: Task) => item.id === id);
  };

  // Event handler for when a drag operation starts
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    // Store the ID of the task being dragged
    setActiveId(active.id as string);
  };

  // Event handler for when a dragged item is moved over a droppable area
  // This handles moving tasks between different columns
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    // If not over a droppable area, do nothing
    if (!over) return;

    // Get the source and destination columns
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    // If either container is not found or they're the same, do nothing
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // Update the columns state to move the task from one column to another
    setColumns((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the index of the dragged item in its original column
      const activeIndex = activeItems.findIndex(
        (item: Task) => item.id === active.id
      );

      // Find the index of the item being hovered over in the destination column
      const overIndex = overItems.findIndex(
        (item: Task) => item.id === over.id
      );

      let newIndex;
      if (over.id in prev) {
        // If hovering over the column itself (not a specific task)
        // Add the task to the end of the column
        newIndex = overItems.length;
      } else {
        // If hovering over a specific task, insert at that position
        newIndex = overIndex >= 0 ? overIndex : overItems.length;
      }

      // Store the task movement information for logging
      lastChangedTask.current = {
        taskId: active.id as string,
        fromColumn: activeContainer,
        toColumn: overContainer,
        position: newIndex,
      };

      // Set the flag to indicate columns were changed by user action
      columnsChanged.current = true;

      // Create and return the new state with the task moved to the new column
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter(
            (item: Task) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          prev[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  // Event handler for when a drag operation ends
  // This handles reordering tasks within the same column
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If not dropped on a valid target, reset active ID and do nothing
    if (!over) {
      setActiveId(null);
      return;
    }

    // Get the source and destination columns
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    // If either container is not found, reset active ID and do nothing
    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    // If moving between different columns
    if (activeContainer !== overContainer) {
      // Find the indices
      const activeIndex = columns[activeContainer].findIndex(
        (item: Task) => item.id === active.id
      );

      const overIndex =
        over.id in columns
          ? columns[overContainer].length // If dropping on a column
          : columns[overContainer].findIndex(
              (item: Task) => item.id === over.id
            ); // If dropping on an item

      const newPosition =
        overIndex >= 0 ? overIndex : columns[overContainer].length;

      // Create the new state
      const newItems = { ...columns };
      // Remove from the source column
      newItems[activeContainer] = newItems[activeContainer].filter(
        (item: Task) => item.id !== active.id
      );
      // Add to the destination column
      const itemToMove = columns[activeContainer][activeIndex];
      newItems[overContainer] = [
        ...newItems[overContainer].slice(0, newPosition),
        itemToMove,
        ...newItems[overContainer].slice(newPosition),
      ];

      // Store the task movement information for logging
      lastChangedTask.current = {
        taskId: active.id as string,
        fromColumn: activeContainer,
        toColumn: overContainer,
        position: newPosition,
      };

      // Set the flag to indicate columns were changed by user action
      columnsChanged.current = true;

      // Update the state
      setColumns(newItems);
    }
    // If reordering within the same column
    else {
      const activeIndex = columns[activeContainer].findIndex(
        (item: Task) => item.id === active.id
      );

      const overIndex = columns[overContainer].findIndex(
        (item: Task) => item.id === over.id
      );

      // If the position changed, update the order within the column
      if (activeIndex !== overIndex) {
        // Store the task movement information for logging
        lastChangedTask.current = {
          taskId: active.id as string,
          fromColumn: activeContainer,
          toColumn: overContainer,
          position: overIndex,
        };

        // Set the flag to indicate columns were changed by user action
        columnsChanged.current = true;

        // Create the new state
        const newItems = { ...columns };
        newItems[overContainer] = arrayMove(
          [...columns[overContainer]],
          activeIndex,
          overIndex
        );

        // Update the state
        setColumns(newItems);
      }
    }
    // Reset the active ID
    setActiveId(null);
  };

  // Handler to add a new stage (column) to the right side
  const handleAddStage = () => {
    const stageNameRaw = window.prompt('Enter new stage name');
    const stageName = stageNameRaw ? stageNameRaw.trim() : '';
    if (!stageName) return;

    // Prevent duplicate keys (case-sensitive check to keep it simple)
    if (stageName in columns) {
      alert('A stage with this name already exists.');
      return;
    }

    setColumns((prev) => {
      const next = { ...prev, [stageName]: [] };
      // Mark as changed so the mock API runs
      columnsChanged.current = true;
      return next;
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <main className="min-h-screen p-4 sm:p-6 md:px-8 lg:px-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F56D9] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sales pipeline...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes slideInFromRight {
            0% {
              opacity: 0;
              transform: translateX(20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideOutToRight {
            0% {
              opacity: 1;
              transform: translateX(0);
            }
            100% {
              opacity: 0;
              transform: translateX(20px);
            }
          }
          
          @keyframes slideInFromLeft {
            0% {
              opacity: 0;
              transform: translateX(-20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideOutToLeft {
            0% {
              opacity: 1;
              transform: translateX(0);
            }
            100% {
              opacity: 0;
              transform: translateX(-20px);
            }
          }
          
          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;  /* Internet Explorer 10+ */
            scrollbar-width: none;  /* Firefox */
          }
          .scrollbar-hide::-webkit-scrollbar { 
            display: none;  /* Safari and Chrome */
          }
          
          @keyframes slideInFromLeft {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          .mobile-sidebar-enter {
            animation: slideInFromLeft 0.3s ease-out forwards;
          }
          
          .mobile-sidebar-backdrop {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm mobile-sidebar-backdrop"
            onClick={() => setShowMobileSidebar(false)}
          />

          {/* Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl mobile-sidebar-enter">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Pipeline Settings
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100"
                onClick={() => setShowMobileSidebar(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <PipelineSubSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Pipeline Sub-Sidebar - Hidden on mobile */}
      <div
        className="hidden lg:block animate-in slide-in-from-left duration-300"
        style={{
          animation: 'slideInFromLeft 0.3s ease-out',
        }}
      >
        <PipelineSubSidebar />
      </div>

      <main
        className={`min-h-screen p-4 sm:p-6 md:px-8 lg:px-12 transition-all duration-300 ${
          isMainSidebarCollapsed ? 'lg:ml-60' : 'lg:ml-12'
        } ml-0 sm:ml-0 md:ml-0`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden p-2 rounded-lg border-gray-300"
              onClick={() => setShowMobileSidebar(true)}
            >
              <Settings className="w-4 h-4" color="#344054" />
            </Button>
            <h2 className="text-xl font-bold">Sales Pipeline</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1">
            <Button
              variant="outline"
              className="rounded-lg text-sm"
              onClick={() => {}}
            >
              Create Stage
            </Button>
            <Button
              variant="default"
              onClick={() => {}}
              className="px-3 py-2 gap-1 rounded-lg bg-[#7F56D9] text-white text-sm font-semibold shadow-[0px_1px_2px_rgba(16,24,40,0.05),_inset_0px_0px_0px_1px_rgba(16,24,40,0.18),_inset_0px_-2px_0px_rgba(16,24,40,0.05)]"
            >
              <Plus strokeWidth={3} className="w-5 h-5 text-white" />
              Create Deal
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 lg:mb-7">
          <div className="flex items-center gap-2 overflow-x-auto">
            <ButtonGroup className="flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className={`font-normal text-xs sm:text-sm whitespace-nowrap ${
                  currentView === 'pipeline'
                    ? 'bg-[#F9FAFB] text-[#344054] border border-gray-300'
                    : 'text-[#344054]'
                }`}
                onClick={() => setCurrentView('pipeline')}
              >
                <AlignStart2Icon className="w-4 h-4" />
                <span className="hidden sm:inline">Pipeline View</span>
                <span className="sm:hidden">Pipeline</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`font-normal text-xs sm:text-sm whitespace-nowrap ${
                  currentView === 'list'
                    ? 'bg-[#F9FAFB] text-[#344054] border border-gray-300'
                    : 'text-[#344054]'
                }`}
                onClick={() => setCurrentView('list')}
              >
                <Rows3
                  color={currentView === 'list' ? '#344054' : '#667085'}
                  className="mt-0.5"
                />
                <span className="hidden sm:inline">List View</span>
                <span className="sm:hidden">List</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`font-normal text-xs sm:text-sm whitespace-nowrap ${
                  currentView === 'calendar'
                    ? 'bg-[#F9FAFB] text-[#344054] border border-gray-300'
                    : 'text-[#344054]'
                }`}
                onClick={() => setCurrentView('calendar')}
              >
                <Calendar
                  color={currentView === 'calendar' ? '#344054' : '#667085'}
                  className="mt-0.5"
                />
                <span className="hidden sm:inline">Calendar View</span>
                <span className="sm:hidden">Calendar</span>
              </Button>
            </ButtonGroup>
          </div>
          <div className="flex items-center gap-2 overflow-hidden relative w-full lg:w-auto">
            {/* More Filters Button */}
            <div
              className={`transition-all duration-500 ease-in-out flex-shrink-0 ${
                !showFilterButtons
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 -translate-x-8 scale-95 absolute pointer-events-none'
              }`}
            >
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowFilterButtons(true)}
                className="text-[#344054] font-medium rounded-lg transition-all duration-300 hover:shadow-lg text-xs sm:text-sm whitespace-nowrap"
              >
                <ListFilter className="w-4 h-4" color="#344054" />
                <span className="hidden sm:inline">More filters</span>
                <span className="sm:hidden">Filters</span>
              </Button>
            </div>

            {/* Filters Section */}
            <div
              className={`transition-all duration-500 ease-in-out w-full ${
                showFilterButtons
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-8 scale-95 absolute pointer-events-none'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
                {/* Filters Label */}
                <button
                  onClick={() => setShowFilterButtons(false)}
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-all duration-300 hover:shadow-md flex-shrink-0 self-start sm:self-center"
                >
                  <Menu className="w-4 h-4 text-[#344054]" />
                  <span className="text-sm font-medium text-[#344054]">
                    Filters
                  </span>
                </button>

                {/* Filter Buttons - Scrollable on mobile */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  <div className="flex gap-1 flex-nowrap">
                    {/* Lead Type Filter */}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {}}
                      className="text-[#344054] font-normal rounded-lg border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                      style={{
                        animationDelay: showFilterButtons ? '0.1s' : '0s',
                        animation: showFilterButtons
                          ? 'slideInFromRight 0.4s ease-out forwards'
                          : 'none',
                      }}
                    >
                      <Users className="w-4 h-4" color="#344054" />
                      <span className="hidden sm:inline">Lead Type</span>
                      <span className="sm:hidden">Lead</span>
                      <ChevronDown className="w-4 h-4" color="#344054" />
                    </Button>

                    {/* Deal Owner Filter */}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {}}
                      className="text-[#344054] font-normal rounded-lg border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                      style={{
                        animationDelay: showFilterButtons ? '0.15s' : '0s',
                        animation: showFilterButtons
                          ? 'slideInFromRight 0.4s ease-out forwards'
                          : 'none',
                      }}
                    >
                      <User className="w-4 h-4" color="#344054" />
                      <span className="hidden sm:inline">Deal Owner</span>
                      <span className="sm:hidden">Owner</span>
                      <ChevronDown className="w-4 h-4" color="#344054" />
                    </Button>

                    {/* Assignee Filter */}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {}}
                      className="text-[#344054] font-normal rounded-lg border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                      style={{
                        animationDelay: showFilterButtons ? '0.2s' : '0s',
                        animation: showFilterButtons
                          ? 'slideInFromRight 0.4s ease-out forwards'
                          : 'none',
                      }}
                    >
                      <Users className="w-4 h-4" color="#344054" />
                      Assignee
                      <ChevronDown className="w-4 h-4" color="#344054" />
                    </Button>

                    {/* Height Filter */}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {}}
                      className="text-[#344054] font-normal rounded-lg border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                      style={{
                        animationDelay: showFilterButtons ? '0.25s' : '0s',
                        animation: showFilterButtons
                          ? 'slideInFromRight 0.4s ease-out forwards'
                          : 'none',
                      }}
                    >
                      <Flag className="w-4 h-4" color="#344054" />
                      Height
                      <ChevronDown className="w-4 h-4" color="#344054" />
                    </Button>

                    {/* Created Date Filter */}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {}}
                      className="text-[#344054] font-normal rounded-lg border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                      style={{
                        animationDelay: showFilterButtons ? '0.3s' : '0s',
                        animation: showFilterButtons
                          ? 'slideInFromRight 0.4s ease-out forwards'
                          : 'none',
                      }}
                    >
                      <CalendarIcon className="w-4 h-4" color="#344054" />
                      <span className="hidden sm:inline">Created Date</span>
                      <span className="sm:hidden">Date</span>
                      <ChevronDown className="w-4 h-4" color="#344054" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on current view */}
        {currentView === 'pipeline' && (
          <PipelineView
            columns={columns}
            activeId={activeId}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onAddStage={handleAddStage}
            findTask={findTask}
          />
        )}

        {currentView === 'list' && <ListView columns={columns} />}

        {currentView === 'calendar' && <CalendarView />}
      </main>
    </>
  );
}
