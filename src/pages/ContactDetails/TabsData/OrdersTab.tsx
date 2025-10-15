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
import { ChevronDown, ChevronsUpDown, Ellipsis, Receipt } from 'lucide-react';
import { useState } from 'react';

interface OrderRow {
  id: number;
  orderNo: string;
  description: string;
  price: string;
  type: 'Service' | 'Product';
  status: 'In Progress' | 'Done' | 'On Hold' | 'Overdue' | 'Archived';
}

function makeOrders(count: number): OrderRow[] {
  const statuses: OrderRow['status'][] = [
    'In Progress',
    'In Progress',
    'In Progress',
    'Done',
    'On Hold',
    'In Progress',
    'Overdue',
    'In Progress',
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    orderNo: '#00123',
    description: 'Custom T-Shirt , Logo Design Package',
    price: '$5214.00',
    type: 'Service',
    status: statuses[i % statuses.length],
  }));
}

const allOrders = makeOrders(337);
const ROW_OPTIONS = [10, 20, 50, 100];

export default function OrdersTab() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const pageCount = Math.ceil(allOrders.length / rowsPerPage);
  const paginated = allOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  function goToPage(p: number) {
    if (p < 1 || p > pageCount) return;
    setPage(p);
  }

  const pageButtons: number[] = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(pageCount, page + 1); i++) {
    pageButtons.push(i);
  }

  const allSelected =
    paginated.length > 0 && paginated.every((r) => selectedRows.includes(r.id));
  const someSelected =
    paginated.some((r) => selectedRows.includes(r.id)) && !allSelected;

  const toggleAllRows = (checked: boolean) => {
    if (checked) {
      const visibleIds = paginated.map((r) => r.id);
      setSelectedRows((prev) => {
        const next = [...prev];
        visibleIds.forEach((id) => {
          if (!next.includes(id)) next.push(id);
        });
        return next;
      });
    } else {
      const visibleIds = new Set(paginated.map((r) => r.id));
      setSelectedRows((prev) => prev.filter((id) => !visibleIds.has(id)));
    }
  };

  const toggleRow = (id: number, checked: boolean) => {
    if (checked) setSelectedRows((prev) => [...prev, id]);
    else setSelectedRows((prev) => prev.filter((i) => i !== id));
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Orders</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#71717A] hover:bg-[#5A5A61] text-white rounded-md px-4 py-2 flex items-center gap-2">
              Create Deals
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Create New</DropdownMenuItem>
            <DropdownMenuItem>Import</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Filters and Table */}
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
                  className="rounded-md h-8 px-3"
                >
                  Date
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Date</DropdownMenuItem>
                <DropdownMenuItem>Price</DropdownMenuItem>
                <DropdownMenuItem>Type</DropdownMenuItem>
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
                      Orders
                      <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                    </span>
                  </div>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Price
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </TableHead>
                <TableHead className="py-3">
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-[#71717A]">
                    Type
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
              {paginated.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={(c) => toggleRow(row.id, !!c)}
                      />
                      <div>
                        <div className="text-sm font-medium">{row.orderNo}</div>
                        <div className="text-xs text-muted-foreground">
                          {row.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-sm">{row.price}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-sm">{row.type}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-sky-200 hover:bg-[#2563EB] text-[#006BFF] text-sm font-medium rounded-sm transition-colors">
                          {row.status}
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>In Progress</DropdownMenuItem>
                        <DropdownMenuItem>Done</DropdownMenuItem>
                        <DropdownMenuItem>On Hold</DropdownMenuItem>
                        <DropdownMenuItem>Overdue</DropdownMenuItem>
                        <DropdownMenuItem>Archived</DropdownMenuItem>
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
                        <Receipt className="w-4 h-4" />
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
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
              {Math.min(page * rowsPerPage, allOrders.length)} of{' '}
              {allOrders.length}
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
