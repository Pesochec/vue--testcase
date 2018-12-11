import * as fb from 'firebase'


class Product {
    constructor(title, vendor, text, ownerId, id = null) {
        this.title = title,
            this.vendor = vendor,
            this.text = text,
            this.ownerId = ownerId,
            this.id = id
    }
}
export default {
    state: {
        product: []
    },
    mutations: {
        createProduct(state, payload) {
            state.product.push(payload)
        },
        loadProduct(state, payload) {
            state.product = payload
        }
    },
    actions: {
        async  createProduct({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const newProduct = new Product(
                    payload.title,
                    payload.vendor,
                    payload.text,
                    getters.user.id,
                )
                const product = await fb.database().ref('registers').push(newProduct)
                commit('setLoading', false)
                commit('createProduct', {
                    ...newProduct,
                    id: product.key
                })
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }   
            // commit('createProduct', payload)
        },
        async fetchProducts({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            const resultProducts = []
            try {
                const productsVal = await fb.database().ref('registers').once('value')
                const products = productsVal.val()
                Object.keys(products).forEach(key => {
                    const product = products[key]
                    resultProducts.push(
                        new Product(
                            product.title,
                            product.vendor,
                            product.text,
                            product.ownerId,
                            key,
                        )
                    )
                    commit('loadProduct', resultProducts)
                    commit('setLoading', false)
                })
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters: {
        product(state) {
            return state.product
        },
        myProduct(state, getters) {
            return state.product.filter(product => {
                return product.ownerId === getters.user.id
            })
        }
    }
}