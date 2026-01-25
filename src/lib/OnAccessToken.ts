export default async function onAccessToken(accessToken: string, api: any, $cookies: any, store: any) {
    $cookies.set('AccessToken', accessToken);
    api.setJWT(accessToken);
    const { data: user } = await api.user.get();
    store.commit('setUser', user);

    if (user.type === 'Admin') {
        const { data: stats } = await api.admin.users.stats();
        store.commit('setLeadsCount', stats.leads);
        store.commit('setDealsCount', stats.deals);
    }
};
