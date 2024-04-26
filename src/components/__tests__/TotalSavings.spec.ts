// Import the necessary packages
import { mount } from '@vue/test-utils'
import TotalSavings from '@/components/HomeComponents/TotalSavings.vue'
import { describe, it, expect } from 'vitest'
import { createPinia } from 'pinia'

describe('YourComponent', () => {
  it('renders correctly with default value', async () => {

    const pinia = createPinia()

    const wrapper = mount(TotalSavings, {
      global:{
        plugins:[pinia]
      }
    })

    // Assert that the component renders correctly
    expect(wrapper.exists()).toBe(true)

    // Assert that the rendered value matches the given value
    expect(wrapper.find('#Saved').text()).toBe(`0 nok`)
  })
})
