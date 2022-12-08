import type { MockMethod, Recordable } from 'vite-plugin-mock';
import type { LoginForm, UserInfo } from '../src/apis/user';
import type { ResultData } from '../src/utils/request';

type Opt = {
  url: string;
  body: Recordable;
  query: Recordable;
  headers: Recordable;
}

const mocks: MockMethod[] = [

  // 登录
  {
    url: '/mock/user/login',
    method: 'post',
    response(opt: Opt): ResultData<string> {
      const { username, password } = opt.body as LoginForm;

      if (username === 'user' && password === '123') {
        return {
          code: '200',
          message: 'ok',
          data: 'user token'
        }
      }

      return {
        code: '500',
        message: '密码错误'
      }

    }
  },

  // 用户信息
  {
    url: '/mock/user/info',
    method: 'get',
    response(opt: Opt): ResultData<UserInfo> {
      const token = opt.headers.token as string;

      if (token === 'user token') {
        return {
          code: '200',
          message: 'ok',
          data: {
            name: 'lyjk',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
          }
        }
      }

      return {
        code: '402',
        message: '登录已过期，请重新登录!'
      }
    }
  }

]

export default mocks;
