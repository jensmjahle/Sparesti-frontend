import { mount } from '@vue/test-utils'
import TransactionComponent from '@/components/economy/TransactionComponent.vue'
import { describe, it, expect } from 'vitest'
describe('TransactionComponent', () => {
  it('renders correctly with props', async () => {
    // Define props for testing
    const title = 'Test Title'
    const date = '2024-04-29'
    const amount = 100
    const category = 'Test Category'

    // Mount the component with props
    const wrapper = mount(TransactionComponent, {
      props: {
        title,
        date,
        amount,
        category
      }
    })

    // title rendering
    expect(wrapper.find('.component-title').text()).toContain(title)

    // date rendering
    expect(wrapper.findAll('.component-right-field').at(0).text()).toContain(date)

    // amount rendering
    expect(wrapper.findAll('.component-right-field').at(1).text()).toContain(`${amount}kr`)

    // category rendering
    expect(wrapper.findAll('.component-right-field').at(2).text()).toContain(category)
  })

})
