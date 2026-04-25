export default function ProgressChart() {
  const weekData = [
    { day: 'S', progress: 30 },
    { day: 'M', progress: 50 },
    { day: 'T', progress: 45 },
    { day: 'W', progress: 60 },
    { day: 'T', progress: 85 },
    { day: 'F', progress: 70 },
    { day: 'S', progress: 55 },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="text-base font-bold text-gray-900 mb-4">Startup Progress</h3>
      <p className="text-2xl font-bold text-gray-900 mb-2">67%</p>
      <p className="text-xs text-gray-500 mb-4">Total Progress</p>
      
      {/* Bar Chart */}
      <div className="flex items-end justify-center gap-1.5 h-32">
        {weekData.map((data, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1">
            <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '120px' }}>
              <div
                className="w-full bg-blue-500 rounded-t-lg transition-all duration-300"
                style={{ height: `${data.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1.5 font-medium">{data.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
