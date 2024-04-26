import { shallowMount } from '@vue/test-utils';
import ProgressBar from '@/components/ProgressBar.vue'
import { describe, it, expect } from 'vitest'

describe('MyComponent', () => {
  it('renders correctly with props', () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        Max: 10,
        Current: 5
      }
    });

    expect(wrapper.find('progress').exists()).toBe(true);
  });

  it('renders progress bar with correct max and value attributes', () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        Max: 10,
        Current: 5
      }
    });

    const progress = wrapper.find('progress');
    expect(progress.attributes('max')).toBe('10');
    expect(progress.attributes('value')).toBe('6');
  });
});
