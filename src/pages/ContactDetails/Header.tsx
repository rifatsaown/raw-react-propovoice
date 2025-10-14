import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Globe,
  MailPlus,
  MoreHorizontal,
  PhoneCall,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface ContactDetailsHeaderProps {
  contact: {
    name: string;
    company: string;
    type: string;
    email: string;
    messenger: string;
    phone: string;
    avatar?: string;
  };
}

export default function ContactDetailsHeader({
  contact,
}: ContactDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-2 py-4 px-4 sm:px-16 bg-white border-b border-gray-100">
      {/* First Row: Back and Title */}
      <div className="flex items-center gap-2 min-h-[32px]">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8"
          onClick={() => navigate(-1)}
          aria-label="Go back">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </Button>
        <span className="text-gray-600 font-medium text-sm sm:text-base">
          Contact Details
        </span>
      </div>

      {/* Second Row: Details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Contact Info */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <Avatar className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
            {contact.avatar ? (
              <AvatarImage src={contact.avatar} alt={contact.name} />
            ) : (
              <AvatarFallback className="text-sm sm:text-base">
                {contact.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h1 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
                {contact.name}
              </h1>
              <Badge className="bg-[#009B6A] text-white font-medium text-xs sm:text-sm w-fit">
                {contact.type}
              </Badge>
            </div>
            <div className="text-gray-400 text-sm truncate">
              {contact.company}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {/* Primary Action - Send Mail */}
          <Button
            className="h-9 sm:h-10 gap-1 sm:gap-2 bg-[#009B6A] hover:bg-green-700 rounded-[8px] text-xs sm:text-sm flex-1 sm:flex-none min-w-[100px] sm:min-w-[120px]"
            size="sm">
            <MailPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Send Mail</span>
            <span className="sm:hidden">Mail</span>
          </Button>

          {/* Secondary Actions */}
          <div className="flex gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Send message">
              <MailPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Visit website">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Call contact">
              <PhoneCall className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="More options">
              <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
