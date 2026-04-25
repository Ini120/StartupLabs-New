interface MeetingCardProps {
  title: string;
  with: string;
  time: string;
  date: string;
  avatar: string;
}

export default function MeetingCard({ title, with: withPerson, time, date, avatar }: MeetingCardProps) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
          {avatar}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">with {withPerson}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-medium text-gray-900">{time}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}
