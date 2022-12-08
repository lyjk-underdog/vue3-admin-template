<template>
    <div>
        <DataTable :apis="apis" :columns="columns" :edit-fileds="editFileds"></DataTable>
    </div>
</template>

<script setup lang="tsx">
import type { Apis, Column, EditFiled } from '@/components/DataTable/index.vue';
import * as tableApi from '@/apis/table';

const apis: Apis = {
    list: tableApi.list,
    create: tableApi.create,
    read: tableApi.info,
    update: tableApi.update,
    remove: tableApi.remove
}

const columns: Column[] = [
    {
        label: '姓名',
        prop: 'name',
        formatter: (row) => <span style="color:red">{row.name}</span>,
        search: {
            type: 'input'
        }
    },
    {
        label: '年龄',
        prop: 'age',
    }
]

const editFileds: EditFiled[] = [
    {
        type: 'input',
        label: '姓名',
        prop: 'name'
    }
]

</script>

<style scoped>

</style>