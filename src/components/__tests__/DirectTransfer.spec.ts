import { mount } from '@vue/test-utils';
import DirectTransfer from '@/components/MilestonePath/DirectTransfer.vue';
import { describe, it, expect } from 'vitest'

describe('DirectTransfer', () => {
  it('updates transferValue when input changes', async () => {
    const wrapper = mount(DirectTransfer);
    const input = wrapper.find('input[type="number"]');

    await input.setValue(50);

    expect(wrapper.vm.transferValue).toBe(50);
  });

  it('emits "transfer-value" event with correct value when button is clicked', async () => {
    const wrapper = mount(DirectTransfer);
    const input = wrapper.find('input[type="number"]');
    const button = wrapper.find('button');

    await input.setValue(50);
    await button.trigger('click');

    expect(wrapper.emitted('transfer-value')).toBeTruthy();
    expect(wrapper.emitted('transfer-value')[0]).toEqual([50]);
  });
});
