import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDelete,onUpdate, products }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
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
  return <Table dataSource={products} columns={columns} />;
};

export default ProductList;
