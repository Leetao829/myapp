import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, Space, message, Alert } from 'antd';
import { request } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

// Mock数据 - 实例和数据库
const mockInstancesData = {
  code: 200,
  message: 'success',
  result: [
    {
      instanceId: 'mysql-prod-01',
      instanceName: 'MySQL生产实例01',
      isProduction: true,  // 标记为生产环境
      databases: [
        { id: 'db1', name: '用户数据库' },
        { id: 'db2', name: '订单数据库' },
        { id: 'db3', name: '商品数据库' },
      ]
    },
    {
      instanceId: 'mysql-prod-02',
      instanceName: 'MySQL生产实例02',
      isProduction: true,  // 标记为生产环境
      databases: [
        { id: 'db4', name: '支付数据库' },
        { id: 'db5', name: '日志数据库' },
      ]
    },
    {
      instanceId: 'srds-beta-test-001',
      instanceName: 'MySQL测试实例01',
      isProduction: false,  // 标记为测试环境
      databases: [
        { id: 'db6', name: '测试数据库1' },
        { id: 'db7', name: '测试数据库2' },
      ]
    },
    {
      instanceId: 'srds-beta-test-002',
      instanceName: 'MySQL测试实例02',
      isProduction: false,  // 标记为测试环境
      databases: [
        { id: 'db8', name: '测试数据库3' },
        { id: 'db9', name: '测试数据库4' },
      ]
    }
  ]
};

// Mock数据 - 应用列表
const mockApplicationsData = {
  code: 200,
  message: 'success',
  result: [
    { id: 'app-account', name: '账户服务(app-account)' },
    { id: 'app-order', name: '订单服务(app-order)' },
    { id: 'app-product', name: '商品服务(app-product)' },
    { id: 'app-payment', name: '支付服务(app-payment)' },
    { id: 'app-logistics', name: '物流服务(app-logistics)' },
    { id: 'app-notification', name: '通知服务(app-notification)' },
  ]
};

const MySQLProgramApply: React.FC = () => {
  const [form] = Form.useForm();
  const [applications, setApplications] = useState<any[]>([]);
  const [instances, setInstances] = useState<any[]>([]);
  const [databases, setDatabases] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取应用列表
  const fetchApplications = async () => {
    setLoading(true);
    try {
      // 使用Mock数据
      const response = mockApplicationsData;
      
      if (response.code === 200) {
        setApplications(response.result);
      } else {
        message.error(response.message || '获取应用列表失败');
      }
    } catch (error) {
      message.error('获取应用列表失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 获取实例和数据库列表
  const fetchInstancesAndDatabases = async () => {
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

  // 页面加载时获取数据
  useEffect(() => {
    fetchApplications();
    fetchInstancesAndDatabases();
  }, []);

  // 处理实例选择变化
  const handleInstanceChange = (value: string) => {
    form.setFieldsValue({ databases: [] });
    
    // 根据选择的实例，更新数据库列表
    const selectedInstance = instances.find(instance => instance.instanceId === value);
    if (selectedInstance) {
      setDatabases(selectedInstance.databases);
    } else {
      setDatabases([]);
    }
  };

  // 表单提交
  const handleSubmit = async (values: any) => {
    console.log('提交的表单数据:', values);
    message.success('申请提交成功！');
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
    setDatabases([]);
  };

  return (
    <div>
      {/* 提示信息 */}
      <Alert
        message={
          <div style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
            <p>1. 程序访问为申请应用程序使用的DBKEY，用于配置于数据库连接信息。</p>
            <p>2. 每个项目必须使用本项目申请的DBKEY, 禁止使用其他项目的DBKEY，一经发现按照故障处理。</p>
            <p>3. 各种编程语言的SDK接入指南：<a href="#">Java</a>、<a href="#">NodeJS</a>、<a href="#">Python</a>、<a href="#">GO</a>。</p>
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24, backgroundColor: '#f0f5ff', border: '1px solid #d6e4ff' }}
      />

      <h2 style={{ marginBottom: 24 }}>MySQL程序访问申请</h2>
      
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
          label="应用名称"
          name="applicationId"
          rules={[{ required: true, message: '请选择应用名称' }]}
        >
          <Select
            placeholder="请选择应用名称"
            loading={loading}
          >
            {applications.map(app => (
              <Option key={app.id} value={app.id}>
                {app.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="实例名"
          name="instanceId"
          rules={[{ required: true, message: '请选择实例' }]}
        >
          <Select
            placeholder="请选择实例"
            onChange={handleInstanceChange}
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
          label="数据库"
          name="databases"
          rules={[{ required: true, message: '请选择数据库' }]}
        >
          <Select
            mode="multiple"
            placeholder="请选择数据库"
            disabled={databases.length === 0}
          >
            {databases.map(db => (
              <Option key={db.id} value={db.id}>
                {db.name}
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
          <Select placeholder="请选择权限类型">
            <Option value="readonly">只读(SELECT)</Option>
            <Option value="readwrite">读写(SELECT,DELETE,UPDATE,INSERT)</Option>
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
            placeholder="为减少沟通成本，请详细填写申请程序访问的背景需求（不少于8个字，不多于200个字）"
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

export default MySQLProgramApply;