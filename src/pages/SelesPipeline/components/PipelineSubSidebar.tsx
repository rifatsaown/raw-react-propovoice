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
      className="
        lg:fixed lg:left-16 lg:top-0 lg:h-screen lg:w-60 lg:shadow-sm lg:z-40 lg:mt-12 lg:bg-gradient-to-r lg:from-white lg:to-[#F4F4F5]
        w-full h-full bg-white flex flex-col
      "
      role="complementary"
      aria-label="Pipeline navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:px-4 lg:pt-4 flex-shrink-0 border-b lg:border-b-0 border-gray-100">
        <div className="flex items-center gap-2">
          <h2 className="text-lg lg:text-base font-semibold lg:font-normal text-[#18181B]">
            Pipelines
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 lg:h-8 lg:w-8 hover:bg-gray-100 border-gray-200 shadow-sm lg:shadow-none"
          onClick={handleAddPipeline}
          aria-label="Add new pipeline"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5 text-[#18181B]" />
        </Button>
      </div>

      {/* Pipeline List */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <nav className="p-4 lg:px-3 lg:py-3 space-y-2 lg:space-y-1">
          {pipelines.map((pipeline) => (
            <button
              key={pipeline.id}
              onClick={() => handlePipelineClick(pipeline.id)}
              className={`
                w-full flex items-center justify-between 
                px-4 py-3 lg:px-3 lg:py-2.5 
                rounded-lg lg:rounded-md 
                text-base lg:text-sm font-medium 
                transition-all duration-200 
                hover:bg-gray-50 active:bg-gray-100
                ${
                  activePipeline === pipeline.id
                    ? 'bg-white text-[#18181B] font-semibold lg:font-medium shadow-md lg:shadow-sm border lg:border-0 border-gray-100'
                    : 'text-[#71717A] hover:text-[#09090B] bg-gray-50 lg:bg-transparent'
                }
              `}
              aria-current={activePipeline === pipeline.id ? 'page' : undefined}
            >
              <span className="truncate text-left">{pipeline.name}</span>
              {activePipeline === pipeline.id && (
                <ChevronDown className="w-5 h-5 lg:w-4 lg:h-4 flex-shrink-0 ml-2 text-[#7F56D9]" />
              )}
            </button>
          ))}
        </nav>
      </ScrollArea>

      {/* Mobile-only bottom section with additional actions */}
      <div className="lg:hidden p-4 border-t border-gray-100 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          Tap a pipeline to select it
        </div>
      </div>
    </aside>
  );
}
