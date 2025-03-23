import React from 'react';
import { Alert } from 'antd';

const RedisProgram: React.FC = () => {
  return (
    <div>
      <Alert
        message="功能开发中"
        description="Redis程序访问功能正在开发中，敬请期待..."
        type="info"
        showIcon
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default RedisProgram;