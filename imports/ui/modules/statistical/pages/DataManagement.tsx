import * as React from 'react';
import { useDispatch } from 'react-redux';
import ManagementDataTable from '../components/ManagementDataTable';
import { some } from '/imports/ui/constants';

interface IDataManagementProps {
  position: some;
  address: string;
  progress: number;
}

const DataManagement: React.FunctionComponent<IDataManagementProps> = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [dataList, setDataList] = React.useState<some>({});
  const [filter, setFilter] = React.useState<some>({
    pageOffset: 0,
    pageSize: 20,
  });

  return (
    <div style={{ overflow: 'auto' }}>
      <ManagementDataTable
        loading={loading}
        dataList={dataList}
        setFilter={setFilter}
        filter={filter}
      />
    </div>
  );
};

export default DataManagement;
