import { WhatsappIcon } from '@/components/Icons';
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
import type { Contact } from '@/interfaces';
import {
  ChevronsUpDown,
  Ellipsis,
  FolderSymlink,
  MailCheck,
  MailPlus,
  PhoneCall,
  Rocket,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Function to get contact type styling based on type
function getContactTypeStyle(type: string): string {
  switch (type) {
    case 'Client':
      return 'bg-[#009B6A]';
    case 'Lead':
      return 'bg-[#F4A462]';
    case 'Prospect':
      return 'bg-blue-500';
    case 'Partner':
      return 'bg-purple-500';
    case 'Vendor':
      return 'bg-orange-500';
    case 'Affiliate':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
}
// Generate lots of dummy contacts
function makeContacts(count: number): Contact[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: 'Nasir Uddin',
    email: `nurencydigital${i}@gmail.com`,
    phone: '+8801760706361',
    org: 'Nurency',
    type: i % 3 === 0 ? 'Lead' : 'Client',
    avatar: null,
    fallback: 'N',
  }));
}

const allContacts = makeContacts(137);

const ROW_OPTIONS = [10, 20, 50, 100];

export default function ContactTable() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const pageCount = Math.ceil(allContacts.length / rowsPerPage);
  const paginated = allContacts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  function goToPage(p: number) {
    if (p < 1 || p > pageCount) return;
    setPage(p);
  }

  // Smart pagination (show current, previous, next, ellipsis)
  const pageButtons = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(pageCount, page + 1); i++) {
    pageButtons.push(i);
  }

  // Check if all visible rows are selected
  const allSelected =
    paginated.length > 0 &&
    paginated.every((contact) => selectedRows.includes(contact.id));

  // Check if some but not all visible rows are selected
  const someSelected =
    paginated.some((contact) => selectedRows.includes(contact.id)) &&
    !allSelected;

  // Toggle all rows selection
  const toggleAllRows = (checked: boolean) => {
    if (checked) {
      // Select all visible rows
      const visibleIds = paginated.map((contact) => contact.id);
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
      // Deselect all visible rows
      const visibleIds = paginated.map((contact) => contact.id);
      setSelectedRows((prev) => prev.filter((id) => !visibleIds.includes(id)));
    }
  };

  // Toggle single row selection
  const toggleRowSelection = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  return (
    <>
      {/* Selection Bar */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          selectedRows.length > 0
            ? 'max-h-20 opacity-100'
            : 'max-h-0 opacity-0 mb-0'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 bg-[#71717A] text-white rounded-[8px]"
            >
              <Rocket className="w-4 h-4" />
              Send Mail
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1"
            >
              <FolderSymlink className="w-4 h-4" />
              Add to List
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1"
            >
              <MailCheck className="w-4 h-4" />
              Send a Mail
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1"
            >
              <WhatsappIcon className="w-4 h-4" />
              Send WhatsApp Message
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="border rounded overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F4F4F5]">
            <TableRow>
              <TableHead className="flex items-center gap-2 px-4">
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? 'indeterminate' : false
                  }
                  onCheckedChange={toggleAllRows}
                />
                <span className="flex items-center gap-1 uppercase">
                  Contact Name
                  <ChevronsUpDown className="w-4 h-4  text-muted-foreground" />
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-1 uppercase">
                  Organization
                  <ChevronsUpDown className="w-4 h-4  text-muted-foreground" />
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-1 uppercase">
                  Contact Type
                  <ChevronsUpDown className="w-4 h-4  text-muted-foreground" />
                </span>
              </TableHead>
              <TableHead className="text-right">
                <span className="flex items-center gap-1 justify-end uppercase mr-3">
                  Action
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="flex items-center gap-2 px-4">
                  <Checkbox
                    checked={selectedRows.includes(contact.id)}
                    onCheckedChange={(checked) =>
                      toggleRowSelection(contact.id, !!checked)
                    }
                  />
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {contact.avatar ? (
                        <AvatarImage src={contact.avatar} />
                      ) : (
                        <AvatarFallback className="bg-green-200">
                          {contact.fallback}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="space-y-0.5">
                      <Link
                        to={`/contact-details/${contact.id}`}
                        className="text-sm font-medium leading-none"
                      >
                        {contact.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {contact.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {contact.phone}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{contact.org}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium text-white rounded-full ${getContactTypeStyle(
                      contact.type
                    )}`}
                  >
                    {contact.type}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MailPlus className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <PhoneCall className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          <Ellipsis className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>Add to List</DropdownMenuItem>
                        <DropdownMenuItem>Send Mail</DropdownMenuItem>
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
      <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            className="border rounded px-2 py-1"
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

        <div>
          Total Contact {(page - 1) * rowsPerPage + 1}–
          {Math.min(page * rowsPerPage, allContacts.length)} of{' '}
          {allContacts.length}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            &lt; Previous
          </Button>
          {page > 2 && (
            <>
              <Button variant="ghost" size="sm" onClick={() => goToPage(1)}>
                1
              </Button>
              {page > 3 && <span>...</span>}
            </>
          )}
          {pageButtons.map((p) => (
            <Button
              key={p}
              variant={p === page ? 'default' : 'ghost'}
              size="sm"
              onClick={() => goToPage(p)}
              className={p === page ? 'font-bold' : ''}
            >
              {p}
            </Button>
          ))}
          {page < pageCount - 1 && (
            <>
              {page < pageCount - 2 && <span>...</span>}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(pageCount)}
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
          >
            Next &gt;
          </Button>
        </div>
      </div>
    </>
  );
}
