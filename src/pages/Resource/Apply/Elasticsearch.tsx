import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';

const ElasticsearchApply: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Card>
        <h2>Elasticsearch资源申请</h2>
        <p>这里将显示Elasticsearch资源申请表单</p>
      </Card>
    </PageContainer>
  );
};

export default ElasticsearchApply;