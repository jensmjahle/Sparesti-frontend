import { mount } from '@vue/test-utils';
import CompletedMilestoneDisplay from '../milestone/CompletedMilestoneDisplay.vue'
import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'

describe('CompletedMilestoneDisplay', () => {
  it('renders with props', async () => {
    const wrapper = mount(CompletedMilestoneDisplay, {
      props: {
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        goalSum: 1000,
        currentSum: 500,
        deadline: new Date('2024-05-01'),
        startDate: new Date('2024-04-01'),
        image: 'test.jpg'
      }
    });

    expect(wrapper.find('.title').text()).toBe('Test Title');

    expect(wrapper.find('.info').exists()).toBe(true);
    expect(wrapper.find('.info h4').text()).toBe('Du sparte 500kr av 1000kr');

    await wrapper.trigger('mouseover');

    await nextTick();

    expect(wrapper.find('.info').exists()).toBe(true);
    expect(wrapper.find('.info h4').text()).toBe('Du sparte 500kr av 1000kr');

    await wrapper.trigger('mouseleave');

    await nextTick();

    expect(wrapper.find('.info').exists()).toBe(true);
    expect(wrapper.find('.info h4').text()).toBe('Du sparte 500kr av 1000kr');
  });

});
