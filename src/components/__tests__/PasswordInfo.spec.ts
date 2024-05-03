import { mount } from '@vue/test-utils'
import PasswordInfo from '@/components/profile/PasswordInfo.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('PasswordComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', async () => {
    const wrapper = mount(PasswordInfo)

    expect(wrapper.exists()).toBe(true)

    expect(wrapper.find('.title').text()).toBe('Passord')

    expect(wrapper.find('.save-button').exists()).toBe(true)

    expect(wrapper.find('[data-testid="current-password-input"]').exists()).toBe(true)

    expect(wrapper.find('[data-testid="new-password-input"]').exists()).toBe(true)
  })
})
