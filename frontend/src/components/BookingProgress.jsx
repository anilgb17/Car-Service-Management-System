import { Check } from 'lucide-react';

export default function BookingProgress({ status }) {
  const steps = ['Pending', 'Confirmed', 'In Progress', 'Completed'];
  const currentIndex = steps.indexOf(status);

  if (status === 'Cancelled') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Cancelled
      </span>
    );
  }

  return (
    <div className="w-full min-w-[240px] max-w-sm pt-2 pb-6 px-2">
      <div className="flex items-center justify-between relative">
        {/* Background track */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 -z-10 rounded-full"></div>
        {/* Active track */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 -z-10 rounded-full transition-all duration-500"
          style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = status === 'Completed' ? index <= currentIndex : index < currentIndex;
          const isCurrent = status !== 'Completed' && index === currentIndex;

          return (
            <div key={step} className="flex flex-col items-center relative">
              <div 
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ring-4 ring-white shadow-sm transition-colors duration-300
                  ${isCompleted || isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                ) : (
                  index + 1
                )}
              </div>
              <span className={`absolute -bottom-5 sm:-bottom-6 text-[10px] sm:text-[11px] font-bold whitespace-nowrap
                ${(isCompleted || isCurrent) ? 'text-gray-800' : 'text-gray-400'}`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
