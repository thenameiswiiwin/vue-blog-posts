<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { usePostsStores } from '@/stores/postsStores'
import Button from '@/components/Button.vue'
import { useUsers } from '@/stores/usersStore'

const route = useRoute()
const postsStore = usePostsStores()
const usersStore = useUsers()

const id = route.params.id as string
const post = postsStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} not found`)
}

const canEdit = computed(() => {
  if (!usersStore.currentUserId) {
    return false
  }

  if (usersStore.currentUserId !== post.authorId) {
    return false
  }

  return true
})
</script>

<template>
  <div>
    <div>
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          {{ post.title }}
        </h2>

        <div class="mt-6 flex flex-col gap-x-6 gap-y-8">
          <div v-html="post.html" />
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-2">
      <RouterLink to="/">
        <Button
          type="button"
          size="small"
          intent="secondary"
          class="text-gray-900"
        >
          Cancel
        </Button>
      </RouterLink>
      <RouterLink v-if="canEdit" :to="`/posts/${post.id}/edit`">
        <Button type="submit" size="small" intent="primary"> Edit Post </Button>
      </RouterLink>
    </div>
  </div>
</template>
