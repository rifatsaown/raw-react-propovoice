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
  AlarmClock,
  ChevronDown,
  ChevronsUpDown,
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

function getInvoiceBadgeClass(status: Invoice['status']): string {
  switch (status) {
    case 'Paid':
      return 'bg-[#EBFEF5] text-[#036246]';
    case 'Sent':
      return 'bg-[#BAE6FD] text-[#006BFF]';
    case 'Draft':
      return 'bg-[#E4E4E7] text-[#09090B]';
    case 'Unpaid':
      return 'bg-[#FFEED5] text-[#C1460D]';
    case 'Partially Paid':
      return 'bg-[#EBE5FF] text-[#7916FF]';
    default:
      return 'bg-sky-200 text-[#006BFF]';
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
  const pageButtons: number[] = [];
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
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Invoice</h2>
        <Button className="bg-[#71717A] hover:bg-[#5A5A61] text-white rounded-md px-4 py-2 flex items-center gap-2">
          Create Invoice
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <ButtonGroup>
            <Button variant="outline" size="sm" className="bg-gray-200">
              All
            </Button>
            <Button variant="outline" size="sm" className="text-[#71717A]">
              Paid
            </Button>
            <Button variant="outline" size="sm" className="text-[#71717A]">
              Sent
            </Button>
            <Button variant="outline" size="sm" className="text-[#71717A]">
              Draft
            </Button>
            <Button variant="outline" size="sm" className="text-[#71717A]">
              Unpaid
            </Button>
          </ButtonGroup>

          <div className="flex items-center gap-2 pb-3">
            <span className="text-sm text-muted-foreground">View As a :</span>
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
                    <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                      Invoice
                      <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                    </span>
                  </div>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Total Amount
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Paid Amount
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Status
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </TableHead>
                <TableHead className="text-right py-3 pr-6">
                  <span className="flex items-center gap-1 justify-end uppercase text-xs font-semibold text-[#71717A]">
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-sm font-medium rounded-sm transition-colors ${getInvoiceBadgeClass(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>Paid</DropdownMenuItem>
                        <DropdownMenuItem>Sent</DropdownMenuItem>
                        <DropdownMenuItem>Draft</DropdownMenuItem>
                        <DropdownMenuItem>Unpaid</DropdownMenuItem>
                        <DropdownMenuItem>Partially Paid</DropdownMenuItem>
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
                        {invoice.status === 'Paid' ? (
                          <Download className="w-4 h-4" />
                        ) : (
                          <AlarmClock className="w-4 h-4" />
                        )}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-sm"
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
              {Math.min(page * rowsPerPage, allInvoices.length)} of{' '}
              {allInvoices.length}
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
