import { avatar as avatarImg } from '@/assets';
import {
  HighFlagIcon,
  LowFlagIcon,
  MediumFlagIcon,
  MyTaskIcon,
} from '@/components/Icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
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
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  PhoneCall,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type ActivityType = 'call' | 'task';
type Priority = 'H' | 'M' | 'L';
type Status = 'Upcoming' | 'Doing' | 'Completed';
type SectionKey = 'today' | 'overdue' | 'next' | 'unscheduled' | 'completed';

interface Assignee {
  id: string;
  avatarUrl?: string;
  initials: string;
}

interface TaskItem {
  id: string;
  title: string;
  relationLabel: string;
  activityType: ActivityType;
  dueDateLabel?: string;
  assignees: Assignee[];
  priority: Priority;
  status: Status;
  section: SectionKey;
}

async function fetchTasksDemo(): Promise<TaskItem[]> {
  // Simulate API latency
  await new Promise((r) => setTimeout(r, 300));
  return [
    {
      id: 't1',
      title: 'Create Followup Call to Tazkia Foundation',
      relationLabel: 'Deal - Web Design Proje..',
      activityType: 'call',
      dueDateLabel: '20 Dec 2024',
      assignees: [
        { id: 'a1', avatarUrl: avatarImg, initials: 'AF' },
        { id: 'a2', avatarUrl: avatarImg, initials: 'BR' },
      ],
      priority: 'H',
      status: 'Upcoming',
      section: 'today',
    },
    {
      id: 't2',
      title: 'Create Followup Call to Tazkia Foundation',
      relationLabel: 'Deal - Web Design Proje..',
      activityType: 'call',
      dueDateLabel: '20 Dec 2024',
      assignees: [
        { id: 'a1', avatarUrl: avatarImg, initials: 'AF' },
        { id: 'a2', avatarUrl: avatarImg, initials: 'BR' },
      ],
      priority: 'H',
      status: 'Upcoming',
      section: 'today',
    },
    {
      id: 't3',
      title: 'Create Followup Call to Tazkia Foundation',
      relationLabel: 'Deal - Web Design Proje..',
      activityType: 'call',
      dueDateLabel: '20 Dec 2024',
      assignees: [
        { id: 'a1', avatarUrl: avatarImg, initials: 'AF' },
        { id: 'a2', avatarUrl: avatarImg, initials: 'BR' },
      ],
      priority: 'H',
      status: 'Upcoming',
      section: 'today',
    },
    {
      id: 't2',
      title: 'Prepare Proposal to Send',
      relationLabel: 'Deal - Web Design Proje..',
      activityType: 'task',
      dueDateLabel: '20 Dec 2024',
      assignees: [
        { id: 'a1', avatarUrl: avatarImg, initials: 'AF' },
        { id: 'a2', avatarUrl: avatarImg, initials: 'BR' },
      ],
      priority: 'L',
      status: 'Doing',
      section: 'today',
    },
    {
      id: 'o1',
      title: 'Share Website Wireframes for Review',
      relationLabel: 'Deal - Web Design Project',
      activityType: 'call',
      dueDateLabel: '20 Dec 2024',
      assignees: [
        { id: 'a1', avatarUrl: avatarImg, initials: 'AF' },
        { id: 'a2', avatarUrl: avatarImg, initials: 'BR' },
      ],
      priority: 'H',
      status: 'Doing',
      section: 'overdue',
    },
    {
      id: 'o2',
      title: 'Send staging site access to client',
      relationLabel: 'Deal - Web Design Project',
      activityType: 'call',
      dueDateLabel: '20 Dec 2024',
      assignees: [
        { id: 'a1', avatarUrl: avatarImg, initials: 'AF' },
        { id: 'a2', avatarUrl: avatarImg, initials: 'BR' },
      ],
      priority: 'H',
      status: 'Doing',
      section: 'overdue',
    },
    {
      id: 'o3',
      title: 'Follow up on domain purchase confirmation',
      relationLabel: 'Deal - Web Design Project',
      activityType: 'call',
      dueDateLabel: '20 Dec 2024',
      assignees: [
        { id: 'a1', avatarUrl: avatarImg, initials: 'AF' },
        { id: 'a2', avatarUrl: avatarImg, initials: 'BR' },
      ],
      priority: 'H',
      status: 'Doing',
      section: 'overdue',
    },
    {
      id: 'c1',
      title: 'Send final invoice to client',
      relationLabel: 'Deal - Web Design Project',
      activityType: 'task',
      dueDateLabel: '18 Dec 2024',
      assignees: [{ id: 'a1', avatarUrl: avatarImg, initials: 'AF' }],
      priority: 'M',
      status: 'Completed',
      section: 'completed',
    },
    {
      id: 'c2',
      title: 'Wrap up onboarding call',
      relationLabel: 'Deal - Onboarding',
      activityType: 'call',
      dueDateLabel: '17 Dec 2024',
      assignees: [{ id: 'a2', avatarUrl: avatarImg, initials: 'BR' }],
      priority: 'L',
      status: 'Completed',
      section: 'completed',
    },
  ];
}

export default function ToDoTab() {
  const [todayExpanded, setTodayExpanded] = useState(true);
  const [overdueExpanded, setOverdueExpanded] = useState(true);
  const [nextExpanded, setNextExpanded] = useState(false);
  const [unscheduledExpanded, setUnscheduledExpanded] = useState(false);
  const [completedExpanded, setCompletedExpanded] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchTasksDemo()
      .then((data) => {
        if (!isMounted) return;
        setTasks(data);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('Failed to load tasks');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const grouped = useMemo(() => {
    return {
      today: tasks.filter((t) => t.section === 'today'),
      overdue: tasks.filter((t) => t.section === 'overdue'),
      next: tasks.filter((t) => t.section === 'next'),
      unscheduled: tasks.filter((t) => t.section === 'unscheduled'),
      completed: tasks.filter((t) => t.section === 'completed'),
    } as Record<SectionKey, TaskItem[]>;
  }, [tasks]);

  function renderActivityBadge(type: ActivityType) {
    if (type === 'call') {
      return (
        <Badge
          variant="outline"
          className="border-[#E4E4E7] bg-white text-gray-700 font-normal gap-2 rounded-sm"
        >
          <PhoneCall className="w-3.5 h-3.5" /> Call
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="border-[#E4E4E7] bg-white text-gray-700 font-normal gap-2 rounded-sm"
      >
        <MyTaskIcon className="w-3.5 h-3.5" /> Task
      </Badge>
    );
  }

  function renderStatusButton(status: Status) {
    const base =
      'font-normal gap-1 px-2 py-0.5 rounded-sm flex items-center gap-1';
    if (status === 'Upcoming')
      return (
        <button
          className={` bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:text-white ${base}`}
        >
          To-Do <ChevronDown className="w-4 h-4" />
        </button>
      );
    if (status === 'Doing')
      return (
        <button
          className={`bg-[#7A5AF8] text-white border-purple-600 hover:bg-purple-600 hover:text-white ${base}`}
        >
          Doing <ChevronDown className="w-4 h-4" />
        </button>
      );
    return (
      <Button
        variant="outline"
        className={`bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600 hover:text-white ${base}`}
      >
        Completed <ChevronDown className="w-4 h-4" />
      </Button>
    );
  }

  function renderPriority(priority: Priority) {
    return (
      <div className="flex items-center gap-1 justify-center">
        {priority === 'H' && <HighFlagIcon className={`w-4 h-4`} />}
        {priority === 'M' && <MediumFlagIcon className={`w-4 h-4`} />}
        {priority === 'L' && <LowFlagIcon className={`w-4 h-4`} />}
        <span className="text-sm font-semibold text-gray-900">{priority}</span>
      </div>
    );
  }

  function renderAssignees(items: Assignee[]) {
    return (
      <div className="inline-flex -space-x-2">
        {items.map((a) => (
          <Avatar key={a.id} className="size-6 border">
            <AvatarImage src={a.avatarUrl} alt="Assignee" />
            <AvatarFallback>{a.initials}</AvatarFallback>
          </Avatar>
        ))}
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-6 rounded-full border -ml-1"
        >
          +
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-[#18181B]">Todo</h1>
          <div className="flex items-center gap-4">
            <button className="bg-[#71717A] text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
              Create Task{' '}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Todo */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-5">
          <ButtonGroup>
            <Button variant="outline" className="bg-gray-200">
              All
            </Button>
            <Button variant="outline" className="text-[#71717A]">
              Up Coming
            </Button>
            <Button variant="outline" className="text-[#71717A]">
              Doing
            </Button>
            <Button variant="outline" className="text-[#71717A]">
              Overdue
            </Button>
            <Button variant="outline" className="text-[#71717A]">
              Done
            </Button>
          </ButtonGroup>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-[#344054]">View As a:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-8 gap-1">
                  Due Date
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Due Date</DropdownMenuItem>
                <DropdownMenuItem>Created Date</DropdownMenuItem>
                <DropdownMenuItem>Priority</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Today Section */}
        <div className=" z-10">
          <button
            onClick={() => setTodayExpanded(!todayExpanded)}
            className="z-50 flex items-center gap-2 mb-4 text-gray-900 hover:text-gray-700 px-4"
          >
            <span className="font-medium">Today</span>
            {todayExpanded ? (
              <ChevronUp className="w-5 h-5 border-2 border-gray-200 rounded-full z-10" />
            ) : (
              <ChevronDown className="w-5 h-5 rounded-full border-2 border-gray-200 z-10" />
            )}
          </button>

          {todayExpanded && (
            <div className="-mt-12">
              <Table className="table-fixed [&_th]:text-[#66666F]">
                <TableHeader>
                  <TableRow className="border-b border-white">
                    <TableHead className="w-[20px]"></TableHead>
                    <TableHead className="w-[420px]"></TableHead>
                    <TableHead className="text-center w-[110px] text-[#66666F]">
                      Activity Type
                    </TableHead>
                    <TableHead className="text-center w-[130px] text-[#66666F]">
                      Due Date
                    </TableHead>
                    <TableHead className="text-center w-[120px] text-[#66666F]">
                      Assigned
                    </TableHead>
                    <TableHead className="w-[72px] text-center text-[#66666F]">
                      Priority
                    </TableHead>
                    <TableHead className="w-[120px] pl-6 text-[#66666F]">
                      Status
                    </TableHead>
                    <TableHead className="w-[32px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="py-6 text-center text-sm text-gray-500"
                      >
                        Loading tasks...
                      </TableCell>
                    </TableRow>
                  )}
                  {error && !isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="py-6 text-center text-sm text-red-500"
                      >
                        {error}
                      </TableCell>
                    </TableRow>
                  )}
                  {!isLoading &&
                    !error &&
                    grouped.today.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div className="flex justify-center">
                            <Checkbox />
                          </div>
                        </TableCell>
                        <TableCell className="align-middle whitespace-normal break-words">
                          <div className="max-w-[400px]">
                            <h3 className="text-base font-normal text-[#18181B]">
                              {task.title}
                            </h3>
                            <div className="text-sm text-[#71717A]">
                              Relation to:{' '}
                              <span className="text-[#18181B]">
                                {task.relationLabel}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="align-middle">
                          <div className="flex justify-center">
                            {renderActivityBadge(task.activityType)}
                          </div>
                        </TableCell>
                        <TableCell className="align-middle text-center">
                          <span className="inline-flex items-center gap-2 text-sm text-gray-900">
                            <Calendar className="w-4 h-4 text-gray-500" />{' '}
                            {task.dueDateLabel}
                          </span>
                        </TableCell>
                        <TableCell className="align-middle text-center">
                          {renderAssignees(task.assignees)}
                        </TableCell>
                        <TableCell className="w-[72px] align-middle text-center pr-4">
                          {renderPriority(task.priority)}
                        </TableCell>
                        <TableCell className="w-[120px] align-middle text-center pl-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              {renderStatusButton(task.status)}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Upcoming</DropdownMenuItem>
                              <DropdownMenuItem>Doing</DropdownMenuItem>
                              <DropdownMenuItem>Completed</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell className="w-[32px] align-middle">
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
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  className="text-[#18181B] hover:text-gray-900 font-medium"
                >
                  Load More
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Overdue Section */}
        <div className="mb-4 bg-[#FFF7ED] rounded-lg p-2 border border-[#FAA151]">
          <button
            onClick={() => setOverdueExpanded(!overdueExpanded)}
            className="z-10 flex items-center gap-2 w-full  px-4 rounded-lg text-gray-900 hover:bg-orange-50"
          >
            <span className="font-medium z-10">Overdue</span>
            {overdueExpanded ? (
              <ChevronUp className="w-5 h-5 border-2 border-gray-200 bg-white rounded-full z-10" />
            ) : (
              <ChevronDown className="w-5 h-5 border-2 border-gray-200 bg-white rounded-full z-10" />
            )}
            <span className="text-sm text-red-500 font-medium z-10">
              2 Task
            </span>
          </button>

          {overdueExpanded && (
            <div className="-mt-9">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow className="border-b border-white">
                    <TableHead className="w-[20px]"></TableHead>
                    <TableHead className="w-[420px]"></TableHead>
                    <TableHead className="w-[110px]"></TableHead>
                    <TableHead className="w-[130px]"></TableHead>
                    <TableHead className="w-[120px]"></TableHead>
                    <TableHead className="w-[72px]"></TableHead>
                    <TableHead className="w-[120px]"></TableHead>
                    <TableHead className="w-[32px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="py-6 text-center text-sm text-gray-500"
                      >
                        Loading tasks...
                      </TableCell>
                    </TableRow>
                  )}
                  {error && !isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="py-6 text-center text-sm text-red-500"
                      >
                        {error}
                      </TableCell>
                    </TableRow>
                  )}
                  {!isLoading &&
                    !error &&
                    grouped.overdue.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="w-[20px] align-middle">
                          <div className="flex justify-center">
                            <Checkbox />
                          </div>
                        </TableCell>
                        <TableCell className="align-middle whitespace-normal break-words">
                          <div className="space-y-1 max-w-[400px]">
                            <h3 className="text-base font-normal text-gray-900">
                              {task.title}
                            </h3>
                            <div className="text-sm text-[#71717A]">
                              Relation to:{' '}
                              <span className="text-gray-900">
                                {task.relationLabel}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="align-middle">
                          <div className="flex justify-center">
                            {renderActivityBadge(task.activityType)}
                          </div>
                        </TableCell>
                        <TableCell className="align-middle text-center">
                          <span className="inline-flex items-center gap-2 text-sm text-gray-900">
                            <Calendar className="w-4 h-4 text-gray-500" />{' '}
                            {task.dueDateLabel}
                          </span>
                        </TableCell>
                        <TableCell className="align-middle text-center">
                          {renderAssignees(task.assignees)}
                        </TableCell>
                        <TableCell className="w-[72px] align-middle text-center pr-4">
                          {renderPriority(task.priority)}
                        </TableCell>
                        <TableCell className="w-[120px] align-middle text-center pl-4">
                          {renderStatusButton(task.status)}
                        </TableCell>
                        <TableCell className="w-[32px] align-middle">
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
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Next Section */}
        <div>
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
              {grouped.next.length} Task
            </span>
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
            <span className="text-sm text-gray-500">
              {grouped.unscheduled.length} Task
            </span>
          </button>
        </div>

        {/* Completed Section */}
        <div>
          <button
            onClick={() => setCompletedExpanded(!completedExpanded)}
            className="flex items-center gap-2 w-full py-3 px-4 bg-white rounded-lg text-gray-900 hover:bg-gray-50"
          >
            <span className="font-medium">Done</span>
            {completedExpanded ? (
              <ChevronUp className="w-4 h-4 rounded-full border-2 border-gray-200" />
            ) : (
              <ChevronDown className="w-4 h-4 rounded-full border-2 border-gray-200" />
            )}
            <span className="text-sm text-gray-500">
              {grouped?.completed?.length} Task
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
