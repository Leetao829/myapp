import React, { useEffect } from 'react';
import { Menu, Row, Col } from 'antd';
import { history, useLocation, Outlet } from 'umi';

const MySQLApply: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // 根据当前路径确定激活的菜单项
  const getSelectedKey = () => {
    if (currentPath.includes('/user')) return 'user';
    if (currentPath.includes('/program')) return 'program';
    // 删除特殊访问判断
    if (currentPath.includes('/newdb')) return 'newdb';
    return 'user'; // 默认选中用户访问
  };
  
  const selectedKey = getSelectedKey();
  
  // 处理菜单点击
  const handleMenuClick = (e: { key: React.Key }) => {
    history.push(`/resource/apply/mysql/${e.key}`);
  };
  
  // 如果当前路径是/resource/apply/mysql，重定向到/resource/apply/mysql/user
  useEffect(() => {
    if (currentPath === '/resource/apply/mysql') {
      history.push('/resource/apply/mysql/user');
    }
  }, [currentPath]);
  
  return (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            style={{ height: '100%' }}
          >
            <Menu.Item key="user">用户访问</Menu.Item>
            <Menu.Item key="program">程序访问</Menu.Item>
            {/* 删除特殊访问菜单项 */}
            <Menu.Item key="newdb">新建数据库</Menu.Item>
          </Menu>
        </Col>
        <Col span={18}>
          <div style={{ padding: '0 24px' }}>
            {/* 使用Outlet渲染子路由内容 */}
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MySQLApply;