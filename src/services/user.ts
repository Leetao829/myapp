import { request } from '@umijs/max';

// 登录接口相关类型
export interface LoginResult {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'admin';
  token?: string;
}

export interface LoginParams {
  username: string;
  password: string;
  autoLogin?: boolean;
}

// 登录接口
export async function login(params: LoginParams): Promise<LoginResult> {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

// 自定义用户信息类型
export interface CurrentUser {
  name: string;
  avatar?: string;
  userid?: string;
  email?: string;
  phone?: string;
  address?: string;
  access?: 'user' | 'admin';
}

// 接口响应类型
export interface UserResponse {
  success: boolean;
  data?: CurrentUser;
  errorCode?: string;
  errorMessage?: string;
}

// 获取当前用户信息接口
export async function getCurrentUser(): Promise<CurrentUser | undefined> {
  try {
    const token = localStorage.getItem('token');
    if (!token) return undefined;

    const response = await request<UserResponse>('/api/user/currentUser', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success && response.data) {
      return response.data;
    }
    return undefined;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return undefined;
  }
}