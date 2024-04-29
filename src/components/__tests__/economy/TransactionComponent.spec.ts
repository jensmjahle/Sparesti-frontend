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
    const titleElement = wrapper.find('.component-title')
    if (titleElement.exists()) {
      expect(titleElement.text()).toContain(title)
    } else {
      throw new Error('Title element not found');
    }

    // Find all component-right-field elements
    const rightFieldElements = wrapper.findAll('.component-right-field')

    // Check if elements exist and have expected text content
    if (rightFieldElements.length >= 3) {
      // date rendering
      const dateElement = rightFieldElements.at(0)
      if (dateElement) {
        expect(dateElement.text()).toContain(date)
      } else {
        throw new Error('Date element not found');
      }

      // amount rendering
      const amountElement = rightFieldElements.at(1)
      if (amountElement) {
        expect(amountElement.text()).toContain(`${amount}kr`)
      } else {
        throw new Error('Amount element not found');
      }

      // category rendering
      const categoryElement = rightFieldElements.at(2)
      if (categoryElement) {
        expect(categoryElement.text()).toContain(category)
      } else {
        throw new Error('Category element not found');
      }
    } else {
      throw new Error('Expected elements not found');
    }
  })

})
