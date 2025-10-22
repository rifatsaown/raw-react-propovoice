import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';

interface Pipeline {
  id: string;
  name: string;
  isActive: boolean;
}

const initialPipelines: Pipeline[] = [
  { id: '1', name: 'Sales Pipeline', isActive: true },
  { id: '2', name: 'Marketing Sales', isActive: false },
  { id: '3', name: 'Web Sales', isActive: false },
  { id: '4', name: 'Service Sales', isActive: false },
];

export function PipelineSubSidebar() {
  const [pipelines, setPipelines] = useState<Pipeline[]>(initialPipelines);
  const [activePipeline, setActivePipeline] = useState<string>('1');

  const handlePipelineClick = (id: string) => {
    setActivePipeline(id);
  };

  const handleAddPipeline = () => {
    const name = window.prompt('Enter new pipeline name');
    if (name && name.trim()) {
      const newPipeline: Pipeline = {
        id: Date.now().toString(),
        name: name.trim(),
        isActive: false,
      };
      setPipelines([...pipelines, newPipeline]);
    }
  };

  return (
    <aside
      className="fixed left-16 top-0 h-screen w-60 shadow-sm z-40 flex flex-col mt-12 bg-gradient-to-r from-white to-[#F4F4F5]"
      role="complementary"
      aria-label="Pipeline navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-[#18181B]">Pipelines</h2>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 hover:bg-gray-100"
          onClick={handleAddPipeline}
          aria-label="Add new pipeline"
        >
          <Plus className="w-5 h-5 text-[#18181B]" />
        </Button>
      </div>

      {/* Pipeline List */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <nav className="px-3 py-3 space-y-1">
          {pipelines.map((pipeline) => (
            <button
              key={pipeline.id}
              onClick={() => handlePipelineClick(pipeline.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-50 ${
                activePipeline === pipeline.id
                  ? 'bg-white text-[#18181B] font-medium shadow-sm'
                  : 'text-[#71717A] hover:text-[#09090B]'
              }`}
              aria-current={activePipeline === pipeline.id ? 'page' : undefined}
            >
              <span className="truncate">{pipeline.name}</span>
              {activePipeline === pipeline.id && (
                <ChevronDown className="w-4 h-4 flex-shrink-0 ml-2" />
              )}
            </button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
