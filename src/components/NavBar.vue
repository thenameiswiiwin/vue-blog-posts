<script lang="ts" setup>
import { PlusIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/modal'
import { useUsers } from '@/stores/usersStore'
import Button from './Button.vue'

const modal = useModal()
const usersStore = useUsers()
const router = useRouter()

async function logout() {
  await usersStore.logout()
  router.push({ path: '/' })
}
</script>

<template>
  <nav>
    <div
      v-if="usersStore.currentUserId"
      class="flex justify-end gap-2 pb-4 pt-8"
    >
      <div class="shrink-0">
        <RouterLink to="/posts/new">
          <Button type="button" size="small" intent="primary">
            <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            New Post
          </Button>
        </RouterLink>
      </div>
      <div class="shrink-0">
        <Button type="button" size="small" intent="secondary" @click="logout()">
          Log Out
        </Button>
      </div>
    </div>
    <div v-else class="flex justify-end gap-2 pb-4 pt-8">
      <div class="shrink-0">
        <Button
          type="button"
          size="small"
          intent="secondary"
          @click="modal.showModal('signUp')"
        >
          Sign Up
        </Button>
      </div>
      <div class="shrink-0">
        <Button
          type="button"
          size="small"
          intent="primary"
          @click="modal.showModal('signIn')"
        >
          Sign In
        </Button>
      </div>
    </div>
  </nav>

  <Teleport to="#modal">
    <div>
      <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
        <Button
          type="button"
          size="icon"
          intent="icon"
          @click="modal.hideModal()"
        >
          <span class="sr-only">Close</span>
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </Button>
      </div>
      <component :is="modal.component.value" />
    </div>
  </Teleport>
</template>
