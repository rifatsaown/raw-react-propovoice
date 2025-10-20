import eventsJson from '../../pages/SelesPipeline/data/calendar-events.json';
import usersJson from '../../pages/SelesPipeline/data/calendar-users.json';
import type { IEvent, IUser } from './interfaces';

type EventJson = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  color: IEvent['color'];
  description?: string;
  userId: string;
};

export const getEvents = async (): Promise<IEvent[]> => {
  // optional simulated delay
  // await new Promise((r) => setTimeout(r, 400));
  const usersById = new Map<string, IUser>(
    usersJson.map((u) => [u.id, u as IUser])
  );
  return (eventsJson as EventJson[]).map((e) => ({
    id: e.id,
    startDate: new Date(e.startDate).toISOString(),
    endDate: new Date(e.endDate).toISOString(),
    title: e.title,
    color: e.color,
    description: e.description ?? '',
    user: usersById.get(e.userId)!,
  }));
};

export const getUsers = async (): Promise<IUser[]> => {
  // optional simulated delay
  // await new Promise((r) => setTimeout(r, 200));
  return usersJson as IUser[];
};
