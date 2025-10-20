// ============================================================================
// SALES PIPELINE - COMPREHENSIVE TYPES AND INTERFACES
// ============================================================================

import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';

// ============================================================================
// CORE DATA INTERFACES
// ============================================================================

export interface TeamMember {
  id: number;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  daysAgo: number;
  client?: string;
  clientAvatar: string | null;
  dueDate?: string;
  projectedValue?: number;
  probability?: number;
  industry?: string[];
  design?: boolean;
  priority: TaskPriority;
  team: TeamMember[];
}

export interface Columns {
  [key: string]: Task[];
}

export interface TaskMovement {
  taskId: string;
  fromColumn: string;
  toColumn: string;
  position: number;
}

export interface PipelineViewProps {
  columns: Columns;
  activeId: string | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onAddStage: () => void;
  findTask: (id: string) => Task | undefined;
}

// ============================================================================
// COMPONENT PROPS INTERFACES
// ============================================================================

export interface ColumnProps {
  title: string;
  tasks?: Task[];
}

export interface TaskCardProps {
  task: Task;
}

// ============================================================================
// TYPE UNIONS AND ENUMS
// ============================================================================

export type TaskStatus = 'COLD' | 'WARM' | 'HOT';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type ColumnType =
  | 'QUALIFICATION'
  | 'NEED ANALYSIS'
  | 'PROPOSAL'
  | 'CLOSED WON'
  | 'CLOSED LOST';

// ============================================================================
// CONSTANTS AND CONFIGURATIONS
// ============================================================================

export const STATUS_COLORS: Record<TaskStatus, string> = {
  COLD: 'bg-[#EFF8FF]0 text-[#175CD3] border-[#B2DDFF]',
  WARM: 'bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]',
  HOT: 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]',
};

export const COLUMN_STYLES: Record<ColumnType, string> = {
  QUALIFICATION: 'bg-[#F2F4F7]',
  'NEED ANALYSIS': 'bg-[#F2F4F7]',
  PROPOSAL: 'bg-[#F2F4F7]',
  'CLOSED WON': 'bg-[#EFF5E8]',
  'CLOSED LOST': 'bg-[#F5EDE8]',
};

export const DEFAULT_COLUMN_STYLE = 'bg-[#F2F4F7]';

// ============================================================================
// API AND UTILITY TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface DatabaseUpdateResponse extends ApiResponse {
  success: boolean;
}

// ============================================================================
// DRAG AND DROP TYPES
// ============================================================================

export interface DragState {
  activeId: string | null;
  isUpdating: boolean;
}

export interface DragHandlers {
  onDragStart: (event: DragStartEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
