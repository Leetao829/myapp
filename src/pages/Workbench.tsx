import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography, Space, Statistic, Row, Col, message } from 'antd';
import { ClockCircleOutlined, UserOutlined, CoffeeOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '@/services/user';

const { Title, Text } = Typography;

const Workbench: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username, setUsername] = useState('加载中...');

  // 获取用户信息
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getCurrentUser();
        setUsername(userInfo?.name || '访客');
      } catch (error) {
        message.error('获取用户信息失败');
        setUsername('访客');
      }
    };

    fetchUserInfo();
  }, []);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 格式化时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Space align="center" size="middle">
                  <CoffeeOutlined style={{ fontSize: '24px', color: '#8B4513' }} />
                  <Title level={2} style={{ margin: 0 }}>
                    <UserOutlined style={{ marginRight: 12, color: '#1890ff' }} />
                    {username} 辛苦了！
                  </Title>
                </Space>
                <Text type="secondary" style={{ fontSize: 16, display: 'block', marginTop: 8 }}>
                  欢迎来到您的工作台
                </Text>
              </div>
              
              <Row justify="center" gutter={48}>
                <Col>
                  <Statistic 
                    title={<span style={{ fontSize: '16px' }}>当前时间</span>}
                    value={formatTime(currentTime)}
                    prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
                    valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                  />
                </Col>
                <Col>
                  <Statistic 
                    title={<span style={{ fontSize: '16px' }}>今天是</span>}
                    value={formatDate(currentTime)}
                    valueStyle={{ fontSize: '24px' }}
                  />
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Workbench;