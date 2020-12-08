import React from 'react';
import styled from 'styled-components';
import ProgressiveImageCheckBox from '../../../common/components/ProgressiveImageCheckBox';

export const GridCustom = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`;
interface Props {
  src: string;
  isChecked: number[];
  handleChange(id: number, index: number): void;
  index: number;
  id: number;
}
export function GridImage(props: Props) {
  const { index, id, src, isChecked, handleChange } = props;
  return (
    <>
      <ProgressiveImageCheckBox
        index={index}
        value={isChecked.indexOf(index) !== -1}
        onChange={() => {
          handleChange(index, id);
        }}
        thumbnail={src}
      />
    </>
  );
}

const GridItemWrapper = styled.div`
  padding-right: 16px;
  flex: 0 0;
  display: flex;
  justify-content: center;
  align-items: stretch;

  box-sizing: border-box;

  :before {
    content: '';
    display: table;
  }
`;

export const GridItem = ({ forwardedRef, ...props }: any) => {
  return <GridItemWrapper ref={forwardedRef} {...props} />;
};
