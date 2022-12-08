import type { Ref } from 'vue';
import type { Apis } from './index.vue';

function useTable(apis: Apis, params?: Ref<any>) {

    const loading = ref(false);
    const list = ref<any[]>([]);
    const total = ref(0);

    async function getList() {
        loading.value = true;

        let { data } = await apis.list(params?.value);
        list.value = data!.rows;
        total.value = data!.total;

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