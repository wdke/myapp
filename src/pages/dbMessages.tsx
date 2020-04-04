import { connect } from 'umi';
import DbMessagesList from '@/components/DbMessagesList';

const DbMessages = ({ dispatch, dbMessages }) => {
  function handleDelete(id) {
    dispatch({
      type: 'dbMessages/del',
      payload: id,
    });
  }

  function handleUpdate(data) {
    dispatch({
      type: 'dbMessages/update',
      payload: data,
    });
  }

  return (
    <div>
      <h2>数据源信息管理</h2>
      <DbMessagesList onDelete={handleDelete} onUpdate={handleUpdate} dbMessages={dbMessages}/>
    </div>
  );
};

export default connect(({ dbMessages }) => ({
  dbMessages,
}))(DbMessages);
