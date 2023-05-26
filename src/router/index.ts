import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewPost from '@/views/NewPost.vue'
import ShowPost from '@/views/ShowPost.vue'
import EditPost from '@/views/EditPost.vue'
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
    },
    {
      path: '/posts/:id',
      name: 'post-id',
      component: ShowPost
    },
    {
      path: '/posts/:id/edit',
      name: 'edit-post',
      component: EditPost
    }
  ]
})
