import { shallowMount } from '@vue/test-utils'
import PathNode from '@/components/MilestonePath/PathNode.vue'
import { describe, it, expect } from 'vitest'

describe('NodeComponent', () => {
  it('renders with default props', () => {
    const wrapper = shallowMount(PathNode)
    expect(wrapper.find('.Node').exists()).toBe(true)
    expect(wrapper.find('#top').exists()).toBe(true)
    expect(wrapper.find('#bottom').exists()).toBe(true)
  })

  it('renders with custom props', () => {
    const wrapper = shallowMount(PathNode, {
      props: {
        nodeBackgroundColor: 'red',
        topBackgroundColor: 'blue',
        bottomBackgroundColor: 'green'
      }
    })
    expect(wrapper.find('.Node').attributes('style')).toContain('background-color: red;')
    expect(wrapper.find('#top').attributes('style')).toContain('background-color: blue;')
    expect(wrapper.find('#bottom').attributes('style')).toContain('background-color: green;')
  })
})
