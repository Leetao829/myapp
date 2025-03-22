import { login, type LoginParams, type LoginResult, getCurrentUser} from '@/services/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const LoginPage: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  // const fetchUserInfo = async () => {
  //   try {
  //     const userInfo = await getCurrentUser();
  //     if (userInfo) {
  //       await setInitialState((s) => ({
  //         ...s,
  //         currentUser: userInfo,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error('获取用户信息失败:', error);
  //   }
  // };

  const handleSubmit = async (values: LoginParams) => {
    try {
      const msg = await login(values);
      if (msg.status === 'ok' && msg.token) {
        // 保存token
        localStorage.setItem('token', msg.token);
        
        // 先获取用户信息
        const userInfo = await getCurrentUser();
        if (userInfo) {
          // 更新全局状态
          await setInitialState((s) => ({
            ...s,
            currentUser: userInfo,
          }));
          
          // 最后再跳转
          message.success('登录成功！');
          history.replace('/workbench');
        }
        return;
      }
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>登录 - {Settings.title}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle="全球最大的设计系统"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as LoginParams);
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="用户名: admin"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="密码: 123456"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          />
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;