import React from 'react';
import { CFooter } from '@coreui/react';

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://fimo.edu.vn/" target="_blank" rel="noopener noreferrer">
          FIMO
        </a>
        <span className="ml-1">&copy; 2021 creativeLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Created by</span>
        <a href="https://github.com/HoangVuViet" target="_blank" rel="noopener noreferrer">
          HoangVuViet
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
