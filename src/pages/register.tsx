import React, { useState } from 'react';
import styles from './register.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { residences } from '@/const/residences';
import { formItemLayout, tailFormItemLayout } from '@/const/formLayout';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


const RegistrationForm = ({ dispatch, users }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);

    handleLogin(values);
  };

  function handleLogin(values) {
    console.log("handleLogin:",values);
    dispatch({
      type: 'index/register',
      payload: values,
    });
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  function handleChange(value) {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  }


  return (
    <div className={styles.content}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label={
            <span>
            用户名&nbsp;
              <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined/>
            </Tooltip>
          </span>
          }
          rules={[{ required: true, message: '请输入用户名!', whitespace: true }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
          hasFeedback
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('您输入的两个密码不匹配!');
              },
            }),
          ]}
        >
          <Input.Password/>
        </Form.Item>

        {/*<Form.Item*/}
        {/*  name="address"*/}
        {/*  label="联系地址"*/}
        {/*  rules={[*/}
        {/*    { type: 'array', required: true, message: '联系地址!' },*/}
        {/*  ]}*/}
        {/*>*/}
        {/*  <Cascader  options={residences}/>*/}
        {/*</Form.Item>*/}

        <Form.Item
          name="phone"
          label="电话号码"
          rules={[{ required: true, message: '请输入电话号码!' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }}/>
        </Form.Item>

        <Form.Item
          name="email"
          label="邮件"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: '请输入邮件地址!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        {/*<Form.Item*/}
        {/*  name="website"*/}
        {/*  label="网站地址"*/}
        {/*  rules={[{ required: true, message: '请输入网址!' }]}*/}
        {/*>*/}
        {/*  <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">*/}
        {/*    <Input/>*/}
        {/*  </AutoComplete>*/}
        {/*</Form.Item>*/}

        <Form.Item

          name="sex"
          label="性别"
          rules={[{ required: true, message: '请选择性别!' }]}
        >
          <Select>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Form.Item>

        {/*<Form.Item label="验证码" extra="我们必须确保你是人类.">*/}
        {/*  <Row gutter={8}>*/}
        {/*    <Col span={12}>*/}
        {/*      <Form.Item*/}
        {/*        name="captcha"*/}
        {/*        noStyle*/}
        {/*        rules={[{ required: true, message: '请输入你的验证码!' }]}*/}
        {/*      >*/}
        {/*        <Input/>*/}
        {/*      </Form.Item>*/}
        {/*    </Col>*/}
        {/*    <Col span={12}>*/}
        {/*      <Button>获取验证码</Button>*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*</Form.Item>*/}

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            { validator: (_, value) => value ? Promise.resolve() : Promise.reject('已经阅读协议') },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default connect(({ users }) => ({
  users,
}))(RegistrationForm);
