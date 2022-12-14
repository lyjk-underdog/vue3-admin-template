import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import useUserStore from '@/store/modules/user';

// 后端返回格式接口
export interface ResultData<T = any> {
    code: '200' | '402' | '500';
    message: string;
    data?: T;
}

// 分页请求
export interface ReqPage {
    pageNum: number;
    pageSize: number;
}

// 分页响应 
export interface ResPage<T> {
    rows: T[];
    total: number;
}


const service = axios.create({
    url: import.meta.env.VITE_BASE_URL,
    timeout: 15000,
})

service.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers = {
                token: userStore.token
            }
        }

        return config;
    }
)

export async function request<T>(config: AxiosRequestConfig): Promise<ResultData<T>> {
    try {
        const response = await service.request(config);
        const data = response.data as ResultData;
        const userStore = useUserStore();

        if (data.code !== '200') {
            if (data.code === '402') {
                userStore.resetToken();
                location.reload();
            }

            throw new AxiosError(data.message, undefined, config, undefined, response)
        }

        return data;
    } catch (err) {
        ElMessage({
            type: 'error',
            message: (err as Error).message
        })

        throw err;
    }
}
