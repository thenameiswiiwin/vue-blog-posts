<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import debounce from 'lodash/debounce'
import type { Post, TimelinePost } from '@/utils/posts'
import { useUsers } from '@/stores/usersStore'
import Button from './Button.vue'

const props = defineProps<{
  post: TimelinePost | Post
}>()

const emit = defineEmits<{
  (event: 'submit', post: Post): void
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

const usersStore = useUsers()

function parseHtml(markdown: string) {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return hljs.highlightAuto(code).value
      }
    },
    (err, parseResult) => {
      html.value = parseResult
    }
  )
}

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent)
  }, 250),
  { immediate: true }
)

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})

function handleInput() {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value?.innerText ?? ''
}

async function handleClick() {
  if (!usersStore.currentUserId) {
    throw Error('User is not logged in')
  }

  const newPost: Post = {
    ...props.post,
    created:
      typeof props.post.created === 'string'
        ? props.post.created
        : props.post.created.toISO(),
    title: title.value,
    authorId: usersStore.currentUserId,
    markdown: content.value,
    html: html.value
  }
  emit('submit', newPost)
}
</script>

<template>
  <div>
    <div>
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-6 flex flex-col gap-x-6 gap-y-8">
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <div
                class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600"
              >
                <input
                  type="text"
                  name="title"
                  id="title"
                  autocomplete="title"
                  class="block w-full border-0 bg-transparent p-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                  v-model="title"
                />
              </div>
            </div>
          </div>

          <div>
            <div class="grid grid-cols-2">
              <div
                id="content"
                name="content"
                contenteditable
                ref="contentEditable"
                @input="handleInput"
              />
              <div>
                <div v-html="html" />
              </div>
            </div>
          </div>
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
      <Button type="submit" size="small" intent="primary" @click="handleClick">
        Save Post
      </Button>
    </div>
  </div>
</template>
