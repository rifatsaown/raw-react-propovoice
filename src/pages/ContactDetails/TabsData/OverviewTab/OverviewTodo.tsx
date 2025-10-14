import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Flag,
  MoreVertical,
  Phone,
} from 'lucide-react';
import { useState } from 'react';

function OverviewTodo() {
  const [todayExpanded, setTodayExpanded] = useState(true);
  const [overdueExpanded, setOverdueExpanded] = useState(false);
  const [nextExpanded, setNextExpanded] = useState(false);
  const [unscheduledExpanded, setUnscheduledExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-5 text-gray-900">To Do</h2>

      {/* Today Section */}
      <div className="mb-4">
        <button
          onClick={() => setTodayExpanded(!todayExpanded)}
          className="flex items-center gap-2 mb-4 text-gray-900 hover:text-gray-700 px-4"
        >
          <span className="font-medium">Today</span>
          {todayExpanded ? (
            <ChevronUp className="w-4 h-4 border-2 border-gray-200 rounded-full" />
          ) : (
            <ChevronDown className="w-4 h-4 rounded-full border-2 border-gray-200 " />
          )}
        </button>

        {todayExpanded && (
          <div className="space-y-0 -mt-8">
            {/* Table Header */}
            <div className="grid grid-cols-[20px_1fr_120px_72px_120px_32px] gap-6 items-center pb-2 mb-2 border-b border-gray-200">
              <div className="w-4 justify-self-center" />
              <div />
              <div className="text-sm font-medium text-gray-400 justify-self-center">
                Activity Type
              </div>
              <div className="text-sm font-medium text-gray-400 justify-self-center">
                Priority
              </div>
              <div className="text-sm font-medium text-gray-400 justify-self-center">
                Status
              </div>
              <div className="w-8 justify-self-center" />
            </div>

            {/* Task 1 */}
            <div className="grid grid-cols-[20px_1fr_120px_72px_120px_32px] gap-6 items-center py-4 border-b border-gray-100">
              <Checkbox className="justify-self-center" />

              <div className="space-y-1">
                <h3 className="text-base font-normal text-gray-900">
                  Create Followup Call to Tazkia Foundation
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    Due Date <span className="text-gray-900">20 Dec 2024</span>
                  </span>
                  <span>
                    Relation to:{' '}
                    <span className="text-gray-900">
                      Deal - Web Design Proje..
                    </span>
                  </span>
                </div>
              </div>

              <Badge
                variant="outline"
                className="border-gray-300 bg-white text-gray-700 font-normal gap-2 justify-self-center"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </Badge>

              <div className="flex items-center gap-1 justify-self-center">
                <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                <span className="text-sm font-semibold text-gray-900">H</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:text-white font-medium gap-1 justify-self-center"
                  >
                    Upcoming
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Upcoming</DropdownMenuItem>
                  <DropdownMenuItem>Doing</DropdownMenuItem>
                  <DropdownMenuItem>Completed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="justify-self-center"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Task 2 */}
            <div className="grid grid-cols-[20px_1fr_120px_72px_120px_32px] gap-6 items-center py-4">
              <Checkbox className="justify-self-center" />

              <div className="space-y-1">
                <h3 className="text-base font-normal text-gray-900">
                  Prepare Proposal to Send
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    Due Date <span className="text-gray-900">20 Dec 2024</span>
                  </span>
                  <span>
                    Relation to:{' '}
                    <span className="text-gray-900">
                      Deal - Web Design Proje..
                    </span>
                  </span>
                </div>
              </div>

              <Badge
                variant="outline"
                className="border-gray-300 bg-white text-gray-700 font-normal gap-2 justify-self-center"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Task
              </Badge>

              <div className="flex items-center gap-1 justify-self-center">
                <Flag className="w-4 h-4 text-green-500 fill-green-500" />
                <span className="text-sm font-semibold text-gray-900">L</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-purple-600 text-white border-purple-600 hover:bg-purple-600 hover:text-white font-medium gap-1 justify-self-center"
                  >
                    Doing
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Upcoming</DropdownMenuItem>
                  <DropdownMenuItem>Doing</DropdownMenuItem>
                  <DropdownMenuItem>Completed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="justify-self-center"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Load More Button */}
            <div className="flex justify-center pt-4">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Load More
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Overdue Section */}
      <div className="mb-4">
        <button
          onClick={() => setOverdueExpanded(!overdueExpanded)}
          className="flex items-center gap-2 w-full py-3 px-4 bg-orange-100 rounded-lg text-gray-900 hover:bg-orange-50"
        >
          <span className="font-medium">Overdue</span>
          {overdueExpanded ? (
            <ChevronUp className="w-4 h-4 rounded-full border-2 border-gray-200" />
          ) : (
            <ChevronDown className="w-4 h-4 rounded-full border-2 border-gray-200" />
          )}
          <span className="text-sm text-red-500">2 Task</span>
        </button>
      </div>

      {/* Next Section */}
      <div className="mb-4">
        <button
          onClick={() => setNextExpanded(!nextExpanded)}
          className="flex items-center gap-2 w-full py-3 px-4 bg-white rounded-lg text-gray-900 hover:bg-gray-50"
        >
          <span className="font-medium">Next</span>
          {nextExpanded ? (
            <ChevronUp className="w-4 h-4 rounded-full border-2 border-gray-200" />
          ) : (
            <ChevronDown className="w-4 h-4 rounded-full border-2 border-gray-200" />
          )}
          <span className="text-sm text-gray-500">2 Task</span>
        </button>
      </div>

      {/* Un Scheduled Section */}
      <div>
        <button
          onClick={() => setUnscheduledExpanded(!unscheduledExpanded)}
          className="flex items-center gap-2 w-full py-3 px-4 bg-white rounded-lg text-gray-900 hover:bg-gray-50"
        >
          <span className="font-medium">Un Scheduled</span>
          {unscheduledExpanded ? (
            <ChevronUp className="w-4 h-4 rounded-full border-2 border-gray-200" />
          ) : (
            <ChevronDown className="w-4 h-4 rounded-full border-2 border-gray-200" />
          )}
          <span className="text-sm text-gray-500">2 Task</span>
        </button>
      </div>
    </div>
  );
}

export default OverviewTodo;
