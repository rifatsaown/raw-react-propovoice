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
  ChevronDown,
  ChevronsUpDown,
  Clock,
  Download,
  Ellipsis,
} from 'lucide-react';
import { useState } from 'react';

// Invoice data interface
interface Invoice {
  id: number;
  invoiceNumber: string;
  totalAmount: string;
  paidAmount: string;
  status: 'Paid' | 'Sent' | 'Draft' | 'Unpaid' | 'Partially Paid';
}

// Function to get status badge styling
function getStatusBadgeStyle(status: Invoice['status']): string {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Sent':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Draft':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'Unpaid':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Partially Paid':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Generate sample invoice data
function generateInvoices(count: number): Invoice[] {
  const statuses: Invoice['status'][] = [
    'Paid',
    'Sent',
    'Sent',
    'Sent',
    'Sent',
    'Sent',
    'Sent',
    'Sent',
    'Sent',
    'Draft',
    'Unpaid',
    'Partially Paid',
    'Sent',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    invoiceNumber: '#00123',
    totalAmount: '$5214.00',
    paidAmount: '$5214.00',
    status: statuses[i % statuses.length],
  }));
}

const allInvoices = generateInvoices(337);
const ROW_OPTIONS = [10, 20, 50, 100];

export default function InvoiceTab() {
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const pageCount = Math.ceil(allInvoices.length / rowsPerPage);
  const paginated = allInvoices.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  function goToPage(p: number) {
    if (p < 1 || p > pageCount) return;
    setPage(p);
  }

  // Smart pagination
  const pageButtons = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(pageCount, page + 1); i++) {
    pageButtons.push(i);
  }

  // Check if all visible rows are selected
  const allSelected =
    paginated.length > 0 &&
    paginated.every((invoice) => selectedRows.includes(invoice.id));

  // Check if some but not all visible rows are selected
  const someSelected =
    paginated.some((invoice) => selectedRows.includes(invoice.id)) &&
    !allSelected;

  // Toggle all rows selection
  const toggleAllRows = (checked: boolean) => {
    if (checked) {
      const visibleIds = paginated.map((invoice) => invoice.id);
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
      const visibleIds = paginated.map((invoice) => invoice.id);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Invoice</h2>
        <Button className="bg-[#71717A] hover:bg-[#5A5A61] text-white rounded-md px-4 py-2 flex items-center gap-2">
          Create Deals
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabs and Filters */}
      <div className="flex items-center justify-between border-b">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'all'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
            {activeTab === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009B6A]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'in-progress'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            In Progress
            {activeTab === 'in-progress' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009B6A]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('done')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'done'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Done
            {activeTab === 'done' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009B6A]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('overdue')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'overdue'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overdue
            {activeTab === 'overdue' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009B6A]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === 'archived'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Archived
            {activeTab === 'archived' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009B6A]" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 pb-3">
          <span className="text-sm text-muted-foreground">View As a:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md h-8 px-3 flex items-center gap-2"
              >
                Date
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Date</DropdownMenuItem>
              <DropdownMenuItem>Amount</DropdownMenuItem>
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
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-gray-700">
                    Invoice
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </div>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 uppercase text-xs font-semibold text-gray-700">
                  Total Amount
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 uppercase text-xs font-semibold text-gray-700">
                  Paid Amount
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 uppercase text-xs font-semibold text-gray-700">
                  Status
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </span>
              </TableHead>
              <TableHead className="text-right py-3 pr-6">
                <span className="flex items-center gap-1 justify-end uppercase text-xs font-semibold text-gray-700">
                  Action
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedRows.includes(invoice.id)}
                      onCheckedChange={(checked) =>
                        toggleRowSelection(invoice.id, !!checked)
                      }
                    />
                    <span className="text-sm font-medium">
                      {invoice.invoiceNumber}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-sm">{invoice.totalAmount}</span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-sm">{invoice.paidAmount}</span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-3 py-1.5 text-sm font-medium rounded-full border ${getStatusBadgeStyle(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                    {invoice.status !== 'Draft' && (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-md"
                    >
                      {invoice.status === 'Paid' ? (
                        <Download className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-md"
                        >
                          <Ellipsis className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Invoice</DropdownMenuItem>
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
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#009B6A] focus:border-transparent"
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

        <div className="text-sm text-gray-600">
          Total Contact {(page - 1) * rowsPerPage + 1}–
          {Math.min(page * rowsPerPage, allInvoices.length)} of{' '}
          {allInvoices.length}
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
              variant={p === page ? 'default' : 'ghost'}
              size="sm"
              onClick={() => goToPage(p)}
              className={`min-w-[36px] h-9 ${
                p === page
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : ''
              }`}
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
  );
}
