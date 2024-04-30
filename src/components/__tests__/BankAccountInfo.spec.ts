// Import necessary dependencies
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import BankAccountInfo from '@/components/profile/BankAccountInfo.vue';
import { createPinia, setActivePinia } from 'pinia'

describe('AccountInfo.vue', () => {
  let wrapper:any

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(BankAccountInfo)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
