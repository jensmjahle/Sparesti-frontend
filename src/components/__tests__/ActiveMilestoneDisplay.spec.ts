import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import ActiveMilestoneDisplay from '../milestone/ActiveMilestoneDisplay.vue'
import ProgressBar from '../ProgressBar.vue'

describe('ActiveMilestoneDisplay', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const propsData = {
    id: 1,
    title: 'Test Milestone',
    description: 'Test Description',
    goalSum: 1000,
    currentSum: 500,
    deadline: new Date('2024-05-01'),
    startDate: new Date('2024-04-01'),
    image: 'test.jpg'
  }

  const id = 1
  const title = 'Test Milestone'
  const description = 'Test Description'
  const goalSum = 1000
  const currentSum = 500
  const deadline = new Date('2024-05-01')
  const startDate = new Date('2024-04-01')
  const image = 'test.jpg'

  it('renders correctly', () => {
    const wrapper = mount(ActiveMilestoneDisplay, {
      props: { id, title, description, goalSum, currentSum, deadline, startDate, image }
    })
    expect(wrapper.find('.active-milestone-display').exists()).toBe(true)
    expect(wrapper.find('.title').text()).toBe(propsData.title)
    expect(wrapper.find('.description').text()).toBe(
      `${propsData.currentSum}kr av ${propsData.goalSum}kr`
    )
    expect(wrapper.findComponent(ProgressBar).props('Max')).toBe(propsData.goalSum)
    expect(wrapper.findComponent(ProgressBar).props('Current')).toBe(propsData.currentSum)
  })

  it('displays default image if image prop is not provided', async () => {
    const wrapper = mount(ActiveMilestoneDisplay, {
      props: { propsData }
    })
    await wrapper.setProps({ image: '' })

    const imgElement = wrapper.find('img')

    // Assert that the <img> element exists
    expect(imgElement.exists()).toBe(true)

    expect(imgElement.attributes('src')).toBe('/src/assets/background/img.png')
  })
})
