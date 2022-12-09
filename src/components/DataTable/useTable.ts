import type { Ref } from 'vue';
import type { Apis } from './index.vue';

function useTable(apis: Apis, params?: Ref<any>) {

    const loading = ref(false);
    const list = ref<any[]>([]);
    const total = ref(0);

    async function getList() {
        loading.value = true;

        let { rows, total: t } = await apis.list(params?.value);
        list.value = rows;
        total.value = t;

        loading.value = false;
    }

    onMounted(() => {
        getList();
    })

    return reactive({
        loading,
        list,
        total,
        getList
    });
}

export default useTable;