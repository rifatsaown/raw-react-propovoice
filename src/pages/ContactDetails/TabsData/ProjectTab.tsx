import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, MessageSquare, MoreVertical, Phone } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 4,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 5,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 6,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 7,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 8,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 68,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 9,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 80,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 10,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 11,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
  {
    id: 12,
    name: 'Digital Boost Bundle',
    budget: '$5214.00',
    progress: 25,
    assignees: [
      { name: 'User 1', avatar: '' },
      { name: 'User 2', avatar: '' },
    ],
    additionalCount: 2,
    status: 'In Progress',
  },
];

export default function ProjectTab() {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gray-700 hover:bg-gray-800 text-white text-sm h-9 px-4 rounded-md">
              Create Deals
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Create New Deal</DropdownMenuItem>
            <DropdownMenuItem>Create from Template</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs and Filters */}
      <div className="px-6 pt-3 pb-0 flex items-center justify-between border-b border-gray-200">
        <Tabs defaultValue="all" className="w-auto">
          <TabsList className="bg-transparent rounded-none h-auto p-0 gap-6 border-0">
            <TabsTrigger
              value="all"
              className="bg-transparent text-gray-600 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 rounded-none px-0 pb-3 pt-0 data-[state=active]:shadow-none font-normal text-sm hover:text-gray-900 transition-colors"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="bg-transparent text-gray-600 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 rounded-none px-0 pb-3 pt-0 data-[state=active]:shadow-none font-normal text-sm hover:text-gray-900 transition-colors"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="done"
              className="bg-transparent text-gray-600 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 rounded-none px-0 pb-3 pt-0 data-[state=active]:shadow-none font-normal text-sm hover:text-gray-900 transition-colors"
            >
              Done
            </TabsTrigger>
            <TabsTrigger
              value="overdue"
              className="bg-transparent text-gray-600 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 rounded-none px-0 pb-3 pt-0 data-[state=active]:shadow-none font-normal text-sm hover:text-gray-900 transition-colors"
            >
              Overdue
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="bg-transparent text-gray-600 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 rounded-none px-0 pb-3 pt-0 data-[state=active]:shadow-none font-normal text-sm hover:text-gray-900 transition-colors"
            >
              Archived
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 pb-3">
          <span className="text-sm text-gray-600">View As</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-3 text-sm">
                Date
                <ChevronDown className="ml-2 h-3 w-3" />
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
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="h-10 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                PROJECT
              </TableHead>
              <TableHead className="h-10 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                BUDGET
              </TableHead>
              <TableHead className="h-10 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                PROGRESS
              </TableHead>
              <TableHead className="h-10 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                ASSIGNEE
              </TableHead>
              <TableHead className="h-10 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </TableHead>
              <TableHead className="h-10 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <TableCell className="px-6 py-4 font-medium text-sm text-gray-900">
                  {project.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">
                  {project.budget}
                </TableCell>
                <TableCell className="px-6 py-4">
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
                <TableCell className="px-6 py-4">
                  <div className="flex items-center -space-x-2">
                    {project.assignees.map((assignee, idx) => (
                      <Avatar
                        key={idx}
                        className="w-7 h-7 border-2 border-white ring-1 ring-gray-100"
                      >
                        <AvatarImage src={assignee.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs font-medium">
                          {assignee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.additionalCount > 0 && (
                      <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-medium">
                          +{project.additionalCount}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 rounded text-xs font-medium"
                      >
                        {project.status}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>In Progress</DropdownMenuItem>
                      <DropdownMenuItem>Done</DropdownMenuItem>
                      <DropdownMenuItem>On Hold</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        >
                          <MoreVertical className="h-4 w-4" />
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

      {/* Footer Pagination */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Rows per page</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-sm font-normal"
              >
                20
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>10</DropdownMenuItem>
              <DropdownMenuItem>20</DropdownMenuItem>
              <DropdownMenuItem>50</DropdownMenuItem>
              <DropdownMenuItem>100</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-sm text-gray-600">
            Total Contact 1-20 of 337
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-sm text-gray-600 hover:text-gray-900"
          >
            Previous
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            3
          </Button>
          <span className="px-2 text-gray-400">...</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-sm text-gray-600 hover:text-gray-900"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
