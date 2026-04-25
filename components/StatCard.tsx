interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export default function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Icon */}
      <div className="mb-2.5">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xs font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-1.5">{value}</p>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
}
