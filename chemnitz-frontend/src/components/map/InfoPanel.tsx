import React from 'react';
import { Feature } from '@/types/Features';

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
        md:top-0 md:right-0 md:h-full md:w-[30rem]
        transition-opacity duration-1000 ease-in-out
        ${isPanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div className="h-full w-full bg-white rounded-2xl">
        <div className="p-6 overflow-auto max-h-full">
          {feature ? (
            <>
              <h2 className="text-xl font-semibold mb-2">
                {feature.properties?.name ?? 'No name'}
              </h2>
              <table className="w-full text-sm border-separate border-spacing-y-1">
                <tbody>
                  {Object.entries(feature.properties || {}).map(([key, value]) => (
                    <tr key={key} className="align-top">
                      <td className="pr-2 text-gray-600 font-medium whitespace-nowrap">{key}</td>
                      <td className="break-all text-gray-900">
                        {typeof value === 'object' && value !== null
                          ? JSON.stringify(value)
                          : value?.toString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
