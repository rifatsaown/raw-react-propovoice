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

export type {
  ActivityGroup,
  ActivityItem,
  Attachment,
  Contact,
  IconProps,
  MenuItem,
  MenuSection,
  NoteItem,
};
