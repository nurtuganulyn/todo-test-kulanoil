import { getPosts, deletePost, addPost, updatePost } from "@/api/post";

const state = () => ({
    posts: [],
});

const getters = {
    posts: (state) => state.posts,
}

const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    deletePost(state, id) {
        state.posts = state.posts.filter((post) => post.id !== id);
    },
    addPost(state, post) {
        state.posts.push(post);
    },
    updatePost(state, updatedPost) {
        console.log('called ', updatedPost);

        state.posts = state.posts.map((post) => {
            if (post.id === updatedPost.id) {
                return updatedPost;
            }
            return post;
        });
    }
}


const actions = {
    async fetchPosts({ commit, state }) {
        if (state.posts.length > 0) return;
        const { data } = await getPosts();
        commit('setPosts', data);
    },
    async deletePost({ commit }, id) {
        await deletePost(id);
        commit("deletePost", id);
    },
    async addPost({ commit, dispatch }, post) {
        const { data } = await addPost(post);
        await dispatch("fetchPosts");
        commit("addPost", data);
    },
    async editPost({ commit }, updatedPost) {
        const { data } = await updatePost(updatedPost, updatedPost.id);
        commit("updatePost", data);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
