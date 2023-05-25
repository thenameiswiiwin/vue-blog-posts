import { ref, shallowRef } from 'vue'
import SignupForm from '@/components/SignupForm.vue'
import SigninForm from '@/components/SigninForm.vue'

const show = ref(false)
const component = shallowRef()

export function useModal() {
  return {
    show,
    component,
    showModal: (type: 'signUp' | 'signIn') => {
      show.value = true
      if (type === 'signUp') component.value = SignupForm
      if (type === 'signIn') component.value = SigninForm
    },
    hideModal: () => {
      show.value = false
    }
  }
}
