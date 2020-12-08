import React from 'react';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { ROUTES_TAB } from '../../configs/routes';
import { flatRoutes } from '../utils';

const DefaultHelmet = () => {
  const intl = useIntl();
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const getTitle2 = React.useMemo(() => {
    return flatRoutes(ROUTES_TAB).find(v => v.path?.includes(pathname))?.name || null;
  }, [pathname]);

  return (
    <Helmet>
      {getTitle2 ? (
        <title>{intl.formatMessage({ id: getTitle2 })}</title>
      ) : (
        <title>HMS Premium</title>
      )}
    </Helmet>
  );
};

export default DefaultHelmet;
