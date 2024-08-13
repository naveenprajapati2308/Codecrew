import { useState, useEffect } from 'react';

const useToastOnce = (key) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const hasShownToast = localStorage.getItem(key);
    if (!hasShownToast) {
      setShowToast(true);
      localStorage.setItem(key, 'true');
    }
  }, [key]);

  return showToast;
};

export {
    useToastOnce
};
