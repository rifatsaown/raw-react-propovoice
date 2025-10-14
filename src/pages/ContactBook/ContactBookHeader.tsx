import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpNarrowWide,
  BriefcaseBusiness,
  ChevronDown,
  Contact,
  ListTodo,
  Plus,
  Search,
  User,
  Users,
} from "lucide-react";

export default function ContactBookHeader() {
  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Contact Book</h2>
        <Button className="h-10 gap-2 bg-[#009B6A] hover:bg-green-700 rounded-[8px]">
          <Plus className="w-4 h-4" />
          Create New
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
      {/* Title and Tabs */}
      <div className="flex items-center justify-between">
        {/* Tabs */}
        <Tabs defaultValue="contact">
          <TabsList className="h-8">
            <TabsTrigger value="contact" className="gap-1 text-sm">
              <Contact className="w-4 h-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="organization" className="gap-1 text-sm">
              <BriefcaseBusiness className="w-4 h-4" />
              Organization
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-1 text-sm">
              <Users className="w-4 h-4" />
              Contact Groups
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <div className="flex-1 max-w-xs relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
            <Input
              type="text"
              placeholder="Search Contact"
              className="h-8 text-sm pl-8 pr-3"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <User className="w-4 h-4" />
                Contact Type
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Contact</DropdownMenuItem>
              <DropdownMenuItem>Organization</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListTodo className="w-4 h-4" />
                List
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Contact</DropdownMenuItem>
              <DropdownMenuItem>Organization</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ArrowUpNarrowWide className="w-4 h-4" />
                Short By
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Alphabetical</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
