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
  ChevronDown,
  ChevronsUpDown,
  CloudUpload,
  Download,
  Ellipsis,
  ExternalLink,
  Link as LinkIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type FileType = 'image' | 'doc' | 'link';

interface FileRow {
  id: number;
  name: string;
  size: string;
  type: FileType;
  addedBy: {
    name: string;
    avatar: string;
  };
  href?: string;
}

const ROW_OPTIONS = [20, 50, 100];

const sampleRows: FileRow[] = Array.from({ length: 337 }, (_, i) => {
  const types: FileType[] = ['image', 'doc', 'link'];
  const type = types[i % types.length];
  return {
    id: i + 1,
    name:
      type === 'image'
        ? 'Spendo.png'
        : type === 'doc'
        ? 'Estimate.pdf'
        : 'Untitled Link',
    size: '124kb',
    type,
    addedBy: {
      name: 'Nasir Uddin',
      avatar: '/avatar.png',
    },
    href: type === 'link' ? 'google.com' : undefined,
  };
});

type TabKey = 'all' | FileType;

export default function FilesTab() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [page, setPage] = useState<number>(2);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return sampleRows;
    return sampleRows.filter((r) => r.type === activeTab);
  }, [activeTab]);

  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const allSelected =
    paginated.length > 0 &&
    paginated.every((row) => selectedRows.includes(row.id));
  const someSelected =
    paginated.some((row) => selectedRows.includes(row.id)) && !allSelected;

  const toggleAllRows = (checked: boolean) => {
    if (checked) {
      const visibleIds = paginated.map((r) => r.id);
      setSelectedRows((prev) => Array.from(new Set([...prev, ...visibleIds])));
    } else {
      const visibleIds = new Set(paginated.map((r) => r.id));
      setSelectedRows((prev) => prev.filter((id) => !visibleIds.has(id)));
    }
  };

  const toggleRow = (id: number, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  const pageButtons: number[] = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(pageCount, page + 1); i++) {
    pageButtons.push(i);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Files and Link</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#71717A] hover:bg-[#5A5A61] text-white rounded-md px-4 py-2 flex items-center gap-2">
              Upload
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Upload File</DropdownMenuItem>
            <DropdownMenuItem>Add Link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Uploader Bar */}
      <div className="rounded-lg border border-dashed bg-[#FAFAFA] p-4 flex items-start gap-3">
        <div className="h-10 w-10 rounded-md border flex items-center justify-center bg-white">
          <CloudUpload className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">Drop your files here</div>
          <div className="text-xs text-muted-foreground">
            PNG, JPG, Doc or Pdf (max. 2MB)
          </div>
        </div>
        <Button variant="outline" className="h-9 rounded-md px-3">
          Upload
        </Button>
      </div>

      {/* Tabs + View */}
      <div className="flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          {(
            [
              { key: 'all', label: 'All' },
              { key: 'image', label: 'Images' },
              { key: 'doc', label: 'Docs' },
              { key: 'link', label: 'Link' },
            ] as { key: TabKey; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`pb-3 px-3 text-sm font-medium transition-colors relative ${
                activeTab === t.key
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
              {activeTab === t.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#009B6A]" />
              )}
            </button>
          ))}
        </div>
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
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Date</DropdownMenuItem>
              <DropdownMenuItem>Name</DropdownMenuItem>
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
                  <span className="flex items-center gap-1 uppercase text-xs font-semibold text-gray-700">
                    Files and Link
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </span>
                </div>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 uppercase text-xs font-semibold text-gray-700">
                  Type
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </span>
              </TableHead>
              <TableHead className="py-3">
                <span className="flex items-center gap-1 uppercase text-xs font-semibold text-gray-700">
                  Added By
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
            {paginated.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={(c) => toggleRow(row.id, !!c)}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        {row.type === 'image' && (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-emerald-100 text-emerald-600">
                            img
                          </span>
                        )}
                        {row.type === 'doc' && (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-blue-100 text-blue-600">
                            pdf
                          </span>
                        )}
                        {row.type === 'link' && (
                          <LinkIcon className="w-4 h-4 text-emerald-600" />
                        )}
                        <span className="text-sm font-medium">{row.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {row.type === 'link' ? row.href : row.size}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-sm capitalize">{row.type}</span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={row.addedBy.avatar}
                        alt={row.addedBy.name}
                      />
                      <AvatarFallback>NU</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{row.addedBy.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                  <div className="flex justify-end gap-2">
                    {row.type !== 'link' ? (
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-md"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-md"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
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
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
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

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
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
          {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="text-sm px-3"
          >
            &lt; Previous
          </Button>
          {page > 2 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage(1)}
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
              onClick={() => setPage(p)}
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
                onClick={() => setPage(pageCount)}
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
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="text-sm px-3"
          >
            Next &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
