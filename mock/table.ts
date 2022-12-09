import type { MockMethod, Recordable } from 'vite-plugin-mock';
import type { ResultData, ResPage } from '../src/utils/request';
import type { Item } from '../src/apis/table';

type Opt = {
    url: string;
    body: Recordable;
    query: Recordable;
    headers: Recordable;
}

let uid = 1;
const getUid = () => String(uid++);

let data: Item[] = [
    {
        id: getUid(),
        name: "石强",
        age: 29,
        address: '地址1'
    },
    {
        id: getUid(),
        name: "易勇",
        age: 21,
        address: '地址2'
    }
]


const mocks: MockMethod[] = [
    // 获取列表
    {
        url: '/mock/table/data/list',
        method: 'get',
        response(opt: Opt): ResultData<ResPage<Item>> {

            const { name } = opt.query;

            const filterData = name == null ? data : data.filter(item => item.name.includes(name));

            return {
                code: '200',
                message: 'ok',
                data: {
                    rows: filterData,
                    total: filterData.length
                }
            }
        }
    },

    // 详情
    {
        url: '/mock/table/data/:id',
        method: 'get',
        response(opt: Opt): ResultData<Item> {
            const targetId = opt.query.id as string;
            let target = data.find(item => item.id === targetId)!;

            return {
                code: '200',
                message: 'ok',
                data: target
            }
        }
    },

    // 新增
    {
        url: '/mock/table/data',
        method: 'post',
        response(opt: Opt): ResultData<never> {
            const form = opt.body as Pick<Item, Exclude<keyof Item, 'id'>>;

            data.push({ id: getUid(), ...form });

            return {
                code: '200',
                message: 'ok',
            }
        }
    },

    // 删除
    {
        url: '/mock/table/data/:ids',
        method: 'delete',
        response(opt: Opt): ResultData<never> {
            const idsStr = opt.query.ids as string;
            const idsArr = idsStr.split(',');

            data = data.filter(item => !idsArr.includes(item.id));

            return {
                code: '200',
                message: 'ok'
            }
        }
    },

    //更新
    {
        url: '/mock/table/data',
        method: 'put',
        response(opt: Opt): ResultData<never> {

            const form = opt.body as Item;

            let target = data.find(item => item.id === form.id)!;

            Object.assign(target, { ...form })

            return {
                code: '200',
                message: 'ok'
            }
        }
    }
]

mocks.forEach(mock => mock.timeout = 800)

export default mocks;
