import React from 'react';
import { ServiceType } from '../../models/permission';
import { ReactComponent as IconBill } from '../../svg/menu/ic_bill.svg';
import { ReactComponent as IconDolar } from '../../svg/menu/ic_dolar.svg';
import { ReactComponent as IconHotel } from '../../svg/menu/ic_hotel.svg';
import { ReactComponent as IconIdea } from '../../svg/menu/ic_idea.svg';
import { ReactComponent as IconProvider } from '../../svg/menu/ic_provider.svg';
import { ReactComponent as IconSetting } from '../../svg/menu/ic_setting.svg';
import { ReactComponent as StaffIcon } from '../../svg/menu/ic_staff.svg';
import { ReactComponent as IconStar } from '../../svg/menu/ic_star.svg';
import { ReactComponent as IconDashboard } from '../../svg/ic_dashboard.svg';
import '../../scss/svg.scss';

interface Item {
  name: ServiceType | string;
  icon: any;
}
export const getMenuIcon = (name: ServiceType | string, style?: React.CSSProperties) => {
  switch (name) {
    case 'managerUsers':
      return <StaffIcon style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels':
      return <IconHotel style={{ width: 32, height: 32, ...style }} />;
    case 'pricePackage':
      return <IconDolar style={{ width: 32, height: 32, ...style }} />;
    case 'provider':
      return <IconProvider style={{ width: 32, height: 32, ...style }} />;
    case 'marketing':
      return <IconIdea style={{ width: 32, height: 32, ...style }} />;
    case 'review':
      return <IconStar style={{ width: 32, height: 32, ...style }} />;
    case 'saleChanel':
      return <IconBill style={{ width: 32, height: 32, ...style }} />;
    case 'generalSetting':
      return <IconSetting style={{ width: 32, height: 32, ...style }} />;
    case 'hotelTest':
      return <IconSetting style={{ width: 32, height: 32, ...style }} />;
    default:
      return <IconDashboard style={{ width: 12, marginLeft: 20, ...style }} />;
  }
};

interface Props {
  name: string;
  open?: boolean;
  style?: React.CSSProperties;
}

const DefaultAsideItemsIcon: React.FC<Props> = props => {
  const { name, style } = props;
  const getIcon = React.useMemo(() => {
    return getMenuIcon(name, style);
  }, [name, style]);

  return <>{getIcon}</>;
};

export default DefaultAsideItemsIcon;
