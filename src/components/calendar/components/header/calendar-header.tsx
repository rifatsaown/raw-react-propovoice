import {
  CalendarRange,
  Columns,
  Grid2x2,
  Grid3x3,
  List,
  Plus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { AddEventDialog } from '@/components/calendar/components/dialogs/add-event-dialog';
import { DateNavigator } from '@/components/calendar/components/header/date-navigator';
import { TodayButton } from '@/components/calendar/components/header/today-button';
import { UserSelect } from '@/components/calendar/components/header/user-select';

import type { IEvent } from '@/components/calendar/interfaces';
import type { TCalendarView } from '@/components/calendar/types';
import { Link } from 'react-router-dom';

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
            <Button
              asChild
              aria-label="View by day"
              size="icon"
              variant='outline'
              className={`rounded-r-none [&_svg]:size-5 ${view === 'day' ? 'bg-gray-100' : ''}`}
            >
              <Link to="/main/sales-pipeline?view=calendar&mode=day">
                <List strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by week"
              size="icon"
              variant='outline'
              className={`rounded-none [&_svg]:size-5 ${view === 'week' ? 'bg-gray-100' : ''}`}
            >
              <Link to="/main/sales-pipeline?view=calendar&mode=week">
                <Columns strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by month"
              size="icon"
              variant='outline'
              className={`rounded-none [&_svg]:size-5 ${view === 'month' ? 'bg-gray-100' : ''}`}
            >
              <Link to="/main/sales-pipeline?view=calendar&mode=month">
                <Grid2x2 strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by year"
              size="icon"
              variant='outline'
              className={`rounded-none [&_svg]:size-5 ${view === 'year' ? 'bg-gray-100' : ''}`}
            >
              <Link to="/main/sales-pipeline?view=calendar&mode=year">
                <Grid3x3 strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by agenda"
              size="icon"
              variant='outline'
              className={`rounded-l-none [&_svg]:size-5 ${view === 'agenda' ? 'bg-gray-100' : ''}`}
            >
              <Link to="/main/sales-pipeline?view=calendar&mode=agenda">
                <CalendarRange strokeWidth={1.8} />
              </Link>
            </Button>
          </div>

          <UserSelect />
        </div>

        <AddEventDialog>
          <Button className="w-full sm:w-auto">
            <Plus />
            Add Event
          </Button>
        </AddEventDialog>
      </div>
    </div>
  );
}
