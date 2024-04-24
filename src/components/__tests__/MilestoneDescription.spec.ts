import { mount } from '@vue/test-utils'
import MilestoneDescription from '@/components/MilestonePath/MilestoneDescription.vue';
import { describe, it, expect } from 'vitest'

describe('MilestoneDescription', () => {
  it('renders path description correctly', () => {
    const props = {
      pathDescription: 'This is a sample path description.'
    }
    const wrapper = mount(MilestoneDescription, {
      props
    })
    const description = wrapper.find('#Description')
    expect(description.text()).toBe(props.pathDescription)
  })

  it('renders title correctly', () => {
    const props = {
      pathDescription: 'This is a sample path description.'
    }
    const wrapper = mount(MilestoneDescription, {
      props
    })
    const title = wrapper.find('#Title')
    expect(title.text()).toBe('Sparemåls beskrivelse:')
  })
})
