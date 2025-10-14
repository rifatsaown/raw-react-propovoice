import { avatar } from '@/assets';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { BellRing, Info, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="w-full h-12 flex items-center justify-between bg-white px-16">
      {/* Search Bar */}
      <div className="flex-1 max-w-xs relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
        <Input
          type="text"
          placeholder="Search..."
          className="h-8 text-sm pl-8 pr-3"
        />
      </div>

      {/* Right-side Icons */}
      <div className="flex items-center gap-4 ml-auto">
        <Info className="w-5 h-5 text-gray-600" />
        <BellRing className="w-5 h-5 text-gray-600" />

        {/* Theme Switcher  TODO: Will be Removed Letter*/}
        <ThemeSwitcher />

        {/* Avatar */}
        <Link to="/profile-info">
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatar} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
