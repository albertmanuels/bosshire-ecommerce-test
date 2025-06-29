import { useState } from 'react';

const useDashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleDrawerClose,
    handleDrawerOpen,
  };
};

export default useDashboardLayout;
