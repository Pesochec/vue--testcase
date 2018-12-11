import * as fb from 'firebase'
import Vue from 'vue';
class User {
    constructor(id, email, username, isAdmin = false, avatar) {
        this.id = id
        this.email = email
        this.username = username
        this.isAdmin = isAdmin
        this.avatar = avatar
    }
}

export default {
    state: {
        user: {},
        isAuth: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
            state.isAuth = true
            fb.auth().currentUser.getIdToken().then(token => {
                Vue.cookie.set('profile', token, 1);
            })
        },
        unsetUser(state) {
            state.user = {}
            state.isAuth = false
            Vue.cookie.delete('profile');
        }
    },
    actions: {
        async registerUser({ commit }, { email, password, username, avatar }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                await fb.auth().createUserWithEmailAndPassword(email, password)
                fb.database().ref('users/' + fb.auth().currentUser.uid).set({
                    username: username,
                    email: email,
                    isAdmin: false,
                    avatar: avatar,
                });
                commit('unsetUser')
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async loginUser({ commit }, { email, password }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                await fb.auth().signInWithEmailAndPassword(email, password)
                fb.database().ref('users/' +
                    fb.auth().currentUser.uid).on('value', function (snapshot) {
                        if (snapshot.val()) {
                            var obj = snapshot.val();
                            const usernameaa = obj.username;
                            const isAdmin = obj.isAdmin;
                            const avatar = obj.avatar;
                            commit('setUser', new User(fb.auth().currentUser.uid, fb.auth().currentUser.email, usernameaa, isAdmin, avatar))
                            commit('setLoading', false)
                        }
                    });
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        autoLoginUser({ commit }, payload) {
            commit('setUser', new User(payload.uid, payload.email))
            fb.database().ref('users/' +
                fb.auth().currentUser.uid).on('value', function (snapshot) {
                    if (snapshot.val()) {
                        var obj = snapshot.val();
                        const usernameaa = obj.username;
                        const isAdmin = obj.isAdmin;
                        const avatar = obj.avatar;
                        commit('setUser', new User(payload.uid, payload.email, usernameaa, isAdmin, avatar))
                        commit('setLoading', false)
                    }
                });
        },
        logoutUser({ commit }) {
            fb.auth().signOut()
            commit('unsetUser')
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLoggedIn(state) {
            return state.isAuth !== false
        },
        isUserNotLoggedIn(state) {
            return state.isAuth === false
        }
    }
}
