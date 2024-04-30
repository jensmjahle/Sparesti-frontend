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

    const emittedEvents = wrapper.emitted()
    expect(emittedEvents).toBeTruthy()

    const updateModelValueEvents = emittedEvents['update:modelValue'] as any[]
    expect(updateModelValueEvents).toBeTruthy()

    const newValueEmitted = updateModelValueEvents[0][0]
    expect(newValueEmitted).toBe(newValue)
  })
})
