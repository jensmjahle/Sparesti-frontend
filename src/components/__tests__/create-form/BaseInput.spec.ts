import { mount } from '@vue/test-utils'
import BaseInput from '@/components/create-form/BaseInput.vue'
import { describe, it, expect } from 'vitest'

describe('BaseInput', () => {
  it('renders correctly with props', async () => {
    const label = 'Your Label'
    const placeHolder = 'Your Placeholder'
    const type = 'text'
    const modelValue = 'Initial Value'

    const wrapper = mount(BaseInput, {
      props: {
        label,
        placeHolder,
        type,
        modelValue
      }
    })

    expect(wrapper.find('h3').text()).toBe(label)

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe(placeHolder)
    expect(input.attributes('type')).toBe(type)
    expect(input.element.value).toBe(modelValue)

    // Simulate input
    const newValue = 'New Value'
    await input.setValue(newValue)

    const emittedEvents = wrapper.emitted()
    expect(emittedEvents).toBeTruthy()

    const updateModelValueEvents = emittedEvents['update:modelValue'] as any[]
    expect(updateModelValueEvents).toBeTruthy()

    const newValueEmitted = updateModelValueEvents[0][0]
    expect(newValueEmitted).toBe(newValue)
  })
})
