import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Tabs } from 'antd';
import { history, useLocation, Outlet } from 'umi';

const { TabPane } = Tabs;

const ResourceApply: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // 根据当前路径确定激活的选项卡
  const getActiveKey = () => {
    if (currentPath.includes('/mysql')) return 'mysql';
    if (currentPath.includes('/redis')) return 'redis';
    if (currentPath.includes('/elasticsearch')) return 'elasticsearch';
    if (currentPath.includes('/other')) return 'other';
    return 'mysql'; // 默认选中MySQL
  };
  
  const activeKey = getActiveKey();
  
  // 处理选项卡切换
  const handleTabChange = (key: string) => {
    history.push(`/resource/apply/${key}`);
  };
  
  // 如果直接访问/resource/apply，重定向到默认选项卡
  useEffect(() => {
    if (currentPath === '/resource/apply') {
      history.push('/resource/apply/mysql');
    }
  }, [currentPath]);
  
  return (
    <PageContainer title={false}>
      <Card>
        <Tabs 
          activeKey={activeKey} 
          onChange={handleTabChange}
          tabBarGutter={30}
          style={{ marginBottom: 24 }}
        >
          <TabPane tab="MySQL资源" key="mysql">
            {/* MySQL资源内容将通过路由加载 */}
          </TabPane>
          <TabPane tab="Redis资源" key="redis">
            {/* Redis资源内容将通过路由加载 */}
          </TabPane>
          <TabPane tab="Elasticsearch资源" key="elasticsearch">
            {/* Elasticsearch资源内容将通过路由加载 */}
          </TabPane>
          <TabPane tab="其他资源" key="other">
            {/* 其他资源内容将通过路由加载 */}
          </TabPane>
        </Tabs>
        
        {/* 使用Outlet渲染子路由内容 */}
        <Outlet />
      </Card>
    </PageContainer>
  );
};

export default ResourceApply;