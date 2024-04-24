import { shallowMount } from '@vue/test-utils'
import MilestonePath from '@/components/MilestonePath/MilestonePath.vue'
import { describe, it, expect } from 'vitest'

describe('PathNode.vue', () => {
  describe('computed', () => {
    it('calculates total nodes correctly', () => {
      const totalToSave = 2000
      const wrapper = shallowMount(MilestonePath, {
        props: { totalToSave, totalSaved: 0 }
      })
      expect(wrapper.vm.totalNodes).toBe(Math.ceil(totalToSave / 250))
    })

    it('calculates remaining nodes correctly', () => {
      const totalToSave = 2000
      const totalSaved = 500
      const wrapper = shallowMount(MilestonePath, {
        props: { totalToSave, totalSaved }
      })
      expect(wrapper.vm.remainingNodes).toBe(Math.ceil(wrapper.vm.totalNodes - (wrapper.vm.totalNodes * (totalSaved / totalToSave))))
    })

    it('sets remaining nodes to total nodes if total saved is 0', () => {
      const totalToSave = 2000
      const wrapper = shallowMount(MilestonePath, {
        props: { totalToSave, totalSaved: 0 }
      })
      expect(wrapper.vm.remainingNodes).toBe(wrapper.vm.totalNodes)
    })
  })

  describe('node generation and styling', () => {
    it('generates nodes correctly', () => {
      const totalNodes = 8 // For example
      const totalToSave = 2000
      const totalSaved = 1000
      const wrapper = shallowMount(MilestonePath, {
        props: { totalToSave, totalSaved }
      })
      expect(wrapper.vm.nodes).toHaveLength(totalNodes)
    })

    it('applies correct styles to nodes', () => {
      const totalToSave = 2000
      const totalSaved = 1000
      const wrapper = shallowMount(MilestonePath, {
        props: { totalToSave, totalSaved }
      })
      const nodes = wrapper.findAll('.node')
      nodes.forEach((node, index) => {
        const colorIndex = index < wrapper.vm.remainingNodes - 1 ? 0 : (index === wrapper.vm.remainingNodes - 1 ? 1 : 2)
        const foregroundColor = wrapper.vm.nodeForegroundColors[colorIndex]
        const backgroundColor = wrapper.vm.nodeBackgroundColors[colorIndex]
        const nodeStyle = (node.element as HTMLElement).style
        expect(nodeStyle.backgroundColor).toBe(`${backgroundColor}`)
        expect(nodeStyle.top).toBe(`${foregroundColor}`)
        expect(nodeStyle.bottom).toBe(`${backgroundColor}`)
      })
    })
  })
})
