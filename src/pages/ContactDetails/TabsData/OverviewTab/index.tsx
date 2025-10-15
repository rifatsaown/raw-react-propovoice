import type { ActivityGroup, User } from '@/interfaces';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import ActivityHistory from './ActivityHistory';
import BasicInfo from './BasicInfo';
import OverviewTodo from './OverviewTodo';

export default function OverviewTab() {
  const [activityData, setActivityData] = useState<ActivityGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock user data - replace with actual user data from props or context
  const currentUser: User = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  };

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API call
        const mockData: ActivityGroup[] = [
          {
            period: 'TODAY',
            activities: [
              {
                id: '1',
                type: 'deal',
                title:
                  'Deal "<b>Ecommerce Redesign</b>" created from this Contact',
                timestamp: '16 May, 6:00 PM',
                metadata: {
                  budget: '$511',
                  dealOwner: 'Nasir U.',
                  stage: 'Proposal',
                  opportunityLevel: 'H',
                },
                actions: [
                  {
                    label: 'View Deal',
                    onClick: () => console.log('View Deal'),
                  },
                  {
                    label: 'Edit Deal',
                    onClick: () => console.log('Edit Deal'),
                  },
                ],
              },
              {
                id: '2',
                type: 'meeting',
                title: 'Meeting with "<b>XYZ Ltd.</b>" to discuss pricing',
                timestamp: '16 May, 6:00 PM',
                metadata: {
                  time: '3pm',
                  location: 'Google Meet',
                  status: 'upcoming',
                },
                actions: [
                  { label: 'Join', onClick: () => console.log('Join') },
                  {
                    label: 'Reschedule',
                    onClick: () => console.log('Reschedule'),
                  },
                  {
                    label: 'View on Calendar',
                    onClick: () => console.log('View on Calendar'),
                  },
                ],
              },
            ],
          },
          {
            period: 'THIS WEEK',
            activities: [
              {
                id: '3',
                type: 'note',
                title: '"<b>Nasir</b>" added context on the lead.',
                description:
                  "Client seems interested in our monthly pricing but needs internal approval before moving forward. They mentioned a decision might come by early next week. Let's prepare a ...",
                timestamp: '16 May, 6:00 PM',
                actions: [
                  {
                    label: 'Edit Note',
                    onClick: () => console.log('Edit Note'),
                  },
                  { label: 'Pin', onClick: () => console.log('Pin') },
                ],
              },
              {
                id: '4',
                type: 'reassignment',
                title: 'Lead reassigned from "<b>Anika</b>" to "<b>Tanvir</b>"',
                timestamp: '16 May, 6:00 PM',
                metadata: {
                  fromUser: 'Anika',
                  toUser: 'Tanvir',
                },
                actions: [
                  { label: 'Undo', onClick: () => console.log('Undo') },
                ],
              },
            ],
          },
        ];

        setActivityData(mockData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load activity data'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  // TODO: Replace with actual API call
  // const fetchActivityData = async (contactId: string) => {
  //   try {
  //     const response = await fetch(`/api/contacts/${contactId}/activities`);
  //     if (!response.ok) throw new Error('Failed to fetch activity data');
  //     const data = await response.json();
  //     setActivityData(data);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to load activity data');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl text-[#18181B]">Overview</h1>
        <div className="w-full sm:w-auto flex items-center gap-2 sm:gap-4 justify-between sm:justify-end flex-wrap">
          <div className="text-xs sm:text-sm flex items-center gap-1">
            <Clock strokeWidth={1} className="w-4 h-4" />{' '}
            <span className="text-[#71717A]">Last Modified on</span>
            <span className="text-[#18181B] font-semibold">
              Today, 12:08 PM
            </span>
          </div>
          <button className="bg-[#71717A] text-white h-8 sm:h-9 px-3 sm:px-4 rounded-md text-xs sm:text-sm flex items-center gap-1">
            Create{' '}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Activity */}
        <div className="lg:col-span-2 space-y-1">
          {/* Activity History */}
          <ActivityHistory
            activityData={activityData}
            isLoading={isLoading}
            error={error || undefined}
          />
          {/* To Do Section */}
          <OverviewTodo user={currentUser} />
        </div>

        {/* Right Column - Contact Info */}
        <BasicInfo user={currentUser} />
      </div>
    </>
  );
}
