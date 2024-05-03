import { mount } from '@vue/test-utils'
import DirectTransfer from '@/components/MilestonePath/DirectTransfer.vue'
import { describe, it, expect } from 'vitest'

describe('DirectTransfer', () => {
  it('updates transferValue when input changes', async () => {
    const wrapper = mount(DirectTransfer)
    const input = wrapper.find('input[type="number"]')

    await input.setValue(50)
    const actualValue = (wrapper.vm as any).transferValue

    expect(actualValue).toBe(50)
  })

  it('emits "transfer-value" event with correct value when button is clicked', async () => {
    const wrapper = mount(DirectTransfer)
    const input = wrapper.find('input[type="number"]')
    const button = wrapper.find('button')

    await input.setValue(50)
    await button.trigger('click')

    const emittedValue = wrapper.emitted('transfer-value')
    expect(emittedValue).toBeTruthy()

    if (emittedValue) {
      expect(emittedValue[0]).toEqual([50])
    }
  })
})
