import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleButton from '@/components/economy/ToggleButton.vue'

describe('ToggleButton', () => {
  it('toggles chart visibility when clicked', async () => {
    const wrapper = mount(ToggleButton)
    expect(wrapper.vm.chartVisible).toBe(false)
    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(wrapper.vm.chartVisible).toBe(true)

  })

  it('emits toggle-chart event when clicked', async () => {
    const wrapper = mount(ToggleButton)

    // Simulate clicking the toggle button
    await wrapper.find('input[type="checkbox"]').trigger('change')

    expect(wrapper.emitted('toggle-chart')).toBeTruthy()
    expect(wrapper.vm.chartVisible).toBe(true)

    await wrapper.find('input[type="checkbox"]').trigger('change')

    expect(wrapper.emitted('toggle-chart')).toBeTruthy()
    expect(wrapper.emitted('toggle-chart')[1][0]).toBe(false)
  })
})
