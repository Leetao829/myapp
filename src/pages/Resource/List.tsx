import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';

const ResourceList: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Card>
        <h1>资源列表页面</h1>
        <p>这里将显示资源列表内容</p>
      </Card>
    </PageContainer>
  );
};

export default ResourceList;