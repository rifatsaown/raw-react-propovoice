import { Button } from '@/components/ui/button';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import Column from '../Column';
import TaskCard from '../TaskCard';
import type { Columns, Task } from '../types';

interface PipelineViewProps {
  columns: Columns;
  activeId: string | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onAddStage: () => void;
  findTask: (id: string) => Task | undefined;
}

export default function PipelineView({
  columns,
  activeId,
  onDragStart,
  onDragOver,
  onDragEnd,
  onAddStage,
  findTask,
}: PipelineViewProps) {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      {/* Horizontal scroll row for columns */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {/* Map over each column and create a sortable context for its tasks */}
        {Object.keys(columns).map((key) => (
          <div
            key={key}
            className="min-w-[200px] md:min-w-[250px] min-h-[75vh]"
          >
            <SortableContext
              items={columns[key].map((item: Task) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column title={key} tasks={columns[key]} />
            </SortableContext>
          </div>
        ))}
        {/* Add Stage placeholder tile on the far right */}
        <div className="min-w-[200px] md:min-w-[250px]">
          <div
            className="rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 hover:bg-white transition-colors p-1 h-full flex flex-col items-center justify-center cursor-pointer"
            onClick={onAddStage}
            aria-label="Add stage"
            role="button"
          >
            <Button
              variant="outline"
              size="sm"
              className="text-[#344054] font-normal rounded-lg"
            >
              <Plus color="#98A2B3" className="w-4 h-4" />
              <span className="text-sm font-medium">Add stage</span>
            </Button>
          </div>
        </div>
      </div>

      {/* DragOverlay shows a preview of the task being dragged */}
      <DragOverlay>
        {activeId && findTask(activeId) ? (
          <TaskCard task={findTask(activeId)!} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
