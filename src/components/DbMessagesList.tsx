import { Table, Popconfirm, Button } from 'antd';

const DbMessagesList = ({ onDelete,onUpdate, dbMessages }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'userId',
      dataIndex: 'userId',
    },
    {
      title: '数据库类型',
      dataIndex: 'dbType',
    },
    {
      title: '数据库地址',
      dataIndex: 'host',
    },
    {
      title: '数据库名称',
      dataIndex: 'dbName',
    },
    {
      title: '用户名',
      dataIndex: 'dbUsername',
    },
    {
      title: '端口号',
      dataIndex: 'dbPort',
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <div>

            <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
              <Button>Delete</Button>
            </Popconfirm>

            <Popconfirm title="update?" onConfirm={() => onUpdate(record.id)}>
              <Button>update</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return <Table dataSource={dbMessages.list} columns={columns} />;
};

export default DbMessagesList;
