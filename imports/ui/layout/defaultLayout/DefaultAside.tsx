import { ButtonBase, makeStyles, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import * as React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect } from 'react-redux';
import styles from '../../../../public/jss/material-dashboard-react/components/sidebarStyle.js';
import { GREEN } from '../../configs/colors';
import { ROUTES_TAB } from '../../configs/routes';
import { Row } from '../../modules/common/components/elements';
import { AppState } from '../../redux/reducers';
import '../../scss/svg.scss';
import { ASIDE_ITEM_HEIGHT, ASIDE_MIN_WIDTH, ASIDE_WIDTH, HEADER_HEIGHT } from '../constants';
import { getListRoutesContain } from '../utils';
const useStyles = makeStyles(styles as any);

export const ButtonRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      background: GREEN,
    },
    height: ASIDE_ITEM_HEIGHT,
    paddingRight: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    minWidth: ASIDE_WIDTH,
    textAlign: 'start',
  },
}))(ButtonBase);

const mapStateToProps = (state: AppState) => {
  return { router: state.router, userData: state.account.userData };
};
interface Props extends ReturnType<typeof mapStateToProps> {
  open: boolean;
  onClose(): void;
}

const DefaultAside: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { router, open, onClose, userData } = props;
  const { pathname } = router.location;
  const [hoverOpen, setOpen] = React.useState(false);
  const getListRouterActive = React.useMemo(() => {
    return getListRoutesContain(ROUTES_TAB, router.location.pathname);
  }, [router.location.pathname]);

  return (
    <>
      <div
        style={{
          minWidth: open ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
          transition: 'all 0.3s',
        }}
      />
      <div
        className={classes.background}
        style={{
          width: open || hoverOpen ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
          overflow: 'hidden',
          height: 'calc(100vh)',
          transition: 'width 0.3s',
          position: 'fixed',
          left: 0,
          flexShrink: 0,
          // background: PRIMARY
          backgroundImage: 'url(../../../../images/sidebar-2.jpg)',
          zIndex: 1200,
        }}
      >
        <ButtonRow
          style={{
            justifyContent: open || hoverOpen ? 'flex-end' : 'center',
            padding: open || hoverOpen ? '0px 20px' : 0,
            height: HEADER_HEIGHT,
            minWidth: open || hoverOpen ? ASIDE_WIDTH : ASIDE_MIN_WIDTH,
          }}
          onClick={onClose}
        >
          {open || hoverOpen ? (
            <Row className={classes.background}>
              <div className={classes.logo}>
                <Row className={classNames(classes.logoLink)}>
                  <div>
                    <img src="../../../../svg/ic_myTourWhiteLogo.svg" alt="logo" />
                  </div>
                  Logooo
                </Row>
              </div>
            </Row>
          ) : (
            <Row className={classes.background} style={{ alignItems: 'center' }}>
              <MenuIcon className={classes.background}></MenuIcon>
            </Row>
          )}
        </ButtonRow>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(DefaultAside);
