import { Flag, Paperclip, SmileIcon } from 'lucide-react';

export default function NoteComposer() {
  return (
    <div className="rounded-xl  bg-[#F4F4F5] ">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="relative">
            <textarea
              className="w-full resize-none rounded-lg border border-transparent bg-[#F4F4F5] px-4 py-3 pr-28 text-sm outline-none focus:border-[#E4E4E7] focus:bg-white focus:ring-0 min-h-[44px]"
              placeholder="Write Notes for team"
              rows={2}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1.5 text-[#52525B]">
              <button className="hover:text-[#18181B] p-1.5 hover:bg-[#F4F4F5] bg-white rounded-full">
                <SmileIcon className="size-4" />
              </button>
              <button className="hover:text-[#18181B] p-1.5 hover:bg-[#F4F4F5] bg-white rounded-full">
                <Paperclip className="size-4" />
              </button>
              <button className="hover:text-[#18181B] p-1.5 hover:bg-[#F4F4F5] bg-white rounded-full">
                <Flag className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
