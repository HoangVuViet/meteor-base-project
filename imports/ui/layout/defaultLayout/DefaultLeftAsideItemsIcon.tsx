import React from 'react';
import { ServiceType } from '../../models/permission';
import { ReactComponent as Dashboard } from '../../svg/asideMenu/ic_asideDashboard.svg';
import { ReactComponent as IconHotel } from '../../svg/asideMenu/ic_asideHotel.svg';
import { ReactComponent as History } from '../../svg/asideMenu/ic_historyAsideIcon.svg';
import { ReactComponent as MemberManagement } from '../../svg/asideMenu/ic_memberManagerAsideIcon.svg';
import { ReactComponent as Finance } from '../../svg/asideMenu/ic_moneyAsideIcon.svg';
import { ReactComponent as Promotion } from '../../svg/asideMenu/ic_promotionAsideIcon.svg';
import { ReactComponent as RatePlane } from '../../svg/asideMenu/ic_ratePlanAsideIcon.svg';
import { ReactComponent as RateStar } from '../../svg/asideMenu/ic_rateStarAsideIcon.svg';
import { ReactComponent as Report } from '../../svg/asideMenu/ic_reportAsideIcon.svg';
import { ReactComponent as RoomSetting } from '../../svg/asideMenu/ic_roomSettingAsideIcon.svg';
import { ReactComponent as IconDashboard } from '../../svg/ic_dashboard.svg';
import { ReactComponent as IconSpace } from '../../svg/ic_space.svg';

interface Item {
  name: ServiceType | string;
  icon: any;
}
export const getMenuIcon = (name: ServiceType | string, style?: React.CSSProperties) => {
  switch (name) {
    case 'managerHotels.dashboard':
      return <Dashboard style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.hotelInfo':
      return <IconHotel style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.ratePlan':
      return <RatePlane style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.promotion':
      return <Promotion style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.booking':
      return <RoomSetting style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.memberManagement':
      return <MemberManagement style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.report':
      return <Report style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.finance':
      return <Finance style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.history':
      return <History style={{ width: 32, height: 32, ...style }} />;
    case 'managerHotels.customerRate':
      return <RateStar style={{ width: 32, height: 32, ...style }} />;
    case 'IDS_HMS_RATE_PLAN_ROOM':
      return <IconSpace style={{ width: 32, height: 32, ...style }} />;
    default:
      return <IconDashboard style={{ width: 12, marginLeft: 20, ...style }} />;
  }
};

interface Props {
  name: string;
  open?: boolean;
  style?: React.CSSProperties;
}

const DefaultLeftAsideItemsIcon: React.FC<Props> = (props: any) => {
  const { name, style } = props;

  return <>{getMenuIcon(name, style)}</>;
};

export default DefaultLeftAsideItemsIcon;
