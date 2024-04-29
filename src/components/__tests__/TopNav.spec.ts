import { mount } from '@vue/test-utils';
import DropDownMenu from '@/components/navigation/TopNav.vue';
import { describe, it, expect, vi , afterEach, beforeEach } from 'vitest'

describe('DropDownMenu', () => {
  it('renders properly when burger menu is closed', () => {
    const wrapper = mount(DropDownMenu);
    expect(wrapper.find('.burger').exists()).toBe(false);
  });

  it('renders properly when burger menu is open', async () => {
    const wrapper = mount(DropDownMenu);
    await wrapper.find('.burger-menu').trigger('click');
    expect(wrapper.find('.burger').exists()).toBe(true);
  });
});
