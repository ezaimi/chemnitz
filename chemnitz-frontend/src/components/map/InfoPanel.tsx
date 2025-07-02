import { Feature, FeatureProperties } from '@/types/Features';

const allowedKeys: (keyof FeatureProperties)[] = [
  'name',
  'addr',
  'cuisine',
  'opening_hours',
  'website',
  'phone',
  'wheelchair',
  'outdoor_seating',
  'indoor_seating',
];


interface InfoPanelProps {
  isPanelOpen: boolean;
  feature: Feature | null;
}

function InfoPanel({ isPanelOpen, feature }: InfoPanelProps) {
  return (
    <div
      className={`
        absolute z-[900] p-3 shadow-lg overflow-hidden
        bottom-0 w-full h-full
        md:top-0 md:right-0 md:h-full md:w-[25rem]
        transition-opacity duration-1000 ease-in-out
        ${isPanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div className="h-full w-full bg-white rounded-2xl">
        <div className="p-6 overflow-auto max-h-full">
          {feature ? (
            <>
            <div className="bg-amber-300 w-full h-48 rounded-xl overflow-hidden mb-4">
                <img
                  src={
                    feature.properties?.image ||
                    'https://via.placeholder.com/600x300?text=No+Image+Available'
                  }
                  alt={feature.properties?.name || 'Feature Image'}
                  className="w-full h-full object-cover"
                />
              </div>
               <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {feature.properties?.name ?? 'No name'}
              </h2>

              <div className="w-full space-y-3">
                {allowedKeys.map((key) => {
                  if (key === 'name' || key === 'image') return null;

                  const value = feature.properties?.[key];
                  if (value === undefined || value === '') return null;

                  return (
                    <div
                      key={key}
                      className="border-b pb-2 flex gap-3 text-sm text-gray-700"
                    >
                      <span className="min-w-[120px] font-semibold capitalize text-gray-500">
  {String(key).replace(/_/g, ' ')}
</span>

                      <span className="flex-1 text-gray-900 break-words">
                        {typeof value === 'object'
                          ? JSON.stringify(value)
                          : value.toString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-gray-400">Select a marker to see details.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;
