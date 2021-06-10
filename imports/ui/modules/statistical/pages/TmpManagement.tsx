import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { tmpData } from '../utils';
import { DATA_TMP, isEmpty, some } from '/imports/ui/constants';
import { AppState } from '/imports/ui/redux/reducers';
const TmpManagementTable = React.lazy(() => import('../components/management/TmpManagementTable'));

interface ITmpManagementProps {
  position: some;
  address: string;
  progress: number;
}

const TmpManagement: React.FunctionComponent<ITmpManagementProps> = (_props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [loading, setLoading] = React.useState(false);
  const [dataList, setDataList] = React.useState<some[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [filter, setFilter] = React.useState<some>({
    pageOffset: 0,
    pageSize: 20,
  });

  const fetchData = React.useCallback(
    async (_resultFilter: some) => {
      try {
        setLoading(true);
        if (!isEmpty(JSON.parse(localStorage.getItem(DATA_TMP) || '{}'))) {
          setDataList(JSON.parse(localStorage.getItem(DATA_TMP) || '{}'));
        } else {
          setDataList(tmpData);
          localStorage.setItem(DATA_TMP, JSON.stringify(tmpData));
        }
        setLoading(false);
      } catch (error) {}
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const handleDeleteData = React.useCallback(
    async (dataId: number) => {
      try {
        const temp: some = JSON.parse(localStorage.getItem(DATA_TMP) || '{}');
        localStorage.setItem(
          DATA_TMP,
          JSON.stringify(temp.filter((el: some, _idx: number) => el.id !== dataId)),
        );
        setDataList(temp.filter((el: some, _idx: number) => el.id !== dataId));
        return temp.filter((el: some, _idx: number) => el.id !== dataId);
      } catch (error) {}
    },
    [closeSnackbar, dispatch, enqueueSnackbar],
  );

  const handleAddData = React.useCallback(
    async (value: some) => {
      try {
        localStorage.setItem(DATA_TMP, JSON.stringify([...dataList, value]));
        return setDataList([...dataList, value]);
      } catch (error) {}
    },
    [dataList],
  );

  const handleEditData = React.useCallback(
    async (value: some) => {
      try {
        localStorage.setItem(
          DATA_TMP,
          JSON.stringify(
            dataList.map((el: some, _idx: number) => {
              if (el.id === value.id) return value;
              return el;
            }),
          ),
        );
        return setDataList(
          dataList.map((el: some, _idx: number) => {
            if (el.id === value.id) return value;
            return el;
          }),
        );
      } catch (error) {}
    },
    [dataList],
  );

  React.useEffect(() => {
    fetchData(filter);
    // eslint-disable-next-line
  }, [filter]);
  return (
    <div style={{ overflow: 'auto' }}>
      <TmpManagementTable
        loading={loading}
        dataList={dataList?.sort((a: some, b: some) => Number(b.id) - Number(a.id))}
        setFilter={setFilter}
        filter={filter}
        handleDeleteData={(value: number) => handleDeleteData(value)}
        handleAddData={(value: some) => handleAddData(value)}
        handleEditData={(value: some) => handleEditData(value)}
      />
    </div>
  );
};

export default TmpManagement;