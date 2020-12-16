import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import TableCustom, { Column, ExtendColumn } from './modules/common/components/TableCustom';
import { some } from './constants';

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

interface Props {}

const data = [
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
    extendData: [
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
      {
        employeeCode: 1,
        name: 'hoang',
        birthday: '212112',
        email: 'email@gmail.com',
        phone: '12345645645',
      },
    ],
  },
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
  },
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
  },
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
  },
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
  },
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
  },
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
  },
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
  },
  {
    employeeCode: 1,
    name: 'hoang',
    birthday: '212112',
    email: 'email@gmail.com',
    phone: '12345645645',
  },
];
export const HelloWorld = (props: Props) => {
  const classes = useStyles();

  const columns = React.useMemo(() => {
    return [
      {
        title: 'employeeCode',
        dataIndex: 'employeeCode',
        width: 120,
      },
      {
        title: 'fullName',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: 'birthday',
        dataIndex: 'birthday',
        width: 120,
      },

      {
        title: 'email',
        dataIndex: 'email',
        width: 120,
      },

      {
        title: 'phoneNumber',
        dataIndex: 'phone',
      },
    ] as Column[];
  }, []);
  const columns2 = React.useMemo(() => {
    return [
      {
        dataIndex: 'employeeCode',
        width: 40,
        render: () => null,
      },
      {
        dataIndex: 'employeeCode',
        width: 120,
      },
      {
        dataIndex: 'name',
        width: 120,
      },
      {
        dataIndex: 'birthday',
        width: 120,
      },

      {
        dataIndex: 'email',
        width: 120,
      },

      {
        dataIndex: 'phone',
      },
    ] as Column[];
  }, []);

  const extendColumn = React.useMemo(() => {
    return {
      render: (record: some) =>
        record.extendData ? (
          <TableCustom
            className={classes}
            id="extend"
            dataSource={record.extendData}
            columns={columns2}
            noColumnIndex
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
