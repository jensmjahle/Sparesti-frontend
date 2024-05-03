import { mount } from '@vue/test-utils'
import DropDownMenu from '@/components/navigation/TopNav.vue'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
vi.mock('@/utils/profileutils', () => ({
  getUserInfo: vi.fn(() => ({ profilePictureBase64: 'base64string' }))
}))

// Mocking useTokenStore
vi.mock('@/stores/token', () => ({
  useTokenStore: vi.fn(() => ({ jwtToken: 'mockedToken' }))
}))
describe('DropDownMenu', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DropDownMenu)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders properly when burger menu is closed', () => {
    wrapper = mount(DropDownMenu)
    expect(wrapper.find('.burger').exists()).toBe(false)
  })

  it('renders properly when burger menu is open', async () => {
    wrapper = mount(DropDownMenu)
    await wrapper.find('.burger-menu').trigger('click')
    expect(wrapper.find('.burger').exists()).toBe(true)
  })
})
