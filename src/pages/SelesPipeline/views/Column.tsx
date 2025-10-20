import { useDroppable } from '@dnd-kit/core';
import type { ColumnProps, ColumnType } from '../types.ts';
import { COLUMN_STYLES, DEFAULT_COLUMN_STYLE } from '../types.ts';
import TaskCard from './TaskCard.tsx';

export default function Column({ title, tasks = [] }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  // Get background color based on column title
  const getColumnHeaderStyle = (): string => {
    return COLUMN_STYLES[title as ColumnType] || DEFAULT_COLUMN_STYLE;
  };

  return (
    <div
      className={`${getColumnHeaderStyle()} rounded-2xl shadow-sm p-1 h-full flex flex-col`}
    >
      {/* Column Header */}
      <div className={`py-3 mb-1`}>
        <div className="flex items-center justify-center">
          <h2 className="text-sm font-bold uppercase text-gray-800">{title}</h2>
          <span className="bg-white text-xs font-medium px-2 py-1 rounded-lg text-gray-800 border-2 border-gray-200 ml-2">
            {tasks.length || 0}
          </span>
        </div>
      </div>

      {/* Tasks Container */}
      <div ref={setNodeRef} className="flex-grow overflow-y-auto space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
