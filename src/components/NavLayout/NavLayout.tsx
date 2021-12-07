import React from 'react';

import Nav from '@/components/NavLayout/components/Nav/Nav';

const NavLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default NavLayout;
