import { ButtonBase, MenuItem, MenuList, Popover, Tooltip, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { BLUE_600, PRIMARY, WHITE } from '../../configs/colors';
import { HEADER_TABS, ROUTES } from '../../configs/routes';
import { RoutesTabType } from '../../models/permission';
import { RawLink } from '../../modules/common/components/Link';
import { slideSettings } from '../../modules/common/components/Slider/setting';
import { AppState } from '../../redux/reducers';
import { ASIDE_TOP_HEIGHT, HEADER_HEIGHT } from '../constants';
import DefaultAsideItemsIcon from './DefaultAsideItemsIcon';

const mapStateToProps = (state: AppState) => {
  return { router: state.router, userData: state.account.userData };
};
interface Props extends ReturnType<typeof mapStateToProps> {}

const DefaultTopAside: React.FunctionComponent<Props> = props => {
  const { router } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <div
        style={{
          background: BLUE_600,
          height: ASIDE_TOP_HEIGHT,
          position: 'sticky',
          top: HEADER_HEIGHT,
          zIndex: 900,
          width: '100%',
        }}
      >
        <Slider {...slideSettings()}>
          {HEADER_TABS.filter(v => !v.hidden && v.path).map(
            (item: RoutesTabType, index: number) => {
              if (item.name === 'marketing') {
              }
              return (
                <Tooltip
                  key={item.name}
                  title={
                    item.title || item.name ? <FormattedMessage id={item.title || item.name} /> : ''
                  }
                  placement="bottom"
                >
                  <RawLink
                    to={{
                      pathname: item.path,
                      state: { ...router.location.state, [`${item.path}`]: true },
                    }}
                    style={{ display: 'flex', flex: 1, width: 'calc(100vw / 9)' }}
                  >
                    <ButtonBase
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: 1,
                        fontSize: 'small',
                        minHeight: ASIDE_TOP_HEIGHT,
                        background:
                          (item.path &&
                            (router.location.pathname === item.path ||
                              (item.path.split('/')[1] !== '' &&
                                router.location.pathname.includes(item.path.split('/')[1])))) ||
                          (open && item.name === 'marketing')
                            ? PRIMARY
                            : undefined,
                      }}
                      onClick={e => {
                        if (item.name === 'marketing') {
                          handlePopoverOpen(e);
                          e.preventDefault();
                        }
                      }}
                    >
                      <DefaultAsideItemsIcon name={item.name} style={{ width: 24, height: 24 }} />
                      <Typography
                        variant="body2"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: WHITE,
                          marginTop: 8,
                        }}
                      >
                        {item.title ? (
                          <FormattedMessage id={item.title} />
                        ) : (
                          item.name && <FormattedMessage id={item.name} />
                        )}
                      </Typography>
                    </ButtonBase>
                  </RawLink>
                </Tooltip>
              );
            },
          )}
        </Slider>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <MenuList autoFocusItem={open} style={{ minWidth: 200 }}>
            <MenuItem>
              <RawLink replace to={{ pathname: ROUTES.marketing.ranking }}>
                <Typography gutterBottom variant="body2" component="span">
                  <FormattedMessage id="IDS_HMS_RANKING_SETUP" />
                </Typography>
              </RawLink>
            </MenuItem>
            <MenuItem onClick={handlePopoverClose}>
              <RawLink replace to={{ pathname: ROUTES.marketing.tag.list }}>
                <Typography gutterBottom variant="body2" component="span">
                  <FormattedMessage id="IDS_HMS_TAG_MANAGEMENT" />
                </Typography>
              </RawLink>
            </MenuItem>
          </MenuList>
        </Popover>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(DefaultTopAside);
