<template>
    <FormRendererVue ref="searchRef" :model="props.model" :fields="props.fields" inline>
        <template #footer>
            <ElButton type="primary" :icon="Search" @click="handleSearch">搜索</ElButton>
            <ElButton :icon="Refresh" @click="handleReset">重置</ElButton>
        </template>
    </FormRendererVue>
</template>

<script setup lang="ts">
import type { Field } from './FormRenderer.vue';
import FormRendererVue from './FormRenderer.vue';
import { Search, Refresh } from '@element-plus/icons-vue'

interface Props {
    model: Record<string, any>;
    fields: Field[];
}

interface Emits {
    (e: 'search'): void;
    (e: 'reset'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const searchRef = ref<InstanceType<typeof FormRendererVue>>();

function handleSearch() {
    searchRef.value?.validate((valid) => {
        if (valid) {
            emits('search');
        }
    })
}

function handleReset() {
    searchRef.value?.resetFields();
    emits('reset');
}

</script>

<style scoped>

</style>