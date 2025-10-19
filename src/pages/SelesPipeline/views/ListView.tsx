import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Columns, Task } from '../types';

interface ListViewProps {
  columns: Columns;
}

export default function ListView({ columns }: ListViewProps) {
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

  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Deal</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Probability</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAllTasks().map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {task.clientAvatar && (
                    <img
                      src={task.clientAvatar}
                      alt={task.client}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  {task.client || 'N/A'}
                </div>
              </TableCell>
              <TableCell>
                {Object.keys(columns).find((key) =>
                  columns[key].some((t) => t.id === task.id)
                )}
              </TableCell>
              <TableCell>
                {task.projectedValue
                  ? formatCurrency(task.projectedValue)
                  : 'N/A'}
              </TableCell>
              <TableCell>
                {task.probability ? `${task.probability}%` : 'N/A'}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs border ${getStatusBadgeColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </TableCell>
              <TableCell>{task.dueDate || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {task.team.slice(0, 3).map((member) => (
                    <div
                      key={member.id}
                      className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium"
                      title={member.name}
                    >
                      {member.name.charAt(0)}
                    </div>
                  ))}
                  {task.team.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                      +{task.team.length - 3}
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
