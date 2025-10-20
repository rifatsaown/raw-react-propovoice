import { ChangeBadgeVariantInput } from '@/components/calendar/components/change-badge-variant-input';
import { ClientContainer } from '@/components/calendar/components/client-container';
import { CalendarProvider } from '@/components/calendar/contexts/calendar-context';
import type { IEvent, IUser } from '@/components/calendar/interfaces';
import { getEvents, getUsers } from '@/components/calendar/requests';
import type { TCalendarView } from '@/components/calendar/types';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CalendarView() {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    Promise.all([getUsers(), getEvents()])
      .then(([u, e]) => {
        if (!mounted) return;
        console.log('Calendar data loaded:', {
          users: u.length,
          events: e.length,
        });
        console.log('Sample events:', e.slice(0, 3));
        setUsers(u);
        setEvents(e);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading calendar data:', error);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const [params] = useSearchParams();
  const modeParam = (params.get('mode') || 'month').toLowerCase();
  const view: TCalendarView = [
    'day',
    'week',
    'month',
    'year',
    'agenda',
  ].includes(modeParam)
    ? (modeParam as TCalendarView)
    : 'month';

  if (loading) {
    return (
      <div className="mx-auto flex w-full items-center justify-center py-12">
        <p className="text-muted-foreground">Loading calendar...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <CalendarProvider users={users} events={events}>
        <ClientContainer view={view} />
        <div className="flex justify-end">
          <ChangeBadgeVariantInput />
        </div>
      </CalendarProvider>
    </div>
  );
}
