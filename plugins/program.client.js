export default async ({ store, app }) => {
    if (!process.client) {
        return
    }
    
    store.dispatch('program/init')
        .then(() => store.dispatch('pools/init'))
        .then(() => store.dispatch('pools/getPoolData'))
        .then(() => store.dispatch('wallet/init'))
}