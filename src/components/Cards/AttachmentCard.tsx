import type { Attachment } from '@/interfaces';
import { FileText, Maximize2, MoreVertical } from 'lucide-react';

interface AttachmentCardProps {
  attachment: Attachment;
  formatFilename: (name: string) => string;
}

export default function AttachmentCard({
  attachment,
  formatFilename,
}: AttachmentCardProps) {
  if (attachment.kind === 'image' && attachment.src) {
    return (
      <div className="group relative w-24 h-24 rounded-sm overflow-hidden bg-white shadow-sm cursor-pointer">
        <img
          src={attachment.src}
          alt={attachment.name}
          className="h-full w-full object-cover"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Enlarge icon in center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="size-5 text-white" />
        </div>

        {/* 3-dot menu button */}
        <button className="absolute right-1.5 top-1.5 inline-flex items-center justify-center size-6 rounded-md bg-white/95 backdrop-blur-sm text-[#18181B] hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10">
          <MoreVertical className="size-3.5" />
        </button>

        <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm px-2 py-1.5">
          <p className="text-[10px] font-medium text-[#3F3F46] truncate">
            {formatFilename(attachment.name)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative w-24 h-24 rounded-sm overflow-hidden bg-white shadow-sm flex flex-col">
      <button className="absolute right-1.5 top-1.5 inline-flex items-center justify-center size-6 rounded-md bg-white hover:bg-gray-50 text-[#18181B] transition-all z-10 opacity-0 group-hover:opacity-100">
        <MoreVertical className="size-3.5" />
      </button>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center justify-center size-10 rounded-full bg-[#3B82F6]">
          <FileText className="size-5 text-white" />
        </div>
      </div>

      <div className="bg-white px-2 py-1.5 border-t border-gray-100">
        <p className="text-[10px] font-medium text-[#3F3F46] truncate">
          {formatFilename(attachment.name)}
        </p>
      </div>
    </div>
  );
}
