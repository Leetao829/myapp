import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Space, message, Alert } from 'antd';
import { request } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

// Mock数据 - Redis实例
const mockInstancesData = {
  code: 200,
  message: 'success',
  result: [
    {
      instanceId: 'redis-prod-01',
      instanceName: 'Redis生产实例01',
      isProduction: true,
    },
    {
      instanceId: 'redis-prod-02',
      instanceName: 'Redis生产实例02',
      isProduction: true,
    },
    {
      instanceId: 'redis-test-001',
      instanceName: 'Redis测试实例01',
      isProduction: false,
    },
    {
      instanceId: 'redis-test-002',
      instanceName: 'Redis测试实例02',
      isProduction: false,
    }
  ]
};

const RedisUserApply: React.FC = () => {
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

  return (
    <div>
      {/* 提示信息 */}
      <Alert
        message={
          <div style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
            <p>Redis用户访问权限为申请通过Middleware Manager的【数据查询-Redis】, 和可以提交变更语句到【普通变更-Redis】的权限。</p>
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24, backgroundColor: '#f0f5ff', border: '1px solid #d6e4ff' }}
      />

      <h2 style={{ marginBottom: 24 }}>Redis用户访问申请</h2>
      
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
          label="权限类型"
          name="permissionType"
          initialValue="readonly"
          rules={[{ required: true, message: '请选择权限类型' }]}
        >
          <Select placeholder="请选择权限类型" disabled>
            <Option value="readonly">只读权限</Option>
          </Select>
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
            placeholder="为减少沟通成本，请详细填写申请用户访问的背景需求（不少于8个字，不多于200个字）"
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

export default RedisUserApply;