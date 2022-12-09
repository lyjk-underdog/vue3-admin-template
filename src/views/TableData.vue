<template>
    <div>
        <DataTable :apis="apis" :columns="columns" :edit-fileds="editFileds"></DataTable>
    </div>
</template>

<script setup lang="tsx">
import type { Apis, Column, EditFiled } from '@/components/DataTable/index.vue';
import * as tableApi from '@/apis/table';


const apis: Apis = {
    list: (async (params) => (await tableApi.list(params)).data) as Apis['list'],
    create: tableApi.create as Apis['create'],
    read: (async (id) => (await tableApi.info(id)).data) as Apis['read'],
    update: tableApi.update as Apis['update'],
    remove: tableApi.remove
}

const columns: Column[] = [
    {
        label: '姓名',
        prop: 'name',
        search: {
            type: 'input'
        }
    },
    {
        label: '年龄',
        prop: 'age',
    },
    {
        label: '地址',
        prop: 'address'
    }
]

const editFileds: EditFiled[] = [
    {
        type: 'input',
        label: '姓名',
        prop: 'name',
        rules: {
            required: true
        }
    },
    {
        type: markRaw(ElInputNumber),
        label: '年龄',
        prop: 'age',
        rules: {
            required: true
        }
    },
    {
        type: 'input',
        label: '地址',
        prop: 'address',
        attrs: {
            type: 'textarea'
        }
    }
]

</script>

<style scoped>

</style>