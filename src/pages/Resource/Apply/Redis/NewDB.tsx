import React from 'react';
import { Alert } from 'antd';

const RedisNewDB: React.FC = () => {
  return (
    <div>
      <Alert
        message="功能开发中"
        description="Redis新建数据库功能正在开发中，敬请期待..."
        type="info"
        showIcon
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default RedisNewDB;