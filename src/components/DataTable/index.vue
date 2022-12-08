<template>
    <div>

        <!-- search -->
        <FormRendererVue ref="searchFormRef" :fileds="[]" inline>
            <template #footer>
                <ElButton type="primary" :icon="Search" @click="">搜索</ElButton>
                <ElButton :icon="Refresh" @click="">重置</ElButton>
            </template>
        </FormRendererVue>

        <ElTable w:m="b-10px" v-loading="table.loading" :data="table.list" @selection-change="">
            <ElTableColumn type="selection" width="55" align="center" />
            <ElTableColumn type="index" label="序号" align="center" :width="80" />
            <ElTableColumn v-for="(column, index) of props.columns" :key="index" min-width="100" align="center"
                :label="column.label" :prop="column.prop" :formatter="column.formatter" />
            <ElTableColumn label="操作" align="center">
                <template #default="{ row }">
                    <slot name="operate" :row="row"></slot>

                    <ElButton type="primary" text :icon="Document" @click="">详情
                    </ElButton>
                    <ElButton type="primary" text :icon="Edit" @click="">修改
                    </ElButton>
                    <ElButton type="primary" text :icon="Delete" @click="">删除
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>

        <ElPagination w:p="t-10px" background :page-sizes="[10, 20, 30]"
            layout="total , sizes , prev, pager, next , jumper " :total="table.total"
            v-model:page-size="pagination.pageSize" v-model:current-page="pagination.pageNum"
            @current-change="table.getList" @size-change="table.getList" />
    </div>
</template>

<script setup lang="ts">
import type { Field } from './FormRenderer.vue';
import type { ResPage, ResultData } from '@/utils/request';
import { Document, Edit, Delete, Search, Refresh } from '@element-plus/icons-vue';
import useTable from './useTable';
import FormRendererVue from './FormRenderer.vue';
import useSearch from "./useSearch"

export interface Column {
    label: string;
    prop: string;
    formatter?: (row: any) => JSX.Element;
    search?: Pick<Field, 'type' | 'options' | 'attrs' | 'default' | 'rules'>
}

export interface Apis {
    list: (params: any) => Promise<ResultData<ResPage<any>>>;
}

interface Props {
    apis: Apis,
    columns: Column[],
    pageSize?: number
}
const props = withDefaults(defineProps<Props>(), {
    pageSize: 10
})

const { searchFormRef } = useSearch()


// function useSearch() {

//     const searchFormRef = ref<InstanceType<typeof FormRendererVue>>();
//     const fields: Field[] = [];

//     onBeforeMount(() => {

//     })

// }

// pagination
const pagination = reactive({
    pageNum: 1,
    pageSize: props.pageSize
})

// table
const params = computed(() => {
    return {
        ...pagination
    }
})
const table = useTable(props.apis, params);


</script>

<style scoped>

</style>