import { request, type ReqPage, type ResPage } from '@/utils/request';

export interface Item {
    id: string;
    name: string;
    age: number;
    address: string;
}


// 获取列表
export function list(params: ReqPage & Partial<Item>) {
    return request<ResPage<ResPage<Item>>>({
        url: '/mock/table/data/list',
        method: 'get',
        params
    })
}

// 删除
export function remove(idOrIds: string | string[]) {
    return request<never>({
        url: `/mock/table/data/${idOrIds}`,
        method: 'delete'
    })
}

// 详情
export function info(id: string) {
    return request<Item>({
        url: `/mock/table/data/${id}`,
        method: 'get'
    })
}

// 新增
export function create(form: Pick<Item, Exclude<keyof Item, 'id'>>) {
    return request<never>({
        url: `/mock/table/data`,
        method: 'post',
        data: form
    })
}

// 更新
export function update(form: Item) {
    return request<never>({
        url: `/mock/table/data`,
        method: 'put',
        data: form
    })
}

