import { ButtonBase, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { GREY_100, GREY_400 } from '../../../../configs/colors';
import { ReactComponent as AddIcon } from '../../../../svg/ic_addIcon.svg';
import DragItem from './DragItem';
import { GridCustom, GridImage, GridItem } from './Grid';
import GridContext from './GridContext';

interface Props {
  isChecked: number[];
  handleChange(id: number, index: number): void;
  saveFunctions(): void;
}

const DndPhotosCore: React.FC<Props> = (props: Props) => {
  const { items, moveItem } = useContext<any>(GridContext);
  const { isChecked, handleChange, saveFunctions } = props;
  return (
    <div className="DndPhotosCore">
      <GridCustom>
        {items &&
          items.map((item: any, index: number) => (
            <DragItem key={item.id} id={item.id} onMoveItem={moveItem}>
              {item.thumbnail && (
                <GridItem>
                  <GridImage
                    isChecked={isChecked}
                    handleChange={handleChange}
                    src={item.thumbnail}
                    index={index}
                    id={item.id}
                  />
                </GridItem>
              )}
            </DragItem>
          ))}
        <ButtonBase
          style={{
            background: GREY_100,
            border: `1px dashed ${GREY_400}`,
            boxSizing: 'border-box',
            borderRadius: 4,
            width: 200,
            height: 160,
            display: 'flex',
            marginTop: 4,
          }}
          onClick={saveFunctions}
        >
          <Typography
            variant="body2"
            style={{
              color: GREY_400,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <AddIcon className="svgFillAll" width={24} stroke={GREY_400} />
            <FormattedMessage id="IDS_addNewPhoto" />
          </Typography>
        </ButtonBase>
      </GridCustom>

      <Grid item xs={3} />
    </div>
  );
};

export default DndPhotosCore;
