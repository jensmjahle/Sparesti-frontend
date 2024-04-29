import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseTextArea from '@/components/create-form/BaseTextArea.vue'

describe('BaseTextArea', () => {
  it('renders correctly with props', async () => {
    const label = 'Your Label'
    const placeHolder = 'Your Placeholder'
    const modelValue = 'Initial Value'

    const wrapper = mount(BaseTextArea, {
      props: {
        label,
        placeHolder,
        modelValue
      }
    })

    expect(wrapper.find('label').text()).toBe(label)

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('placeholder')).toBe(placeHolder)
    expect(textarea.element.value).toBe(modelValue)

    const newValue = 'New Value'
    await textarea.setValue(newValue)

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(newValue)
  })
})
