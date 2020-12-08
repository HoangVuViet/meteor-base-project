import React from 'react';
import { makeStyles, Theme, createStyles, Checkbox } from '@material-ui/core';
import { some } from '../../../../../../../constants';
import { fakePermission, PermissionItem } from '../../../constants';
import TableCustom, { Column, ExtendColumn } from '../../../../../../common/components/TableCustom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cover: {
      padding: 0,
    },
    paper: {
      boxShadow: 'none',
    },
    cellHeader: { padding: 0 },
  }),
);

interface Props {
  listRole: some[];
}

export const UpdatePermissionDesktop = (props: Props) => {
  // const { listRole } = props;
  const classes = useStyles();
  const [data, setData] = React.useState(fakePermission);

  const getDataEditAll = React.useCallback(
    (arr: PermissionItem[], isEdit: boolean, checkedAll: number): PermissionItem[] => {
      const temp = arr.map((value: PermissionItem, index: number) => {
        if (value.listRole) {
          return { ...value, listRole: getDataEditAll(value.listRole, isEdit, checkedAll) };
        }
        return isEdit
          ? {
              ...value,
              editable: value.editable ? { ...value.editable, status: checkedAll } : undefined,
            }
          : {
              ...value,
              viewable: value.viewable ? { ...value.viewable, status: checkedAll } : undefined,
            };
      });
      return temp;
    },
    [],
  );

  const getDataEdit = React.useCallback(
    (arr: PermissionItem[], obj: PermissionItem, isEdit: boolean): PermissionItem[] => {
      const temp = arr.map((value: PermissionItem, index: number) => {
        if (value.name === obj.name) {
          if (value.listRole) {
            const checkedAll =
              value.listRole.filter(v =>
                isEdit ? v.editable?.status === 1 : v.viewable?.status === 1,
              ).length === value.listRole.filter(v => (isEdit ? !!v.editable : !!v.viewable)).length
                ? 0
                : 1;
            return {
              ...value,
              listRole: getDataEditAll(value.listRole, isEdit, checkedAll),
            };
          }
          return isEdit
            ? {
                ...value,
                editable: value.editable
                  ? { ...value.editable, status: Math.abs(1 - value.editable?.status) }
                  : undefined,
              }
            : {
                ...value,
                viewable: value.viewable
                  ? { ...value.viewable, status: Math.abs(1 - value.viewable?.status) }
                  : undefined,
              };
        }
        if (value.listRole) {
          return { ...value, listRole: getDataEdit(value.listRole, obj, isEdit) };
        }
        return value;
      });
      return temp;
    },
    [getDataEditAll],
  );

  const columns = React.useMemo(() => {
    return [
      {
        dataIndex: 'name',
      },
      {
        title: 'accManagement.view',
        width: 120,
        render: (record: PermissionItem, index: number) => (
          <>
            <Checkbox
              checked={
                record.listRole
                  ? record.listRole.filter(v => v.viewable?.status === 1).length ===
                    record.listRole.length
                  : record.viewable?.status === 1
              }
              onChange={() => setData(getDataEdit(data, record, false))}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </>
        ),
      },
      {
        title: 'accManagement.edit',
        width: 120,
        render: (record: PermissionItem, index: number) => (
          <>
            <Checkbox
              checked={
                record.listRole
                  ? record.listRole.filter(v => v.editable?.status === 1).length ===
                    record.listRole.length
                  : record.editable?.status === 1
              }
              onChange={() => setData(getDataEdit(data, record, true))}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </>
        ),
      },
    ] as Column[];
  }, [data, getDataEdit]);
  const columns2 = React.useMemo(() => {
    return [
      {
        style: { width: 40 },
      },
      {
        dataIndex: 'name',
      },
      {
        style: { width: 120 },
        render: (record: PermissionItem, index: number) => (
          <>
            <Checkbox
              checked={
                record.listRole
                  ? record.listRole.filter(v => v.viewable?.status === 1).length ===
                    record.listRole.length
                  : record.viewable?.status === 1
              }
              onChange={() => setData(getDataEdit(data, record, false))}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </>
        ),
      },
      {
        style: { width: 120 },
        render: (record: PermissionItem, index: number) => (
          <>
            <Checkbox
              checked={
                record.listRole
                  ? record.listRole.filter(v => v.editable?.status === 1).length ===
                    record.listRole.length
                  : record.editable?.status === 1
              }
              onChange={() => setData(getDataEdit(data, record, true))}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </>
        ),
      },
    ] as Column[];
  }, [data, getDataEdit]);

  const extendColumn = React.useMemo(() => {
    return {
      render: (record: some) =>
        record.listRole ? (
          <TableCustom
            className={classes}
            id="extend"
            dataSource={record.listRole}
            columns={columns2}
            noColumnIndex
            noHeaderColumns
          />
        ) : null,
    } as ExtendColumn;
  }, [classes, columns2]);

  return (
    <div>
      <TableCustom dataSource={data} columns={columns} extendRow={extendColumn} noColumnIndex />
    </div>
  );
};
