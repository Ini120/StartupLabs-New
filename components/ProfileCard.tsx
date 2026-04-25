export default function ProfileCard() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col items-center text-center">
        {/* Profile Avatar */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
          A
        </div>
        
        {/* Name and Title */}
        <h3 className="text-base font-bold text-gray-900">Alex Morgan</h3>
        <p className="text-xs text-gray-500 mb-3">Founder</p>
        
        {/* Stats */}
        <div className="w-full border-t border-gray-200 pt-3 mt-3">
          <p className="text-xs text-gray-500 mb-1">Member since 2024</p>
          <p className="text-xs text-gray-500">Tier: Premium</p>
        </div>
      </div>
    </div>
  );
}
