import { mount } from '@vue/test-utils'
import IncomeInfo from '@/components/profile/IncomeInfo.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('IncomeInfo', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', async () => {
    const wrapper = mount(IncomeInfo)

    expect(wrapper.exists()).toBe(true)

    expect(wrapper.findAll('.input-field')).toHaveLength(3)

    expect(wrapper.find('.save-button').exists()).toBe(true)
  })
})
