import React from 'react';
import Button from '@/components/general/button';  

interface Props {
  label: string;
}

function GoogleButton({ label }: Props) {
  return (
    <Button
      label={label}
      startIcon={<img src="/assets/icon/googleicon.png" alt="Google" className="h-4 w-8" />}
      bgColor="#f2f2f2"              
      textColor="#111111"               
      hoverBgColor="#1c191b"
      hoverTextColor="white"
      onClick={()=>{window.location.href = 'http://localhost:5000/api/auth/google'}}
    />
  );
}

export default GoogleButton;
