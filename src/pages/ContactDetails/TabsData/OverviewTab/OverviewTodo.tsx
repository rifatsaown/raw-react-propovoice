import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { TodoGroup, TodoItem, User } from '@/interfaces';
import {
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Flag,
  Mail,
  MoreVertical,
  Phone,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface OverviewTodoProps {
  user: User;
}

function OverviewTodo({ user }: OverviewTodoProps) {
  const [todayExpanded, setTodayExpanded] = useState(true);
  const [overdueExpanded, setOverdueExpanded] = useState(false);
  const [nextExpanded, setNextExpanded] = useState(false);
  const [unscheduledExpanded, setUnscheduledExpanded] = useState(false);
  const [todoData, setTodoData] = useState<TodoGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: Replace with actual API call
        // const response = await fetch(`/api/users/${user.id}/todos`);
        // if (!response.ok) throw new Error('Failed to fetch todo data');
        // const data = await response.json();

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API call
        const mockData: TodoGroup[] = [
          {
            category: 'today',
            count: 2,
            items: [
              {
                id: '1',
                title: 'Create Followup Call to Tazkia Foundation',
                dueDate: '20 Dec 2024',
                relationTo: 'Deal - Web Design Proje..',
                activityType: 'call',
                priority: 'H',
                status: 'upcoming',
                completed: false,
              },
              {
                id: '2',
                title: 'Prepare Proposal to Send',
                dueDate: '20 Dec 2024',
                relationTo: 'Deal - Web Design Proje..',
                activityType: 'task',
                priority: 'L',
                status: 'doing',
                completed: false,
              },
            ],
          },
          {
            category: 'overdue',
            count: 2,
            items: [],
          },
          {
            category: 'next',
            count: 2,
            items: [],
          },
          {
            category: 'unscheduled',
            count: 2,
            items: [],
          },
        ];

        setTodoData(mockData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load todo data'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchTodoData();
    }
  }, [user]);

  const getActivityIcon = (type: TodoItem['activityType']) => {
    switch (type) {
      case 'call':
        return <Phone className="w-3.5 h-3.5" />;
      case 'task':
        return <CheckSquare className="w-3.5 h-3.5" />;
      case 'meeting':
        return <Users className="w-3.5 h-3.5" />;
      case 'email':
        return <Mail className="w-3.5 h-3.5" />;
      default:
        return <CheckSquare className="w-3.5 h-3.5" />;
    }
  };

  const getPriorityColor = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'H':
        return 'text-red-500 fill-red-500';
      case 'M':
        return 'text-yellow-500 fill-yellow-500';
      case 'L':
        return 'text-green-500 fill-green-500';
      default:
        return 'text-gray-500 fill-gray-500';
    }
  };

  const getStatusColor = (status: TodoItem['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600';
      case 'doing':
        return 'bg-purple-600 text-white border-purple-600 hover:bg-purple-600';
      case 'completed':
        return 'bg-green-600 text-white border-green-600 hover:bg-green-600';
      default:
        return 'bg-gray-500 text-white border-gray-500 hover:bg-gray-600';
    }
  };

  const renderTodoItem = (item: TodoItem) => (
    <div
      key={item.id}
      className="grid grid-cols-[20px_1fr_120px_72px_120px_32px] gap-6 items-center py-4 border-b border-gray-100 last:border-b-0"
    >
      <Checkbox checked={item.completed} className="justify-self-center" />

      <div className="space-y-1">
        <h3 className="text-base font-normal text-gray-900">{item.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>
            Due Date <span className="text-gray-900">{item.dueDate}</span>
          </span>
          {item.relationTo && (
            <span>
              Relation to:{' '}
              <span className="text-gray-900">{item.relationTo}</span>
            </span>
          )}
        </div>
      </div>

      <Badge
        variant="outline"
        className="border-gray-300 bg-white text-gray-700 font-normal gap-2 justify-self-center"
      >
        {getActivityIcon(item.activityType)}
        {item.activityType.charAt(0).toUpperCase() + item.activityType.slice(1)}
      </Badge>

      <div className="flex items-center gap-1 justify-self-center">
        <Flag className={`w-4 h-4 ${getPriorityColor(item.priority)}`} />
        <span className="text-sm font-semibold text-gray-900">
          {item.priority}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`${getStatusColor(
              item.status
            )} hover:text-white font-medium gap-1 justify-self-center`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
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
  );

  const todayGroup = todoData.find((g) => g.category === 'today');
  const overdueGroup = todoData.find((g) => g.category === 'overdue');
  const nextGroup = todoData.find((g) => g.category === 'next');
  const unscheduledGroup = todoData.find((g) => g.category === 'unscheduled');

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium mb-5 text-gray-900">To Do</h2>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading todos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium mb-5 text-gray-900">To Do</h2>
        <div className="flex items-center justify-center py-8">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-2xl font-medium mb-5 text-gray-900 ml-3">To Do</h2>

      {/* Today Section */}
      <div className="mb-4">
        <button
          onClick={() => setTodayExpanded(!todayExpanded)}
          className="flex items-center gap-2 mb-4 text-gray-900 hover:text-gray-700 px-4"
        >
          <span className="font-[600] text-[#101828]">Today</span>
          {todayExpanded ? (
            <ChevronUp className="w-5 h-5 border-2 border-gray-200 rounded-full" />
          ) : (
            <ChevronDown className="w-5 h-5 rounded-full border-2 border-gray-200 " />
          )}
        </button>

        {todayExpanded && todayGroup && todayGroup.items.length > 0 && (
          <div className="space-y-0 -mt-10">
            {/* Table Header */}
            <div className="grid grid-cols-[20px_1fr_120px_72px_120px_32px] gap-6 items-center pb-2 mb-2 border-b border-gray-200">
              <div className="w-4 justify-self-center" />
              <div />
              <div className="text-sm font-medium text-[#66666F] justify-self-center">
                Activity Type
              </div>
              <div className="text-sm font-medium text-[#66666F] justify-self-center">
                Priority
              </div>
              <div className="text-sm font-medium text-[#66666F] justify-self-center">
                Status
              </div>
              <div className="w-8 justify-self-center" />
            </div>

            {/* Render Todo Items */}
            {todayGroup.items.map((item) => renderTodoItem(item))}

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
      {overdueGroup && (
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
            <span className="text-sm text-red-500">
              {overdueGroup.count} Task{overdueGroup.count !== 1 ? 's' : ''}
            </span>
          </button>

          {overdueExpanded && overdueGroup.items.length > 0 && (
            <div className="space-y-0 mt-4">
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

              {/* Render Todo Items */}
              {overdueGroup.items.map((item) => renderTodoItem(item))}
            </div>
          )}
        </div>
      )}

      {/* Next Section */}
      {nextGroup && (
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
            <span className="text-sm text-gray-500">
              {nextGroup.count} Task{nextGroup.count !== 1 ? 's' : ''}
            </span>
          </button>

          {nextExpanded && nextGroup.items.length > 0 && (
            <div className="space-y-0 mt-4">
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

              {/* Render Todo Items */}
              {nextGroup.items.map((item) => renderTodoItem(item))}
            </div>
          )}
        </div>
      )}

      {/* Un Scheduled Section */}
      {unscheduledGroup && (
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
            <span className="text-sm text-gray-500">
              {unscheduledGroup.count} Task
              {unscheduledGroup.count !== 1 ? 's' : ''}
            </span>
          </button>

          {unscheduledExpanded && unscheduledGroup.items.length > 0 && (
            <div className="space-y-0 mt-4">
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

              {/* Render Todo Items */}
              {unscheduledGroup.items.map((item) => renderTodoItem(item))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OverviewTodo;
