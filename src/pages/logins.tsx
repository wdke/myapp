import { Card, Form, Input, Button, message } from 'antd';
import { connect } from 'umi';
import styles from './logins.less';
import Drag from '../components/Ui/Drag/index';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
let done = false;


const Logins = ({ dispatch, logins }) => {


  const [form] = Form.useForm();

  const onFinish = values => {

    if (!done) {
      message.error('请拖动验证！');
      return;
    }
    console.log('Success:', values);
    handleLogin(values);
  };


  function handleLogin(values) {
    console.log("handleLogin:",values);
    dispatch({
      type: 'logins/login',
      payload: values,
    });
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  done = false;

  return (


    <div className={styles.normal}>
      <div className={styles.bg}/>
      <Card
        className={styles.box}
        // title="欢迎登录-华人地产管理后台"
        bordered={false}
        style={{ maxWidth: 450 }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            {/*<Checkbox>Remember me</Checkbox>*/}

            <Drag success={() => {
              done = true;
            }}/>
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

      </Card>
    </div>

  );
};


export default connect(({ logins }) => ({
  logins,
}))(Logins);
