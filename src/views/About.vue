<template>
    <div>
        <DataTable :apis="apis" :columns="columns"></DataTable>
    </div>
</template>

<script setup lang="tsx">
import type { Apis, Column } from '@/components/DataTable/index.vue';
import * as tableApi from '@/apis/table';

const apis: Apis = {
    list: tableApi.list
}

const columns: Column[] = [
    {
        label: '姓名',
        prop: 'name',
        formatter: (row) => <span style="color:red">{row.name}</span>,
    },
    {
        label: '年龄',
        prop: 'age',
    }
]

</script>

<style scoped>

</style>