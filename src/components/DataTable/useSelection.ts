
function useSelection(id: string) {

    const list = ref<any[]>([]);
    const isSelected = ref(false);

    const ids = computed(() => {
        return list.value.map((item) => item[id])
    })

    function selectionChange(newSelection: any[]) {
        newSelection.length === 0 ? (isSelected.value = false) : (isSelected.value = true);
        list.value = newSelection;
    }

    return reactive({
        list,
        isSelected,
        ids,
        selectionChange
    })
}

export default useSelection;