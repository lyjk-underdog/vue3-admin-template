import { defineStore } from 'pinia';
import * as userApi from '@/apis/user';
import type * as UserApiType from '@/apis/user';
import { setToken, getToken, removeToken } from '@/utils/auth';

const useUserStore = defineStore('user', () => {

    const token = ref(getToken());
    const name = ref('');
    const avatar = ref('');

    async function login(req: UserApiType.Login.Req) {
        try {
            const { data } = await userApi.login(req);
            token.value = data;
            setToken(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function getInfo() {
        try {
            const { data } = await userApi.info();
            name.value = data.name;
            avatar.value = data.avatar;
        } catch (err) {
            console.error(err);
        }
    }

    function resetToken() {
        token.value = '';
        removeToken();
    }

    return {
        token,
        name,
        avatar,
        login,
        getInfo,
        resetToken
    }
})

export default useUserStore;