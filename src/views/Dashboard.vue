<template>
    <div w:text="30px" w:font="bold">Hello , {{ userStore.name }}!</div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
const userStore = useUserStore();
</script>

<style scoped>

</style>