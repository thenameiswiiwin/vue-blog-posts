import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewPost from '@/views/NewPost.vue'
import { useUsers } from '@/stores/usersStore'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/posts/new',
      name: 'new-post',
      component: NewPost,
      beforeEnter: () => {
        const usersStore = useUsers()

        if (!usersStore.currentUserId) {
          return {
            path: '/'
          }
        }
      }
    }
  ]
})
