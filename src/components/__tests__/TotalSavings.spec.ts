import { mount } from '@vue/test-utils'
import TotalSavings from '@/components/HomeComponents/TotalSavings.vue'
import { describe, it, expect } from 'vitest'

describe('TotalSavings', () => {
  it('renders total saved amount correctly', () => {
    const totalSaved = 1000
    const wrapper = mount(TotalSavings, {
      props: {
        totalSaved
      }
    })

    const savedAmount = wrapper.find('#Saved')

    expect(savedAmount.text()).toBe(`${totalSaved} NOK`)
  })

})
