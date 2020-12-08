/* eslint-disable no-nested-ternary */
import { Avatar, Badge, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import avatarNotFound from '../../../../../../images/avatar_not_found.jpg';
import { GREEN, WHITE, GREY_600, RED, BLUE, GREY_400 } from '../../../../../../configs/colors';
import { CardCustom, Col } from '../../../../../common/components/elements';
import { DataAccount } from '../../../../ultis';

interface Props {
  dataAccount: DataAccount;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(3),
      },
    },
    activeStyle: {
      '& span': {
        backgroundColor: GREEN,
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        border: `2px solid ${WHITE}`,
      },
    },
    inactiveStyle: {
      '& span': {
        backgroundColor: GREY_600,
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        border: `2px solid ${WHITE}`,
      },
    },
    stoppedStyle: {
      '& span': {
        backgroundColor: RED,
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        border: `2px solid ${WHITE}`,
      },
    },
  }),
);

const MemberCard: React.FC<Props> = props => {
  const { dataAccount } = props;
  const { name, email, phone, profilePhoto, status } = dataAccount;
  const classes = useStyles();

  return (
    <CardCustom onClick={() => {}} variant="outlined">
      <div className={classes.root}>
        <Badge
          className={
            status === 1
              ? classes.activeStyle
              : status === 0
              ? classes.stoppedStyle
              : classes.inactiveStyle
          }
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          style={{ zIndex: 0 }}
          variant="dot"
        >
          <Avatar style={{ width: 100, height: 100 }} alt="" src={profilePhoto || avatarNotFound} />
        </Badge>
      </div>
      <Col style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 1 }}>
        <Typography variant="subtitle1" color={status === 1 ? 'textPrimary' : 'textSecondary'}>
          {name}
        </Typography>
        <Typography variant="body2" style={{ color: BLUE, marginBottom: 4 }}>
          {email}
        </Typography>
        <Typography
          variant="body2"
          style={{ color: status ? 'textPrimary' : GREY_400, marginBottom: 4 }}
        >
          {phone || ''}
        </Typography>
        <Typography
          variant="body2"
          style={{ color: status === 1 ? GREEN : status === 0 ? RED : GREY_600 }}
        >
          <FormattedMessage
            id={status === 1 ? 'activated' : status === 0 ? 'stopped' : 'inactivate'}
          />
        </Typography>
      </Col>
    </CardCustom>
  );
};

export default MemberCard;
