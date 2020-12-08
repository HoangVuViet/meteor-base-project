/* eslint-disable no-nested-ternary */
import {
  fade,
  Grid,
  IconButton,
  TablePagination,
  TablePaginationProps,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { GREY, GREY_100, GREY_300 } from '../../../configs/colors';
import { ReactComponent as IconBox } from '../../../svg/ic_nodata.svg';
import { Col, Row } from './elements';
import LoadingIcon from './LoadingIcon';
import { useStylePagination } from './TableCustom';
import TablePaginationActionsCustom from './TableCustom/TablePaginationActionsCustom';

const styles = (theme: Theme) => {
  return {
    root: { justifyContent: 'flex-end' },
    selectRoot: {
      margin: '0 16px 0 8px',
      minWidth: '64px',
    },
    selectIcon: {
      top: 'calc(50% - 14px)',
    },
    input: {
      '& .MuiTablePagination-select': {
        textAlign: 'left',
        textAlignLast: 'left',
        background: 'white',
        border: `0.5px solid ${GREY}`,
        borderRadius: '2px',
        fontSize: theme.typography.body2.fontSize,
        padding: '3px 12px',
      },
    },
    actions: {
      marginLeft: '10px',
      '& .MuiIconButton-root': {
        padding: '6px',
      },
    },
    even: {
      background: 'white',
    },
    odd: {
      background: GREY_300,
    },
  };
};

interface Props<T extends Object> extends WithStyles<typeof styles> {
  style?: React.CSSProperties;
  styleTable?: React.CSSProperties;
  styleItems?: React.CSSProperties;
  dataSource?: T[];
  paginationProps?: TablePaginationProps;
  loading?: boolean;
  renderItem: (col: T, index: number) => React.ReactNode;
}

const TableCardCustom: <T extends Object>(
  prop: Props<T>,
) => React.ReactElement<Props<T>> = props => {
  const { paginationProps, loading, dataSource, renderItem, style, styleTable } = props;
  const intl = useIntl();
  const classesPagination = useStylePagination();
  return (
    <Col style={{ ...style }}>
      <Grid container spacing={2} style={{ ...styleTable }}>
        {dataSource && dataSource?.length > 0 ? (
          dataSource.map((v: typeof dataSource[number], index: number) => (
            <Grid item xs={3} style={{ cursor: 'pointer', minWidth: 400 }} key={index}>
              {renderItem(v, index)}
            </Grid>
          ))
        ) : (
          <>
            {!loading && (
              <Col
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '12px',
                  height: '100%',
                }}
              >
                <IconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  disabled
                  style={{
                    backgroundColor: GREY_100,
                    margin: '12px',
                  }}
                >
                  <IconBox />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  <FormattedMessage id="noData" />
                </Typography>
              </Col>
            )}
          </>
        )}
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              background: fade(GREY_100, 0.7),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoadingIcon />
          </div>
        )}
      </Grid>
      {dataSource && paginationProps && paginationProps.count > 0 && (
        <TablePagination
          component={Row}
          rowsPerPageOptions={[10, 15, 20, 25, 30, 35, 40]}
          {...paginationProps}
          classes={{
            root: classesPagination.root,
            selectRoot: classesPagination.selectRoot,
            selectIcon: classesPagination.selectIcon,
            input: classesPagination.input,
            actions: classesPagination.actions,
          }}
          labelRowsPerPage={intl.formatMessage({ id: 'labelRowPerPage' })}
          ActionsComponent={TablePaginationActionsCustom}
        />
      )}
    </Col>
  );
};

export default withStyles(styles)(TableCardCustom);
