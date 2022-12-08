import type FormRendererVue from "./FormRenderer.vue";

function useSearch() {
    const searchFormRef = ref<InstanceType<typeof FormRendererVue>>();

    return {
        searchFormRef
    }
}

export default useSearch;