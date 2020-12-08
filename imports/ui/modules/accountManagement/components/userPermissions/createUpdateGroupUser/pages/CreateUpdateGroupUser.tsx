import React from 'react';
import { RoutesTabType } from '../../../../../../models/permission';
import { ROUTES } from '../../../../../../configs/routes';
import { UpdatePermissionDesktop } from '../updatePermissions/components/UpdatePermissionDesktop';
import MiniLayout from '../../../../../common/components/MiniLayout';


interface Props {}
const CreateUpdateGroupUserDesktop: React.FC<Props> = props => {
  // const getTabIndex = React.useMemo(() => {
  //   let temp = 0;
  //   defaultGroupUserStep.forEach((v: some, index: number) => {
  //     if (step.action === v.action) {
  //       temp = index;
  //     }
  //   });
  //   return temp;
  // }, []);

  const fakeRoute: RoutesTabType[] = [
    {
      name: 'accManagement.generalInfo',
      path: ROUTES.accountInfo.groupUsers.create.generalInfo,
      component: UpdatePermissionDesktop,
    },
    {
      name: 'accManagement.addNewHotelAndUser',
      path: ROUTES.accountInfo.groupUsers.create.hotelInfo,
      component: undefined,
    },
  ];
  return <MiniLayout data={fakeRoute} />;
};

export default CreateUpdateGroupUserDesktop;
