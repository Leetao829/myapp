import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Space, message, Alert } from 'antd';
import { request } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

// Mock数据 - 实例
const mockInstancesData = {
  code: 200,
  message: 'success',
  result: [
    {
      instanceId: 'mysql-prod-01',
      instanceName: 'MySQL生产实例01',
      isProduction: true,
    },
    {
      instanceId: 'mysql-prod-02',
      instanceName: 'MySQL生产实例02',
      isProduction: true,
    },
    {
      instanceId: 'srds-beta-test-001',
      instanceName: 'MySQL测试实例01',
      isProduction: false,
    },
    {
      instanceId: 'srds-beta-test-002',
      instanceName: 'MySQL测试实例02',
      isProduction: false,
    }
  ]
};

const MySQLNewDBApply: React.FC = () => {
  const [form] = Form.useForm();
  const [instances, setInstances] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取实例列表
  const fetchInstances = async () => {
    setLoading(true);
    try {
      // 使用Mock数据
      const response = mockInstancesData;
      
      if (response.code === 200) {
        setInstances(response.result);
      } else {
        message.error(response.message || '获取实例列表失败');
      }
    } catch (error) {
      message.error('获取实例列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 页面加载时获取实例列表
  useEffect(() => {
    fetchInstances();
  }, []);

  // 表单提交
  const handleSubmit = async (values: any) => {
    console.log('提交的表单数据:', values);
    message.success('申请提交成功！');
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
  };

  // 验证数据库名称
  const validateDatabaseName = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('请输入数据库名称'));
    }
    
    // 数据库名称仅支持小写英文字符、数字、下划线（禁止中划线）
    const regex = /^[a-z0-9_]+$/;
    if (!regex.test(value)) {
      return Promise.reject(new Error('数据库名称仅支持小写英文字符、数字、下划线'));
    }
    
    return Promise.resolve();
  };

  return (
    <div>
      {/* 提示信息 */}
      <Alert
        message={
          <div style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
            <p>1. 本功能为逻辑数据库(schema)的创建,非RDS实例的创建。</p>
            <p>2. 默认数据库采用utf8mb4字符集,数据库名称仅支持小写英文字符、数字、下划线（禁止中划线）,数据库名请尽量采用和项目名称类似,见名识意的名称,避免单独使用一个英文词语。</p>
            <p>3. 数据库创建后,默认自动开通用户访问权限（包含查询和监控等权限）,不再需要单独申请。</p>
            <p>4. 数据库具体创建在哪个实例上,请遵循如下基本规则：</p>
            <ul style={{ marginLeft: 20, marginTop: 5 }}>
              <li>相同业务线的数据库放在本项目组同一实例上。</li>
              <li>请项目负责人评估数据库未来的数据量,和对应业务的TPS、QPS。</li>
              <li>结合性能需求,评估当前实例的性能配置。</li>
              <li>如果对上述评估过程不确定,可以联系DBA协同处理。</li>
            </ul>
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24, backgroundColor: '#f0f5ff', border: '1px solid #d6e4ff' }}
      />

      <h2 style={{ marginBottom: 24 }}>MySQL新建数据库申请</h2>
      
      {/* 表单 */}
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleSubmit}
        requiredMark={true}
        style={{ maxWidth: '600px' }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="实例名"
          name="instanceId"
          rules={[{ required: true, message: '请选择实例' }]}
        >
          <Select
            placeholder="请选择实例"
            loading={loading}
          >
            {instances.map(instance => (
              <Option key={instance.instanceId} value={instance.instanceId}>
                {instance.instanceName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="数据库名称"
          name="databaseName"
          rules={[
            { validator: validateDatabaseName }  // 只保留自定义验证器，移除required规则
          ]}
          extra="数据库名称仅支持小写英文字符、数字、下划线"
        >
          <Input placeholder="请输入数据库名称" />
        </Form.Item>

        <Form.Item
          label="申请原因"
          name="reason"
          rules={[
            { required: true, message: '请填写申请原因' },
            { min: 8, message: '申请原因不少于8个字' },
            { max: 200, message: '申请原因不多于200个字' }
          ]}
        >
          <TextArea
            placeholder="为减少沟通成本，请详细填写新建数据库的背景需求（不少于8个字，不多于200个字）"
            rows={4}
            showCount
            maxLength={200}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交申请
            </Button>
            <Button onClick={handleReset}>一键清除</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MySQLNewDBApply;