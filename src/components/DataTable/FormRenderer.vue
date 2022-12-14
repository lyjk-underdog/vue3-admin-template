<template>
    <ElForm ref="elFormRef" :model="model" :inline="props.inline" :disabled="props.disabled">
        <ElFormItem v-for="(field, index) of props.fields" :key="index" :label="field.label" :prop="field.prop"
            :rules="field.rules">

            <!-- input -->
            <template v-if="field.type === 'input'">
                <ElInput :model-value="getValue(field.prop)"
                    @update:model-value="(newVal) => setValue(field.prop, newVal)" v-bind="field.attrs" />
            </template>

            <!-- select -->
            <template v-else-if="field.type === 'select'">
                <ElSelect :model-value="getValue(field.prop)"
                    @update:model-value="(newVal) => setValue(field.prop, newVal)" v-bind="field.attrs">
                    <ElOption v-for="(item, index) of field.options" :key="index" :value="item.value">{{ item.label }}
                    </ElOption>
                </ElSelect>
            </template>

            <!-- 自定义 -->
            <template v-else>
                <component :is="field.type" :model-value="getValue(field.prop)"
                    @update:model-value="(newVal: any) => setValue(field.prop, newVal)" v-bind="field.attrs" />
            </template>
        </ElFormItem>

        <ElFormItem v-if="$slots.footer">
            <slot name="footer"></slot>
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import { type FormItemRule, type ElForm, type FormValidateCallback, type FormItemProp, ElFormItem, ElInput, ElOption, ElSelect, } from 'element-plus';
import type { Arrayable } from 'element-plus/es/utils';
import type { Component } from 'vue';

export interface Field {
    type: 'input' | 'select' | Component;
    label: string;
    prop: string | string[];
    options?: { label: string, value: any }[];
    attrs?: Record<string, any>;
    rules?: FormItemRule | FormItemRule[]
}

interface Props {
    model: Record<string, any>;
    fields: Field[];
    inline?: boolean;
    disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    inline: false,
    disabled: false,
})

// 获取model对应的prop值
function getValue(prop: string | string[]): any {
    const segments = Array.isArray(prop) ? prop : prop.split('.');

    return segments.reduce((obj, segment) => {
        return obj[segment];
    }, props.model);
}

// 设置model对应的prop值
function setValue(prop: string | string[], val: any) {
    const segments = Array.isArray(prop) ? prop : prop.split('.');

    segments.reduce((obj, segment, index) => {

        if (index === segments.length - 1) {
            return obj[segment] = val;
        }

        return obj[segment];

    }, props.model);
}

const elFormRef = ref<InstanceType<typeof ElForm>>();

function validate(callback?: FormValidateCallback | undefined) {
    return elFormRef.value?.validate(callback);
}

function resetFields(itemPorps?: Arrayable<FormItemProp> | undefined) {
    return elFormRef.value?.resetFields(itemPorps);
}

function clearValidate(itemPorps?: Arrayable<FormItemProp> | undefined) {
    return elFormRef.value?.clearValidate(itemPorps);
}

defineExpose({
    validate,
    resetFields,
    clearValidate
})

</script>

<style scoped>

</style>