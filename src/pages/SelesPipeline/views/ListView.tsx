import { HighFlagIcon, LowFlagIcon, MediumFlagIcon } from '@/components/Icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Archive,
  Briefcase,
  CheckSquare,
  ChevronDown,
  Copy,
  EllipsisVertical,
  Eye,
  Mail,
  Phone,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import type { Columns, Task } from '../types';

interface ListViewProps {
  columns: Columns;
}

export default function ListView({ columns }: ListViewProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Helper function to get all tasks from all columns
  const getAllTasks = (): Task[] => {
    return Object.values(columns).flat();
  };

  // Helper function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to get status badge color
  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case 'COLD':
        return 'bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]';
      case 'WARM':
        return 'bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]';
      case 'HOT':
        return 'bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get stage badge color
  const getStageBadgeColor = (stage: string): string => {
    switch (stage) {
      case 'Qualified':
        return 'bg-[#2563EB] text-white';
      case 'Proposal':
        return 'bg-[#7C3AED] text-white';
      case 'In Negotiation':
        return 'bg-[#EA580C] text-white';
      case 'Need analysis':
        return 'bg-[#0891B2] text-white';
      case 'Deal Own':
        return 'bg-[#059669] text-white';
      case 'Deal Lost':
        return 'bg-[#DC2626] text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get priority flag icon
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <HighFlagIcon className="w-4 h-4" />;
      case 'Medium':
        return <MediumFlagIcon className="w-4 h-4" />;
      case 'Low':
        return <LowFlagIcon className="w-4 h-4" />;
      default:
        return <HighFlagIcon className="w-4 h-4" />;
    }
  };

  // Get current stage for a task
  const getTaskStage = (task: Task): string => {
    return (
      Object.keys(columns).find((key) =>
        columns[key].some((t) => t.id === task.id)
      ) || 'Unknown'
    );
  };

  // Pagination
  const allTasks = getAllTasks();
  const pageCount = Math.ceil(allTasks.length / rowsPerPage);
  const paginatedTasks = allTasks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Check if all visible rows are selected
  const allSelected =
    paginatedTasks.length > 0 &&
    paginatedTasks.every((task) => selectedRows.includes(task.id));

  // Check if some but not all visible rows are selected
  const someSelected =
    paginatedTasks.some((task) => selectedRows.includes(task.id)) &&
    !allSelected;

  // Toggle all rows selection
  const toggleAllRows = (checked: boolean) => {
    if (checked) {
      const visibleIds = paginatedTasks.map((task) => task.id);
      setSelectedRows((prev) => {
        const newSelected = [...prev];
        visibleIds.forEach((id) => {
          if (!newSelected.includes(id)) {
            newSelected.push(id);
          }
        });
        return newSelected;
      });
    } else {
      const visibleIds = paginatedTasks.map((task) => task.id);
      setSelectedRows((prev) => {
        const filtered = prev.filter((id) => !visibleIds.includes(id));
        return filtered;
      });
    }
  };

  // Toggle single row selection
  const toggleRowSelection = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => {
        const newSelected = [...prev, id];
        return newSelected;
      });
    } else {
      setSelectedRows((prev) => {
        const filtered = prev.filter((rowId) => rowId !== id);
        return filtered;
      });
    }
  };

  // Pagination helpers
  const goToPage = (p: number) => {
    if (p < 1 || p > pageCount) return;
    setPage(p);
  };

  const pageButtons = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(pageCount, page + 1); i++) {
    pageButtons.push(i);
  }

  return (
    <div className="bg-white">
      <div className="rounded-lg border">
        <Table>
          <TableHeader className="bg-[#F4F4F5]">
            <TableRow className="hover:bg-[#F4F4F5]">
              <TableHead className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={
                      allSelected
                        ? true
                        : someSelected
                        ? 'indeterminate'
                        : false
                    }
                    onCheckedChange={toggleAllRows}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=indeterminate]:bg-transparent data-[state=indeterminate]:border-gray-300 border-gray-300"
                  />
                  <span className="flex items-center gap-1 font-medium text-[#475467]">
                    Name
                  </span>
                </div>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 font-medium text-[#344054]">
                  Contact
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 font-medium text-[#344054]">
                  Projected Value
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 font-medium text-[#344054]">
                  Lead Type
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 font-medium text-[#344054]">
                  Probability
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 font-medium text-[#344054]">
                  Priority
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 font-medium text-[#344054]">
                  Owner & Assignee
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 font-medium text-[#344054]">
                  Stage
                </span>
              </TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedRows.includes(task.id)}
                      onCheckedChange={(checked) =>
                        toggleRowSelection(task.id, !!checked)
                      }
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 border-gray-300"
                    />
                    <span className="text-sm font-medium" title={task.title}>
                      {task.title.length > 25
                        ? `${task.title.substring(0, 25)}...`
                        : task.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    {task.clientAvatar ? (
                      <img
                        src={task.clientAvatar}
                        alt={task.client}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium">
                        {task.client?.charAt(0) || 'N'}
                      </div>
                    )}
                    <span className="text-sm">{task.client || 'N/A'}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-sm">
                    {task.projectedValue
                      ? formatCurrency(task.projectedValue)
                      : 'N/A'}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${getStatusBadgeColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{task.probability || 0}%</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${task.probability || 0}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-1">
                    {getPriorityIcon(task.priority)}
                    <span className="text-sm font-semibold">
                      {task.priority === 'High'
                        ? 'H'
                        : task.priority === 'Medium'
                        ? 'M'
                        : 'L'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center -space-x-2">
                    {task.team.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        className="h-8 w-8 border-2 border-white ring-1 ring-gray-100"
                      >
                        {member.avatar ? (
                          <AvatarImage src={member.avatar} />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 text-xs font-medium">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    ))}
                    {task.team.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-100 flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-600">
                          +{task.team.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-white text-sm font-medium rounded-sm transition-colors ${getStageBadgeColor(
                          getTaskStage(task)
                        )}`}
                      >
                        {getTaskStage(task)}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Need analysis</DropdownMenuItem>
                      <DropdownMenuItem>Qualified</DropdownMenuItem>
                      <DropdownMenuItem>Proposal</DropdownMenuItem>
                      <DropdownMenuItem>In Negotiation</DropdownMenuItem>
                      <DropdownMenuItem>Deal Own</DropdownMenuItem>
                      <DropdownMenuItem>Deal Lost</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <EllipsisVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Mail
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckSquare className="w-4 h-4 mr-2" />
                        Create task & Activity
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Briefcase className="w-4 h-4 mr-2" />
                        Convert as a Project
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="w-4 h-4 mr-2" />
                        Archived
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 text-sm">
        <div className="text-sm text-[#344054]">
          Page {page} of {pageCount}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
            className="text-sm px-3"
          >
            &lt;
          </Button>
          {page > 2 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(1)}
                className="min-w-[36px] h-9"
              >
                1
              </Button>
              {page > 3 && <span className="px-1">...</span>}
            </>
          )}
          {pageButtons.map((p) => (
            <Button
              key={p}
              variant={p === page ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => goToPage(p)}
              className={`min-w-[36px] h-9`}
            >
              {p}
            </Button>
          ))}
          {page < pageCount - 1 && (
            <>
              {page < pageCount - 2 && <span className="px-1">...</span>}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(pageCount)}
                className="min-w-[36px] h-9"
              >
                {pageCount}
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="sm"
            disabled={page === pageCount}
            onClick={() => goToPage(page + 1)}
            className="text-sm px-3"
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
