import { AlignStart2Icon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCollapsed } from '@/store/sidebarSlice';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import {
  ArrowUpNarrowWide,
  Calendar,
  Calendar as CalendarIcon,
  ChevronDown,
  Flag,
  ListFilter,
  Menu,
  Plus,
  Rows3,
  Search,
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
import AddStageModal from './views/AddStageModal';

// View types
type ViewType = 'pipeline' | 'list' | 'calendar';

export default function SelesPipeline() {
  const [columns, setColumns] = useState<{ open: Columns; closed: Columns }>({
    open: {},
    closed: {},
  }); // State to track current column data
  const [showAddStageModal, setShowAddStageModal] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null); // State to track which task is currently being dragged
  // const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewType>('pipeline');
  const [showFilterButtons, setShowFilterButtons] = useState<boolean>(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  // Track if the columns were actually changed by a user action
  const columnsChanged = useRef<boolean>(false);
  const lastChangedTask = useRef<TaskMovement | null>(null);
  // Track the original container where the drag started
  const draggedFromContainer = useRef<{
    section: 'open' | 'closed';
    stage: string;
  } | null>(null);
  // Track if we're currently processing a drag operation
  const isDragging = useRef<boolean>(false);
  const lastDragTime = useRef<number>(0);

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
  const findContainer = (
    id: string
  ): { section: 'open' | 'closed'; stage: string } | undefined => {
    for (const section of ['open', 'closed'] as const) {
      for (const stage of Object.keys(columns[section])) {
        // If hovering over the column itself
        if (id === stage) {
          return { section, stage };
        }
        // If hovering over a task inside the column
        if (columns[section][stage].some((item: Task) => item.id === id)) {
          return { section, stage };
        }
      }
    }
    return undefined;
  };

  // Helper function to find a task object by its ID
  const findTask = (id: string): Task | undefined => {
    const found = findContainer(id);
    if (!found) return undefined;
    return columns[found.section][found.stage].find(
      (item: Task) => item.id === id
    );
  };

  // Event handler for when a drag operation starts
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id as string;

    // Store the ID of the task being dragged
    setActiveId(activeId);
    isDragging.current = true;

    // Store where the drag started from
    const container = findContainer(activeId);
    if (container) {
      draggedFromContainer.current = container;
    }
  };

  // Event handler for when a dragged item is moved over a droppable area
  // This does NOT update state - only visual feedback
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDragOver = (_event: DragOverEvent) => {
    // Don't update state here to prevent duplications
    // The actual move will happen in handleDragEnd
  };

  // Event handler for when a drag operation ends
  // This handles ALL moves - both within same column and between columns
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Prevent duplicate calls
    const now = Date.now();
    if (now - lastDragTime.current < 100) {
      console.log('Duplicate dragEnd call prevented');
      return;
    }
    lastDragTime.current = now;

    // Reset the dragged item state
    setActiveId(null);
    isDragging.current = false;
    const fromContainer = draggedFromContainer.current;
    draggedFromContainer.current = null;

    // If not dropped on a valid target, do nothing
    if (!over) {
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find where we started and where we ended
    const overContainer = findContainer(overId);

    if (!fromContainer || !overContainer) {
      return;
    }

    // If moving between different columns
    if (
      fromContainer.section !== overContainer.section ||
      fromContainer.stage !== overContainer.stage
    ) {
      setColumns((prev) => {
        // Create deep copies to avoid mutations
        const newColumns = {
          open: { ...prev.open },
          closed: { ...prev.closed },
        };

        // Deep copy the arrays for the affected sections
        newColumns[fromContainer.section] = {
          ...newColumns[fromContainer.section],
          [fromContainer.stage]: [
            ...prev[fromContainer.section][fromContainer.stage],
          ],
        };
        newColumns[overContainer.section] = {
          ...newColumns[overContainer.section],
          [overContainer.stage]: [
            ...prev[overContainer.section][overContainer.stage],
          ],
        };

        const fromItems =
          newColumns[fromContainer.section][fromContainer.stage];
        const toItems = newColumns[overContainer.section][overContainer.stage];

        const fromIndex = fromItems.findIndex(
          (item: Task) => item.id === activeId
        );

        if (fromIndex === -1) {
          console.warn(
            'Item not found in source column - may have already been moved'
          );
          return prev;
        }

        // Remove from source
        const [movedItem] = fromItems.splice(fromIndex, 1);

        // Check if item already exists in destination to prevent duplication
        const existingIndex = toItems.findIndex(
          (item: Task) => item.id === activeId
        );
        if (existingIndex !== -1) {
          console.warn(
            'Item already exists in destination - removing duplicate'
          );
          toItems.splice(existingIndex, 1);
        }

        // Find insertion point in destination
        const toIndex = toItems.findIndex((item: Task) => item.id === overId);

        let insertIndex: number;
        if (overId in newColumns[overContainer.section]) {
          // Dropped on column header, add to end
          insertIndex = toItems.length;
        } else {
          // Dropped on a task, insert at that position
          insertIndex = toIndex >= 0 ? toIndex : toItems.length;
        }

        // Insert at destination
        toItems.splice(insertIndex, 0, movedItem);

        console.log(
          `Moved ${activeId} from ${fromContainer.stage} (${fromItems.length} items) to ${overContainer.stage} (${toItems.length} items)`
        );

        // Track the change
        lastChangedTask.current = {
          taskId: activeId,
          fromColumn: fromContainer.stage,
          toColumn: overContainer.stage,
          position: insertIndex,
        };
        columnsChanged.current = true;

        return newColumns;
      });
    }
    // If reordering within the same column
    else {
      const section = fromContainer.section;
      const stage = fromContainer.stage;

      setColumns((prev) => {
        const items = [...prev[section][stage]];
        const activeIndex = items.findIndex(
          (item: Task) => item.id === activeId
        );
        const overIndex = items.findIndex((item: Task) => item.id === overId);

        if (
          activeIndex === -1 ||
          overIndex === -1 ||
          activeIndex === overIndex
        ) {
          return prev;
        }

        // Use arrayMove for same-column reordering
        const reorderedItems = arrayMove(items, activeIndex, overIndex);

        lastChangedTask.current = {
          taskId: activeId,
          fromColumn: stage,
          toColumn: stage,
          position: overIndex,
        };
        columnsChanged.current = true;

        return {
          ...prev,
          [section]: {
            ...prev[section],
            [stage]: reorderedItems,
          },
        };
      });
    }
  };

  // Handler to add a new stage (column) to the right side
  const handleAddStage = () => {
    setShowAddStageModal(true);
  };

  // Show loading state
  if (isLoading) {
    return (
      <main className="min-h-screen p-4 sm:p-6 md:px-8 lg:px-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
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
              className="px-3 py-2 gap-1 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-[0px_1px_2px_rgba(16,24,40,0.05),_inset_0px_0px_0px_1px_rgba(16,24,40,0.18),_inset_0px_-2px_0px_rgba(16,24,40,0.05)]"
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

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
              <Input placeholder="Search Deals" className="pl-10"></Input>
            </div>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="text-[#344054] font-medium rounded-lg"
              >
                <ArrowUpNarrowWide className="w-4 h-4" color="#344054" />
                <span className="hidden sm:inline">Sort By</span>
              </Button>
            </div>
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

        <AddStageModal
          open={showAddStageModal}
          onClose={() => setShowAddStageModal(false)}
          stages={{
            open: Object.keys(columns.open),
            closed: Object.keys(columns.closed),
          }}
          onAddStage={(section, stageName) => {
            setColumns((prev) => {
              if (stageName in prev[section]) return prev;
              return {
                ...prev,
                [section]: {
                  ...prev[section],
                  [stageName]: [],
                },
              };
            });
          }}
          onRemoveStage={(section, stageName) => {
            setColumns((prev) => {
              const nextSection = { ...prev[section] };
              // Move tasks out? For now, discard tasks when removing stage (mock behavior)
              delete nextSection[stageName];
              return { ...prev, [section]: nextSection };
            });
          }}
          onReorderStages={(section, reorderedStages) => {
            setColumns((prev) => {
              // Get the current section data
              const currentSection = prev[section];
              // Create a new section object with reordered keys
              const reorderedSection: Columns = {};
              reorderedStages.forEach((stageName) => {
                if (currentSection[stageName]) {
                  reorderedSection[stageName] = currentSection[stageName];
                }
              });
              return {
                ...prev,
                [section]: reorderedSection,
              };
            });
          }}
        />

        {currentView === 'list' && (
          <ListView columns={{ ...columns.open, ...columns.closed }} />
        )}

        {currentView === 'calendar' && <CalendarView />}
      </main>
    </>
  );
}
