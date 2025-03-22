import { request } from '@umijs/max';

export interface CurrentUser {
    name: string;
  }
  
  export async function getCurrentUser(): Promise<CurrentUser> {
    return request('api/user/currentUser', {
      method: 'GET',
    })
  }