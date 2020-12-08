import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography, Button, Popover } from '@material-ui/core';
import { some } from '../../../../../constants';
import { isEmpty } from '../../../utils';
import { GREY_900, ORANGE, ORANGE_100 } from '../../../../../configs/colors';

interface Props {
  contract: some;
}
const MoreFileDialog: React.FC<Props> = props => {
  const { contract } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        disableElevation
        fullWidth
        style={{ width: 110, minHeight: 26, marginTop: 8, background: ORANGE_100, color: ORANGE }}
        onClick={handleClick}
      >
        <Typography variant="body2" component="span">
          <FormattedMessage id="IDS_HMS_VIEW_ALL_FILE" />
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <div style={{ padding: '12px 16px' }}>
          <Typography gutterBottom variant="subtitle2" component="span" style={{ color: GREY_900 }}>
            <FormattedMessage id="IDS_HMS_CONTRACT_FILE" />
          </Typography>

          {!isEmpty(contract?.files) &&
            contract?.files.map((el: some, idx: number) => {
              return (
                <Typography key={el?.id} variant="body2" component="p">
                  <a href={el?.url} type="download" style={{ textDecoration: 'none' }}>
                    {el?.name}
                  </a>
                </Typography>
              );
            })}
        </div>
      </Popover>
    </>
  );
};
export default React.memo(MoreFileDialog);
