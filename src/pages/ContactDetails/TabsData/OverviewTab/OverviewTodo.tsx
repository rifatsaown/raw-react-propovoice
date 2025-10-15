import { HighFlagIcon, LowFlagIcon } from '@/components/Icons';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TodoGroup, TodoItem, User } from '@/interfaces';
import {
  ChevronDown,
  ChevronUp,
  Mail,
  MoreVertical,
  PhoneCall,
  SquareCheck,
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
        return <PhoneCall className="w-3.5 h-3.5" />;
      case 'task':
        return <SquareCheck className="w-3.5 h-3.5" />;
      case 'meeting':
        return <Users className="w-3.5 h-3.5" />;
      case 'email':
        return <Mail className="w-3.5 h-3.5" />;
      default:
        return <SquareCheck className="w-3.5 h-3.5" />;
    }
  };

  const getPriorityColor = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'H':
        return <HighFlagIcon className="w-6 h-6" />;
      case 'M':
        return <LowFlagIcon className="w-6 h-6" />;
      case 'L':
        return <LowFlagIcon className="w-6 h-6" />;
      default:
        return <LowFlagIcon className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: TodoItem['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600';
      case 'doing':
        return 'bg-[#7A5AF8] text-white border-purple-600 hover:bg-purple-600';
      case 'completed':
        return 'bg-green-600 text-white border-green-600 hover:bg-green-600';
      default:
        return 'bg-gray-500 text-white border-gray-500 hover:bg-gray-600';
    }
  };

  const renderTodoItem = (item: TodoItem) => (
    <TableRow key={item.id} className="hover:bg-transparent">
      <TableCell className="w-[20px] align-middle">
        <div className="flex justify-center">
          <Checkbox />
        </div>
      </TableCell>
      <TableCell className="align-middle">
        <div className="">
          <h3 className="text-base font-normal text-[#2D2D3E]">{item.title}</h3>
          <div className="flex items-center gap-4 text-sm text-[#71717A]">
            <span>
              Due Date{' '}
              <span className="text-black font-medium">{item.dueDate}</span>
            </span>
            {item.relationTo && (
              <span>
                Relation to:{' '}
                <span className="text-black font-medium">
                  {item.relationTo}
                </span>
              </span>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="align-middle">
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="border-[#E4E4E7] bg-white text-gray-700 font-normal gap-2 rounded-sm"
          >
            {getActivityIcon(item.activityType)}
            {item.activityType.charAt(0).toUpperCase() +
              item.activityType.slice(1)}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="w-[72px] align-middle">
        <div className="flex items-center gap-1 justify-center">
          {getPriorityColor(item.priority)}
          <span className="text-sm font-semibold text-gray-900">
            {item.priority}
          </span>
        </div>
      </TableCell>
      <TableCell className="w-[120px] align-middle">
        <div className="flex justify-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <button
                className={`${getStatusColor(
                  item.status
                )} hover:text-white font-medium gap-1 px-2 py-1 rounded-sm flex items-center justify-center`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)} 
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Upcoming</DropdownMenuItem>
              <DropdownMenuItem>Doing</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
      <TableCell className="w-[32px] align-middle">
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
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
          className="flex items-center gap-2 mb-4 text-gray-900 hover:text-gray-700 px-4 z-10"
        >
          <span className="font-[600] text-[#101828] z-10">Today</span>
          {todayExpanded ? (
            <ChevronUp className="w-5 h-5 border-2 border-gray-200 rounded-full z-10" />
          ) : (
            <ChevronDown className="w-5 h-5 rounded-full border-2 border-gray-200 z-10" />
          )}
        </button>

        {todayExpanded && todayGroup && todayGroup.items.length > 0 && (
          <div className="-mt-10">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="w-[20px]"></TableHead>
                  <TableHead></TableHead>
                  <TableHead className="text-center text-[#66666F]">Activity Type</TableHead>
                  <TableHead className="text-center text-[#66666F]">Priority</TableHead>
                  <TableHead className="text-center text-[#66666F]">Status</TableHead>
                  <TableHead className="w-[32px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayGroup.items.map((item) => renderTodoItem(item))}
              </TableBody>
            </Table>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                className="text-[#18181B] hover:text-gray-900 font-medium text-lg"
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
              <ChevronUp className="w-5 h-5 border-2 border-gray-200 bg-white rounded-full" />
            ) : (
              <ChevronDown className="w-5 h-5 border-2 border-gray-200 bg-white rounded-full" />
            )}
            <span className="text-sm text-red-500 font-medium">
              {overdueGroup.count} Task{overdueGroup.count !== 1 ? 's' : ''}
            </span>
          </button>

          {overdueExpanded && overdueGroup.items.length > 0 && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[20px]"></TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-center text-gray-400">
                      Activity Type
                    </TableHead>
                    <TableHead className="text-center text-gray-400">
                      Priority
                    </TableHead>
                    <TableHead className="text-center text-gray-400">
                      Status
                    </TableHead>
                    <TableHead className="w-[32px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueGroup.items.map((item) => renderTodoItem(item))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      {/* Next Section */}
      {nextGroup && (
        <div className="mb-4">
          <button
            onClick={() => setNextExpanded(!nextExpanded)}
            className="flex items-center gap-2 w-full  px-4 bg-white rounded-lg text-gray-900 hover:bg-gray-50"
          >
            <span className="font-medium">Next</span>
            {nextExpanded ? (
              <ChevronUp className="w-5 h-5 border-2 border-gray-200 bg-white rounded-full" />
            ) : (
              <ChevronDown className="w-5 h-5 border-2 border-gray-200 bg-white rounded-full" />
            )}
            <span className="text-sm text-gray-500">
              {nextGroup.count} Task{nextGroup.count !== 1 ? 's' : ''}
            </span>
          </button>

          {nextExpanded && nextGroup.items.length > 0 && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[20px]"></TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-center text-gray-400">
                      Activity Type
                    </TableHead>
                    <TableHead className="text-center text-gray-400">
                      Priority
                    </TableHead>
                    <TableHead className="text-center text-gray-400">
                      Status
                    </TableHead>
                    <TableHead className="w-[32px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nextGroup.items.map((item) => renderTodoItem(item))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      {/* Un Scheduled Section */}
      {unscheduledGroup && (
        <div>
          <button
            onClick={() => setUnscheduledExpanded(!unscheduledExpanded)}
            className="flex items-center gap-2 w-full px-4 bg-white rounded-lg text-gray-900 hover:bg-gray-50"
          >
            <span className="font-medium">Un Scheduled</span>
            {unscheduledExpanded ? (
              <ChevronUp className="w-5 h-5 border-2 border-gray-200 bg-white rounded-full" />
            ) : (
              <ChevronDown className="w-5 h-5 border-2 border-gray-200 bg-white rounded-full" />
            )}
            <span className="text-sm text-gray-500">
              {unscheduledGroup.count} Task
              {unscheduledGroup.count !== 1 ? 's' : ''}
            </span>
          </button>

          {unscheduledExpanded && unscheduledGroup.items.length > 0 && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[20px]"></TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-center text-gray-400">
                      Activity Type
                    </TableHead>
                    <TableHead className="text-center text-gray-400">
                      Priority
                    </TableHead>
                    <TableHead className="text-center text-gray-400">
                      Status
                    </TableHead>
                    <TableHead className="w-[32px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unscheduledGroup.items.map((item) => renderTodoItem(item))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OverviewTodo;
