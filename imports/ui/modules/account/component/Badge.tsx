import * as React from 'react';
import LanguageSelect from '../../intl/components/LanguageSelect';
import MapDisplay from '../../intl/components/TopBarDisplay';

interface Props {}

// eslint-disable-next-line no-unused-vars
const Badge: React.FunctionComponent<Props> = (props) => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        flexShrink: 0,
        flexGrow: 1,
        position: 'relative',
      }}
    >
      <MapDisplay />
      <LanguageSelect />
      {/* <NotificationDropdown /> */}
      {/* <UserInfoDropdown /> */}
    </div>
  );
};

export default Badge;
