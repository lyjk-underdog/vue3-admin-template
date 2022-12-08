import { request } from '@/utils/request';


export interface LoginForm {
    username: string;
    password: string;
}

export interface UserInfo {
    name: string;
    avatar: string;
}

// 用户登录
export function login(form: LoginForm) {
    return request<string>({
        url: '/mock/user/login',
        method: 'POST',
        data: form
    })
}

// 用户信息
export function info() {
    return request<UserInfo>({
        url: '/mock/user/info',
        method: 'GET'
    })
}