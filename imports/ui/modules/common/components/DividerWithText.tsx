import { Divider, makeStyles, Theme, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';

const useStyles = makeStyles<Theme, { index: number }>(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  content: {
    paddingBottom: theme.spacing(1.5),
    color: 'lightgray',
    wordBreak: 'keep-all',
    position: 'absolute',
    left: ({ index }) => `calc(65% + ${index * 200}px)`,
    textAlign: 'center',
  },
}));

const DividerWithText = ({ childrenText }: any) => {
  const classes = useStyles({ index: 1 });
  return (
    <>
      <Divider />
      <div className={classes.container}>
        {childrenText.map((element: any, index: number) => {
          return <StepperCustom key={index} index={index} childrenText={element} />;
        })}
      </div>
    </>
  );
};

export function StepperCustom(props: any) {
  const classes = useStyles(props);
  const { childrenText } = props;
  return (
    <span className={classes.content}>
      <Typography variant="body2">{childrenText}</Typography>
      <FiberManualRecordIcon fontSize="inherit" />
    </span>
  );
}
export default DividerWithText;
