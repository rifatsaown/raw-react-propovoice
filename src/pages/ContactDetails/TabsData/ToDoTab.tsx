import { avatar as avatarImg } from '@/assets';
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
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Flag,
  MoreVertical,
  Phone,
} from 'lucide-react';
import { useState } from 'react';

export default function ToDoTab() {
  const [todayExpanded, setTodayExpanded] = useState(true);
  const [overdueExpanded, setOverdueExpanded] = useState(true);
  const [nextExpanded, setNextExpanded] = useState(false);
  const [unscheduledExpanded, setUnscheduledExpanded] = useState(false);

  return (
    <div className="p-6 min-h-screen lg:mx-15">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#18181B]">Todo</h1>
          <div className="flex items-center gap-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
              Create Task ↓
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
            <Button variant="outline" className="">
              Up Coming
            </Button>
            <Button variant="outline" className="">
              Doing
            </Button>
            <Button variant="outline" className="">
              Overdue
            </Button>
            <Button variant="outline" className="">
              Done
            </Button>
          </ButtonGroup>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-[#71717A]">View As :</span>
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
            <div className="-mt-2">
              <Table className="[&_th]:text-gray-400">
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="w-4" />
                    <TableHead>Activity Type</TableHead>
                    <TableHead className="text-center">Activity Type</TableHead>
                    <TableHead className="text-center">Due Date</TableHead>
                    <TableHead className="text-center">Assigned</TableHead>
                    <TableHead className="text-center">Priority</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-8" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <h3 className="text-base font-normal text-gray-900">
                          Create Followup Call to Tazkia Foundation
                        </h3>
                        <div className="text-sm text-gray-500">
                          Relation to:{' '}
                          <span className="text-gray-900">
                            Deal - Web Design Proje..
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="border-gray-300 bg-white text-gray-700 font-normal gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-500" /> 20 Dec
                        2024
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex -space-x-2">
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} alt="Assignee" />
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} alt="Assignee" />
                          <AvatarFallback>BR</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="size-6 rounded-full border -ml-1"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-1">
                        <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          H
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:text-white font-medium gap-1"
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
                    </TableCell>
                    <TableCell className="text-center">
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
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <h3 className="text-base font-normal text-gray-900">
                          Prepare Proposal to Send
                        </h3>
                        <div className="text-sm text-gray-500">
                          Relation to:{' '}
                          <span className="text-gray-900">
                            Deal - Web Design Proje..
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="border-gray-300 bg-white text-gray-700 font-normal gap-2"
                      >
                        <CheckSquare className="w-3.5 h-3.5" /> Task
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-500" /> 20 Dec
                        2024
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex -space-x-2">
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} alt="Assignee" />
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} alt="Assignee" />
                          <AvatarFallback>BR</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="size-6 rounded-full border -ml-1"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-1">
                        <Flag className="w-4 h-4 text-green-500 fill-green-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          L
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-purple-600 text-white border-purple-600 hover:bg-purple-600 hover:text-white font-medium gap-1"
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
                    </TableCell>
                    <TableCell className="text-center">
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
                </TableBody>
              </Table>
              <div className="flex justify-end pt-3">
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-900 font-medium"
                >
                  Load More
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Overdue Section */}
        <div className="mb-4 p-4 rounded-lg border border-orange-200 bg-orange-50">
          <button
            onClick={() => setOverdueExpanded(!overdueExpanded)}
            className="flex items-center gap-2  text-gray-900 hover:text-gray-700 px-4"
          >
            <span className="font-medium">Overdue</span>
            {overdueExpanded ? (
              <ChevronUp className="w-4 h-4 rounded-full border-2 border-gray-200" />
            ) : (
              <ChevronDown className="w-4 h-4 rounded-full border-2 border-gray-200" />
            )}
            <span className="text-sm text-red-500">2 Task</span>
          </button>

          {overdueExpanded && (
            <div className="">
              <Table>
                <TableBody>
                  <TableRow className="border-orange-200/60">
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <h3 className="text-base font-normal text-gray-900">
                          Share Website Wireframes for Review
                        </h3>
                        <div className="text-sm text-gray-500">
                          Relation to:{' '}
                          <span className="text-gray-900">
                            Deal - Web Design Project
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="border-gray-300 bg-white text-gray-700 font-normal gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-500" /> 20 Dec
                        2024
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex -space-x-2">
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} />
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} />
                          <AvatarFallback>BR</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="size-6 rounded-full border -ml-1"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-1">
                        <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          H
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        className="bg-purple-600 text-white border-purple-600 hover:bg-purple-600 hover:text-white font-medium gap-1"
                      >
                        Doing
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
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
                  <TableRow className="border-orange-200/60">
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <h3 className="text-base font-normal text-gray-900">
                          Send staging site access to client
                        </h3>
                        <div className="text-sm text-gray-500">
                          Relation to:{' '}
                          <span className="text-gray-900">
                            Deal - Web Design Project
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="border-gray-300 bg-white text-gray-700 font-normal gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-500" /> 20 Dec
                        2024
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex -space-x-2">
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} />
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} />
                          <AvatarFallback>BR</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="size-6 rounded-full border -ml-1"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-1">
                        <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          H
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        className="bg-purple-600 text-white border-purple-600 hover:bg-purple-600 hover:text-white font-medium gap-1"
                      >
                        Doing
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
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
                  <TableRow>
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <h3 className="text-base font-normal text-gray-900">
                          Follow up on domain purchase confirmation
                        </h3>
                        <div className="text-sm text-gray-500">
                          Relation to:{' '}
                          <span className="text-gray-900">
                            Deal - Web Design Project
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="border-gray-300 bg-white text-gray-700 font-normal gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-500" /> 20 Dec
                        2024
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex -space-x-2">
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} />
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-6 border">
                          <AvatarImage src={avatarImg} />
                          <AvatarFallback>BR</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="size-6 rounded-full border -ml-1"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-1">
                        <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          H
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        className="bg-purple-600 text-white border-purple-600 hover:bg-purple-600 hover:text-white font-medium gap-1"
                      >
                        Doing
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
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
                </TableBody>
              </Table>
            </div>
          )}
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
    </div>
  );
}
