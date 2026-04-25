interface MessageCardProps {
  name: string;
  message: string;
  time: string;
  avatar: string;
  unread?: boolean;
}

export default function MessageCard({ name, message, time, avatar, unread }: MessageCardProps) {
  return (
    <div className={`flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${unread ? 'bg-blue-50' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-xs">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className={`text-xs font-semibold text-gray-900 ${unread ? 'font-bold' : ''}`}>{name}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
        <p className="text-xs text-gray-600 truncate">{message}</p>
      </div>
      {unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
    </div>
  );
}
