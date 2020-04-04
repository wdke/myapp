import { Card, Form, Input, Button, message } from 'antd';
import { connect } from 'umi';
import styles from './dbMessagesAdd.less';
import React from 'react';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const DbMessagesAdd = ({ dispatch, dbMessages }) => {


  console.log('dbMessages::' + JSON.stringify(dbMessages));

  // console.log(this.props.location);
  const [form] = Form.useForm();

  const onFinish = values => {

    console.log('Success:', values);
    handleLogin(values);
  };


  function handleLogin(values) {
    console.log('handleLogin:', values);
    dispatch({
      type: 'dbMessages/add',
      payload: values,
    });
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  const initFormValue = () => {
    form.setFieldsValue({
      host: '127.0.0.1',
      dbName: 'test',
      dbUsername: 'root',
      dbPassword: 'root',
      dbPort: '3306',
    });
  };
  const onReset = () => {
    form.resetFields();
  };


  return (


    <div className={styles.content}>

      <Form
        {...layout}
        name="basic"
        initialValues={{

          host: dbMessages.host,
          dbName: dbMessages.dbName,
          dbUsername: dbMessages.dbUsername,
          dbPassword: dbMessages.dbPassword,
          dbPort: dbMessages.dbPort,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >

        <Form.Item
          label="数据库地址"
          name="host"
          rules={[{ required: true, message: '请输入数据库地址!' }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="数据库名称"
          name="dbName"
          rules={[{ required: true, message: '请输入数据库名称!' }]}
        >
          <Input/>
        </Form.Item>


        <Form.Item
          label="数据库用户名"
          name="dbUsername"
          rules={[{ required: true, message: '请输入数据库用户名!' }]}
        >
          <Input/>
        </Form.Item>


        <Form.Item
          label="数据库密码"
          name="dbPassword"
          rules={[{ required: true, message: '请输入数据库密码!' }]}
        >
          <Input.Password/>
        </Form.Item>


        <Form.Item
          label="数据库端口号"
          name="dbPort"
          rules={[{ required: true, message: '请输入数据库端口号!' }]}
        >
          <Input/>
        </Form.Item>


        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>

          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
};


export default connect(({ dbMessages }) => ({
  dbMessages,
}))(DbMessagesAdd);
