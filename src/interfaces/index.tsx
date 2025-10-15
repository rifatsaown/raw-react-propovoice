interface MenuItem {
  icon: React.ElementType;
  title: string;
  path?: string;
  badge?: number;
  active?: boolean;
  items?: MenuItem[];
}

interface MenuSection {
  label: string;
  items: MenuItem[];
}

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// Contact data type
interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  org: string;
  type: 'Client' | 'Lead';
  avatar: string | null;
  fallback: string;
}

interface Attachment {
  id: string;
  kind: 'image' | 'file';
  src?: string;
  name: string;
}

interface NoteItem {
  id: string;
  author: { name: string; avatar: string };
  flag?: 'H' | 'M' | 'L';
  timestamp: string;
  text: string;
  attachments?: Attachment[];
  tint?: 'default' | 'muted';
}

// Activity History interfaces
interface ActivityItem {
  id: string;
  type: 'deal' | 'meeting' | 'note' | 'reassignment';
  title: string;
  description?: string;
  timestamp: string;
  metadata?: {
    budget?: string;
    dealOwner?: string;
    stage?: string;
    opportunityLevel?: 'H' | 'M' | 'L';
    time?: string;
    location?: string;
    status?: 'upcoming' | 'completed' | 'cancelled';
    fromUser?: string;
    toUser?: string;
  };
  actions?: {
    label: string;
    onClick: () => void;
  }[];
}

interface ActivityGroup {
  period: string;
  activities: ActivityItem[];
}

// Todo interfaces
interface TodoItem {
  id: string;
  title: string;
  dueDate: string;
  relationTo?: string;
  activityType: 'call' | 'task' | 'meeting' | 'email';
  priority: 'H' | 'M' | 'L';
  status: 'upcoming' | 'doing' | 'completed';
  completed: boolean;
}

interface TodoGroup {
  category: 'today' | 'overdue' | 'next' | 'unscheduled';
  count: number;
  items: TodoItem[];
}

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Deal interface
interface Deal {
  id: number;
  title: string;
  budget: string;
  opportunityLevel: 'H' | 'M' | 'L';
  assignees: User[];
  extraAssignees?: number;
  stage: string;
}



export type {
  ActivityGroup,
  ActivityItem,
  Attachment,
  Contact,
  Deal,
  IconProps,
  MenuItem,
  MenuSection,
  NoteItem,
  TodoGroup,
  TodoItem,
  User,
};
