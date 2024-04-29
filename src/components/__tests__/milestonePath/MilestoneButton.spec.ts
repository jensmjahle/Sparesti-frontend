import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MilestoneButton from '@/components/MilestonePath/MilestoneButton.vue'

describe('MilestoneButton', () => {
  it('renders correctly with props', async () => {
    const label = 'Save'
    const buttonColor = 'blue'

    const wrapper = mount(MilestoneButton, {
      props: {
        label,
        buttonColor
      }
    })
    // label rendering
    expect(wrapper.text()).toContain(label)
    expect(wrapper.text()).toBe('Save')

    // button color
    const buttonElement = wrapper.find('.save-button').element
    expect(buttonElement.style.backgroundColor).toBe(buttonColor)
  })
})
