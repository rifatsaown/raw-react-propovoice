import { Button } from '@/components/ui/button';
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import type { PipelineViewProps, Task } from '../types';
import Column from './Column';
import TaskCard from './TaskCard';

export default function PipelineView({
  columns,
  activeId,
  onDragStart,
  onDragOver,
  onDragEnd,
  onAddStage,
  findTask,
}: PipelineViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      {/* Horizontal scroll row for columns - Open and Closed side by side */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {/* Open stages */}
        {Object.keys(columns.open).map((key) => (
          <div
            key={`open-${key}`}
            className="min-w-[200px] md:min-w-[250px] min-h-[75vh]"
          >
            <SortableContext
              items={columns.open[key].map((item: Task) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column title={key} tasks={columns.open[key]} />
            </SortableContext>
          </div>
        ))}

        {/* Closed stages */}
        {Object.keys(columns.closed).map((key) => (
          <div
            key={`closed-${key}`}
            className="min-w-[200px] md:min-w-[250px] min-h-[75vh]"
          >
            <SortableContext
              items={columns.closed[key].map((item: Task) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column title={key} tasks={columns.closed[key]} />
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
