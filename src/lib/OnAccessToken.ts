export default async function onAccessToken(accessToken: string, api: any, $cookies: any, store: any) {
    $cookies.set('AccessToken', accessToken);
    api.setJWT(accessToken);
    const { data: user } = await api.user.get();
    store.commit('setUser', user);


    if (user.groups.length > 1) {
        store.commit('setGroup', user.groups[0]);
    }
};
