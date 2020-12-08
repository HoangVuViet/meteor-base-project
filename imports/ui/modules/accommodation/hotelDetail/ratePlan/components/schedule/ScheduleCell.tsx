import React from 'react';
import { Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import styled from 'styled-components';
import { GREY_400, RED_50, GREY_100 } from '../../../../../../configs/colors';

interface CellProps {
  hover: boolean;
  isFocus?: boolean;
  isBetween?: boolean;
  isBefore?: boolean;
}

const Cell = styled.td<CellProps>`
  height: 64px;
  border: 1px solid ${GREY_400};
  box-sizing: border-box;
  padding: 0px;
  user-select: none;
  /* cursor: ${props => (props.hover ? 'pointer' : undefined)}; */
  &:hover {
    background: ${props => (props.hover && !props.isFocus ? fade(`${RED_50}`, 0.2) : undefined)};
  }
  background: ${(props: any) =>
    // eslint-disable-next-line no-nested-ternary
    props?.isFocus ? RED_50 : props?.isBetween ? '#ffeaa4' : props?.isBefore ? GREY_100 : 'white'};
  color: ${props => props.isFocus && 'white'};
`;

interface Props {
  isCannotView: boolean;
  price: number | null;
}

const ScheduleCell: React.FC<Props> = props => {
  const { isCannotView, price } = props;

  return (
    <>
      <Cell draggable={false} hover style={{ height: 64, background: GREY_100 }}>
        <div style={{ height: '100%', position: 'relative', minWidth: 64 }}>
          <div
            style={{
              height: 20,
              top: 10,
              width: '100%',
              position: 'absolute',
              background: undefined,
              boxSizing: 'border-box',
              textAlign: 'right',
              paddingRight: 4,
              color: GREY_400,
            }}
          >
            {price && !isCannotView && (
              <Typography style={{ fontSize: 12 }} className="schedule-cell-item-content">
                {new Intl.NumberFormat().format(price)}
              </Typography>
            )}
            {price && !isCannotView && (
              <Typography style={{ whiteSpace: 'nowrap', fontSize: 12 }}>VND</Typography>
            )}
          </div>
        </div>
      </Cell>
    </>
  );
};

export default ScheduleCell;
