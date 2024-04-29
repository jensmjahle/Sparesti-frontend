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

    expect(wrapper.find('label').text()).toBe(label)

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe(placeHolder)
    expect(input.attributes('type')).toBe(type)
    expect(input.element.value).toBe(modelValue)

    // Simulate input
    const newValue = 'New Value'
    await input.setValue(newValue)

    // Assert emitted event
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(newValue)
  })
})
