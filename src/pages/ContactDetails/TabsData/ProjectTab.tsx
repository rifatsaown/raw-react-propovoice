import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  ChevronDown,
  ChevronsUpDown,
  MailPlus,
  MoreVertical,
  PhoneCall,
} from 'lucide-react';
import { useState } from 'react';

// Generate dummy projects data similar to DealsTab
function makeProjects(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: [25, 45, 60, 68, 75, 80][i % 6],
    assignees: [
      { id: '1', name: 'User 1', avatar: '' },
      { id: '2', name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: ['In Progress', 'Done', 'On Hold'][i % 3] as
      | 'In Progress'
      | 'Done'
      | 'On Hold',
  }));
}

const allProjects = makeProjects(337);
const ROW_OPTIONS = [10, 20, 50, 100];

export default function ProjectTab() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const pageCount = Math.ceil(allProjects.length / rowsPerPage);
  const paginated = allProjects.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  function goToPage(p: number) {
    if (p < 1 || p > pageCount) return;
    setPage(p);
  }

  // Smart pagination window
  const pageButtons: number[] = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(pageCount, page + 1); i++) {
    pageButtons.push(i);
  }

  // Selection helpers (mirror DealsTab)
  const allSelected =
    paginated.length > 0 && paginated.every((p) => selectedRows.includes(p.id));
  const someSelected =
    paginated.some((p) => selectedRows.includes(p.id)) && !allSelected;

  const toggleAllRows = (checked: boolean) => {
    if (checked) {
      const visibleIds = paginated.map((p) => p.id);
      setSelectedRows((prev) => {
        const newSelected = [...prev];
        visibleIds.forEach((id) => {
          if (!newSelected.includes(id)) newSelected.push(id);
        });
        return newSelected;
      });
    } else {
      const visibleIds = paginated.map((p) => p.id);
      setSelectedRows((prev) => prev.filter((id) => !visibleIds.includes(id)));
    }
  };

  const toggleRowSelection = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Projects</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#71717A] hover:bg-[#5A5A61] text-white rounded-md px-4 py-2 flex items-center gap-2">
              Create Project
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Create New Project</DropdownMenuItem>
            <DropdownMenuItem>Create from Template</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs and Filters (mirror DealsTab with a button group) */}
      <div className="bg-white rounded-lg px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <ButtonGroup>
            <Button variant="outline" size="sm" className="bg-gray-200">
              All
            </Button>
            <Button variant="outline" size="sm" className="text-[#71717A]">
              In Progress
            </Button>
            <Button variant="outline" size="sm" className="text-[#71717A]">
              Done
            </Button>
            <Button variant="outline" size="sm" className="text-[#71717A]">
              Overdue
            </Button>
            <Button variant="outline" size="sm" className="text-[#71717A]">
              Archived
            </Button>
          </ButtonGroup>

          <div className="flex items-center gap-2 pb-3">
            <span className="text-sm text-muted-foreground">View As a :</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md h-8 px-3 flex items-center gap-2 text-[#344054]"
                >
                  Date
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Date</DropdownMenuItem>
                <DropdownMenuItem>Name</DropdownMenuItem>
                <DropdownMenuItem>Status</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
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
                    />
                    <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                      Project
                      <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                    </span>
                  </div>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Budget
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Progress
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Assignee
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Status
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </TableHead>
                <TableHead className="pr-10 w-0">
                  <span className="flex items-center gap-1 justify-end uppercase text-xs font-semibold text-[#71717A]">
                    Action
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((project) => (
                <TableRow key={project.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedRows.includes(project.id)}
                        onCheckedChange={(checked) =>
                          toggleRowSelection(project.id, !!checked)
                        }
                      />
                      <span className="text-sm font-medium">
                        {project.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-sm">{project.budget}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            project.progress >= 80
                              ? 'bg-green-500'
                              : project.progress >= 60
                              ? 'bg-blue-500'
                              : 'bg-orange-400'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 font-medium min-w-[30px]">
                        {project.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center -space-x-2">
                      {project.assignees.map((assignee) => (
                        <Avatar
                          key={assignee.id}
                          className="h-8 w-8 border-2 border-white ring-1 ring-gray-100"
                        >
                          {assignee.avatar ? (
                            <AvatarImage src={assignee.avatar} />
                          ) : (
                            <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 text-xs font-medium">
                              {assignee.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      ))}
                      {project.additionalCount > 0 && (
                        <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-100 flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">
                            +{project.additionalCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-sky-200 hover:bg-[#2563EB] text-[#006BFF] text-sm font-medium rounded-sm transition-colors">
                          {project.status}
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>In Progress</DropdownMenuItem>
                        <DropdownMenuItem>Done</DropdownMenuItem>
                        <DropdownMenuItem>On Hold</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-right py-4 pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-sm"
                      >
                        <MailPlus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-sm"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-sm"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page</span>
              <select
                className="appearance-none bg-none border border-gray-300 rounded-sm pl-2 pr-0.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009B6A] focus:border-transparent font-medium"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                {ROW_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm">
              Total Contact {(page - 1) * rowsPerPage + 1}–
              {Math.min(page * rowsPerPage, allProjects.length)} of{' '}
              {allProjects.length}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="text-sm px-3"
            >
              &lt; Previous
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
                className={`min-w-[36px] h-9 `}
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
              Next &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
