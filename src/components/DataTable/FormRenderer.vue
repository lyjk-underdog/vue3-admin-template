<template>
    <ElForm ref="elFormRef" :model="model" :inline="props.inline" :disabled="props.disabled">
        <ElFormItem v-for="(field, index) of props.fileds" :key="index" :label="field.label" :prop="field.prop"
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
        </ElFormItem>

        <ElFormItem v-if="$slots.footer">
            <slot name="footer"></slot>
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import { type FormItemRule, type ElForm, type FormValidateCallback, type FormItemProp, ElFormItem, ElInput, ElOption, ElSelect, } from 'element-plus';
import type { Arrayable } from 'element-plus/es/utils';
import { isArray } from 'lodash';
import type { Component } from 'vue';

export interface Field {
    type: 'input' | 'select' | Component;
    label: string;
    prop: string | string[];
    default?: any;
    options?: { label: string, value: any }[];
    attrs?: Record<string, any>;
    rules?: FormItemRule | FormItemRule[]
}

interface Props {
    fileds: Field[],
    inline?: boolean,
    disabled?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    inline: false,
    disabled: false,
})

const model = ref<Record<string, any>>({});
// 根据fields构建model
onBeforeMount(() => {
    let form: Record<string, any> = {};

    props.fileds.forEach((field) => {
        const segments = isArray(field.prop) ? field.prop : field.prop.split('.');

        segments.reduce((obj, segment, index) => {
            if (index === segments.length - 1) {
                obj[segment] = field.default == null ? '' : field.default;
            } else {
                obj[segment] || (obj[segment] = {})
            }

            return obj[segment]
        }, form)

    })

    model.value = form;
})

// 获取model对应的prop值
function getValue(prop: string | string[]) {
    const segments = isArray(prop) ? prop : prop.split('.');

    return segments.reduce((obj, segment) => {
        return obj[segment];
    }, model.value);
}

// 设置model对应的prop值
function setValue(prop: string | string[], val: any) {
    const segments = isArray(prop) ? prop : prop.split('.');

    segments.reduce((obj, segment, index) => {

        if (index === segments.length - 1) {
            return obj.value[segment] = val;
        }

        return toRef(obj.value, segment);

    }, model);
}

// 获取model
function getForm() {
    return unref(model);
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
    getForm,
    validate,
    resetFields,
    clearValidate
})

</script>

<style scoped>

</style>