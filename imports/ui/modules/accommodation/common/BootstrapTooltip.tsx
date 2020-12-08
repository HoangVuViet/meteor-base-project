import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { GREY_900 } from '../../../configs/colors';

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: GREY_900,
  },
  tooltip: {
    backgroundColor: GREY_900,
  },
}));
const BootstrapTooltip = (props: any) => {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
};

export default BootstrapTooltip;
