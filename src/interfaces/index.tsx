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
    type: "Client" | "Lead";
    avatar: string | null;
    fallback: string;
  }

  export type { MenuItem, MenuSection, IconProps, Contact };