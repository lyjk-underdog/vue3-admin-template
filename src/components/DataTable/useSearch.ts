import type { Column } from './index.vue';
import type { Field } from './FormRenderer.vue';

function useSearch(columns: Column[]) {
    const model = ref<Record<string, any>>({});
    const fields = ref<Field[]>([]);

    // 根据columns构造model和fields
    onBeforeMount(() => {
        const _model: Record<string, any> = {};
        const _fields: Field[] = [];

        for (let col of columns) {
            if (col.search) {
                _model[col.prop] = col.search.default ?? null;
                _fields.push({
                    label: col.label,
                    prop: col.prop,
                    ...col.search
                })
            }
        }

        model.value = _model;
        fields.value = _fields;
    })

    return reactive({
        model,
        fields
    })
}

export default useSearch;