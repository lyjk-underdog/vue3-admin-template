import useHint from './useHint';
import type { Field } from './FormRenderer.vue';
import type { Apis, EditFiled } from './index.vue';
import { Mode } from './EditForm.vue';

function useEditor(editFileds: EditFiled[], apis: Apis, id: string) {

    const model = ref<Record<string, any>>({});
    const fields = ref<Field[]>([]);
    const mode = ref<Mode>(Mode.Create);
    const loading = ref(false);
    const visible = ref(false);


    // 根据edite-fields初始化model和fields
    onBeforeMount(() => {
        let _fields: Field[] = [];
        const _model: Record<string, any> = {};

        for (let field of editFileds) {

            function createModelStep() {
                const segments = Array.isArray(field.prop) ? field.prop : field.prop.split('.');

                segments.reduce((obj, segment, index) => {
                    if (index === segments.length - 1) {
                        obj[segment] = field.default ?? null;
                    } else {
                        obj[segment] || (obj[segment] = {})
                    }

                    return obj[segment]
                }, _model)
            }

            function createFieldStep() {
                const { default: _, ...rest } = field;

                _fields.push({
                    ...rest
                })
            }

            createModelStep();
            createFieldStep();
        }

        fields.value = _fields;
        model.value = _model;
    })

    // editor弹窗
    async function open(m: Mode, row?: any) {
        mode.value = m;
        visible.value = true;

        if (m === Mode.Update || m === Mode.View) {
            loading.value = true;

            let data = await apis.read!(row[id]);
            model.value = data;

            loading.value = false;

            return;
        }
    }

    // 删除
    function remove(rowOrIds: Record<string, any> | string[]) {
        if (rowOrIds instanceof Array) {
            return useHint(() => apis.remove!(rowOrIds), '删除');
        }

        return useHint(() => apis.remove!(rowOrIds[id]), '删除');

    }

    // 新增、更新
    async function edit() {

        if (mode.value === Mode.Create) {
            await apis.create!(model.value);
            ElMessage({
                type: 'success',
                message: '新增成功！'
            })
        }

        if (mode.value === Mode.Update) {
            await apis.update!(model.value);
            ElMessage({
                type: 'success',
                message: '更新成功！'
            })
        }

        visible.value = false;
    }

    return reactive({
        model,
        fields,
        mode,
        loading,
        visible,
        open,
        edit,
        remove,
    });

}

export default useEditor;