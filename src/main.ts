import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'
import { useUsers } from '@/stores/usersStore'
import { usePostsStores } from '@/stores/postsStores'

import './styles/global.css'

const app = createApp(App)
app.use(createPinia())

const usersStore = useUsers()
const postsStore = usePostsStores()

Promise.all([usersStore.authenticate(), postsStore.fetchPosts()]).then(() => {
  app.use(router)
  app.mount('#app')
})
