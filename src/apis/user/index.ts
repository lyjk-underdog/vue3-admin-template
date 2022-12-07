import { request } from '@/utils/request';

// 用户登录
export namespace Login {
    type Token = string;

    export type Req = {
        username: string;
        password: string;
    }
    export type Res = Token;
}

export function login(data: Login.Req) {
    return request<Login.Res>({
        url: '/user/login',
        method: 'POST',
        data
    })
}

// 用户信息
export namespace Info {
    export type Res = {
        name: string;
        avatar: string;
    }
}
export function info() {
    return request<Info.Res>({
        url: '/user/info',
        method: 'GET'
    })
}