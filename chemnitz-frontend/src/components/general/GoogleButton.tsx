import React from 'react';

interface Props {
  label: string;
}

function GoogleButton({ label }: Props) {
  return (
    <button className="px-4 py-2 flex items-center justify-center gap-2 border rounded-full w-full">
      <img src="/assets/icon/googleicon.png" alt="Google" className="h-4 w-8" />
      <p className="text-sm font-medium">{label}</p>
    </button>
  );
}

export default GoogleButton;
