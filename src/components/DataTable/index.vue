<template>
    <div w:p="t-10px b-10px l-10px r-10px">

        <EditFormVue v-model:visible="editor.visible" :loading="editor.loading" :model="editor.model"
            :fields="editor.fields" :mode="editor.mode" @submit="handleEdit" />

        <SearchFormVue w:p="t-30px r-24px l-24px b-12px" w:m="b-16px" w:bg="white" :model="search.model"
            :fields="search.fields" @search="table.getList" @reset="table.getList" />

        <div w:bg="white" w:p="t-24px b-24px r-24px l-24px">
            <ElRow w:m="b-10px" :gutter="10">
                <ElCol :span="1.5">
                    <ElButton v-if="props.hasNew" type="primary" plain :icon="Plus"
                        @click="() => editor.open(Mode.Create)">新增
                    </ElButton>
                </ElCol>
                <ElCol :span="1.5">
                    <el-button v-if="props.hasDelete" type="danger" :disabled="!selection.isSelected" plain
                        :icon="Delete" @click="() => handleDelete(selection.ids)">删除
                    </el-button>
                </ElCol>
                <slot name="header" :selectedIds="selection.ids" :selection="selection.list"></slot>
            </ElRow>

            <ElTable w:m="b-10px" v-loading="table.loading" :data="table.list"
                @selection-change="selection.selectionChange">
                <ElTableColumn type="selection" width="55" align="center" />
                <ElTableColumn type="index" label="序号" align="center" :width="80" />
                <ElTableColumn v-for="(column, index) of props.columns" :key="index" min-width="100" align="center"
                    :label="column.label" :prop="column.prop" :formatter="column.formatter">
                    <template #default="{ row }">
                        {{ row[column.prop] == null ? '-' : row[column.prop] }}
                    </template>
                </ElTableColumn>
                <ElTableColumn v-if="props.hasOperation" label="操作" align="center">
                    <template #default="{ row }">
                        <slot name="operate" :row="row"></slot>

                        <ElButton v-if="props.hasView" type="primary" text :icon="Document"
                            @click="() => editor.open(Mode.View, row)">详情
                        </ElButton>
                        <ElButton v-if="props.hasEdit" type="primary" text :icon="Edit"
                            @click="() => editor.open(Mode.Update, row)">修改
                        </ElButton>
                        <ElButton v-if="props.hasDelete" type="primary" text :icon="Delete"
                            @click="() => handleDelete(row)">删除
                        </ElButton>
                    </template>
                </ElTableColumn>
            </ElTable>

            <ElPagination v-if="hasPagination" w:p="t-10px" background :page-sizes="[10, 20, 30]"
                layout="total , sizes , prev, pager, next , jumper " :total="table.total"
                v-model:page-size="pagination.pageSize" v-model:current-page="pagination.pageNum"
                @current-change="table.getList" @size-change="table.getList" />
        </div>
    </div>
</template>

<script lang="ts">
interface ReqPage {
    pageNum: number;
    pageSize: number;
}

interface ResPage<T> {
    rows: T[];
    total: number;
}

export interface Column {
    label: string;
    prop: string;
    formatter?: (row: any) => JSX.Element;
    search?: Pick<Field, Exclude<keyof Field, 'label' | 'prop'>> & { default?: any }
}

export interface Apis {
    list: (params: ReqPage & Record<string, any>) => Promise<ResPage<any>>;
    create?: (form: Record<string, any>) => Promise<any>;
    read?: (id: string) => Promise<Record<string, any>>;
    update?: (form: Record<string, any>) => Promise<any>;
    remove?: (idOrIds: string | string[]) => Promise<any>;
}

export type EditFiled = Field & { default?: any };
</script>

<script setup lang="ts">
import type { Field } from './FormRenderer.vue';
import { Document, Edit, Delete, Plus } from '@element-plus/icons-vue';
import SearchFormVue from './SearchForm.vue';
import EditFormVue, { Mode } from './EditForm.vue';
import useTable from './useTable';
import useSearch from "./useSearch";
import useEditor from './useEditor';
import useSelection from './useSelection';

interface Props {
    apis: Apis;
    columns?: Column[];
    pageSize?: number;
    id?: string;
    editFileds?: EditFiled[],
    hasDelete?: boolean,
    hasEdit?: boolean,
    hasNew?: boolean,
    hasView?: boolean,
    hasOperation?: boolean,
    hasPagination?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    columns: () => [],
    pageSize: 10,
    id: 'id',
    editFileds: () => [],
    hasDelete: true,
    hasEdit: true,
    hasNew: true,
    hasView: true,
    hasOperation: true,
    hasPagination: true,
})

// search
const search = useSearch(props.columns);


// pagination
const pagination = reactive({
    pageNum: 1,
    pageSize: props.pageSize
})

// table
const params = computed(() => {
    return {
        ...(props.hasPagination ? pagination : {}),
        ...search.model
    }
})
const table = useTable(props.apis, params);

// selection
const selection = useSelection(props.id);

// editor
const editor = useEditor(props.editFileds, props.apis, props.id);

async function handleDelete(rowOrIds: Record<string, any> | string[]) {
    try {
        await editor.remove(rowOrIds);
        table.getList();
    } catch (e) {
        console.error(e);
    }
}

async function handleEdit(done: () => void) {
    try {
        await editor.edit();
        done();
        table.getList();
    } catch (e) {
        console.error(e)
    }
}

</script>

<style scoped>
:deep(.el-pagination) {
    justify-content: center;
}
</style>