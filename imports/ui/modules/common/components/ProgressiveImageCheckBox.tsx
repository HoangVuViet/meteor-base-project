import { ButtonBase } from '@material-ui/core';
import React from 'react';
import { WhiteBackgroundCheckbox } from '../../accommodation/common/WhiteBackgroundCheckbox';
import ProgressiveImage from '../components/ProgressiveImage';

interface ProgressiveImageCheckBoxProps {
  index: number;
  value: boolean;
  onChange(): void;
  thumbnail: string;
}

function ProgressiveImageCheckBox(props: ProgressiveImageCheckBoxProps) {
  const { index, value, onChange, thumbnail } = props;
  return (
    <ButtonBase onClick={onChange} style={{ marginTop: 4 }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            maxWidth: 240,
            width: '100%',
          }}
        >
          <WhiteBackgroundCheckbox color="primary" key={index} checked={value} />
        </div>
        <ProgressiveImage
          style={{ maxWidth: 200, borderRadius: 4, objectFit: 'cover' }}
          src={thumbnail}
          alt=""
        />
      </div>
    </ButtonBase>
  );
}

export default ProgressiveImageCheckBox;
