<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import debounce from 'lodash/debounce'
import type { TimelinePost } from '@/posts'
import { usePosts } from '@/stores/posts'

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

const posts = usePosts()

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

function handleSubmit() {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value
  }
  posts.createPost(newPost)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          New Post
        </h2>

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

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="button"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Save Post
      </button>
    </div>
  </form>
</template>
