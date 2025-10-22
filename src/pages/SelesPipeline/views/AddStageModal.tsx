import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  FolderClosed,
  FolderOpen,
  GripVertical,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface AddStageModalProps {
  open: boolean;
  onClose: () => void;
  onAddStage: (section: 'open' | 'closed', stageName: string) => void;
  onRemoveStage: (section: 'open' | 'closed', stageName: string) => void;
  onReorderStages: (section: 'open' | 'closed', stages: string[]) => void;
  stages: { open: string[]; closed: string[] };
}

// Sortable Stage Item Component
interface SortableStageItemProps {
  stage: string;
  index: number;
  onRemove: () => void;
}

function SortableStageItem({ stage, index, onRemove }: SortableStageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center gap-3 p-3 bg-white border border-[#EAECF0] rounded-lg hover:border-[#D0D5DD] hover:shadow-sm transition-all cursor-move"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-[#98A2B3]" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#344054]">{stage}</span>
          <span className="text-xs text-[#667085] bg-[#F9FAFB] px-2 py-0.5 rounded">
            Stage {index + 1}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="text-[#F04438] hover:text-[#D92D20] hover:bg-[#FEF3F2] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function AddStageModal({
  open,
  onClose,
  onAddStage,
  onRemoveStage,
  onReorderStages,
  stages,
}: AddStageModalProps) {
  const [section, setSection] = useState<'open' | 'closed'>('open');
  const [newStage, setNewStage] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddStage = () => {
    if (newStage.trim()) {
      onAddStage(section, newStage.trim());
      setNewStage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddStage();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = stages[section].indexOf(active.id as string);
      const newIndex = stages[section].indexOf(over.id as string);

      const reorderedStages = arrayMove(stages[section], oldIndex, newIndex);
      onReorderStages(section, reorderedStages);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-[#101828]">
            Manage Pipeline Stages
          </DialogTitle>
          <p className="text-sm text-[#475467] mt-1">
            Organize your sales pipeline by adding or removing stages
          </p>
        </DialogHeader>

        <Tabs
          value={section}
          onValueChange={(val) => setSection(val as 'open' | 'closed')}
          className="w-full"
        >
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2 bg-[#F9FAFB] p-1">
              <TabsTrigger
                value="open"
                className="data-[state=active]:bg-white data-[state=active]:text-[#344054] data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <FolderOpen className="w-4 h-4" />
                Open Stages
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[#F2F4F7] text-[#344054]">
                  {stages.open.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="closed"
                className="data-[state=active]:bg-white data-[state=active]:text-[#344054] data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <FolderClosed className="w-4 h-4" />
                Closed Stages
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[#F2F4F7] text-[#344054]">
                  {stages.closed.length}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="open" className="px-6 pb-6 mt-4">
            <div className="space-y-4">
              {/* Add new stage section */}
              <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#EAECF0]">
                <label className="text-sm font-medium text-[#344054] mb-2 block">
                  Add New Open Stage
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Qualified, Proposal, Negotiation"
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-white"
                  />
                  <Button
                    onClick={handleAddStage}
                    disabled={!newStage.trim()}
                    className="bg-[#7F56D9] hover:bg-[#6941C6] text-white shadow-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Existing stages list */}
              <div>
                <h4 className="text-sm font-medium text-[#344054] mb-3">
                  Current Stages ({stages.open.length})
                </h4>
                <ScrollArea className="h-[280px] pr-4">
                  {stages.open.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <FolderOpen className="w-12 h-12 text-[#98A2B3] mb-3" />
                      <p className="text-sm text-[#667085]">
                        No open stages yet
                      </p>
                      <p className="text-xs text-[#98A2B3] mt-1">
                        Add your first stage above
                      </p>
                    </div>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={stages.open}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {stages.open.map((stage, index) => (
                            <SortableStageItem
                              key={stage}
                              stage={stage}
                              index={index}
                              onRemove={() => onRemoveStage('open', stage)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="closed" className="px-6 pb-6 mt-4">
            <div className="space-y-4">
              {/* Add new stage section */}
              <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#EAECF0]">
                <label className="text-sm font-medium text-[#344054] mb-2 block">
                  Add New Closed Stage
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Deal Won, Deal Lost, Cancelled"
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-white"
                  />
                  <Button
                    onClick={handleAddStage}
                    disabled={!newStage.trim()}
                    className="bg-[#7F56D9] hover:bg-[#6941C6] text-white shadow-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Existing stages list */}
              <div>
                <h4 className="text-sm font-medium text-[#344054] mb-3">
                  Current Stages ({stages.closed.length})
                </h4>
                <ScrollArea className="h-[280px] pr-4">
                  {stages.closed.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <FolderClosed className="w-12 h-12 text-[#98A2B3] mb-3" />
                      <p className="text-sm text-[#667085]">
                        No closed stages yet
                      </p>
                      <p className="text-xs text-[#98A2B3] mt-1">
                        Add your first stage above
                      </p>
                    </div>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={stages.closed}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {stages.closed.map((stage, index) => (
                            <SortableStageItem
                              key={stage}
                              stage={stage}
                              index={index}
                              onRemove={() => onRemoveStage('closed', stage)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="px-6 py-4 border-t bg-[#F9FAFB] flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#D0D5DD] text-[#344054]"
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className="bg-[#7F56D9] hover:bg-[#6941C6] text-white shadow-sm"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
