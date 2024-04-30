import { mount } from '@vue/test-utils'
import UserInfo from '@/components/profile/UserInfo.vue'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { updateUserInfo } from '../../utils/profileutils'

// Mocking getUserInfo and updateUserInfo functions
vi.mock('@/utils/profileutils', () => ({
  getUserInfo: vi.fn(),
  updateUserInfo: vi.fn()
}))

// Mocking useTokenStore
vi.mock('@/stores/token', () => ({
  useTokenStore: vi.fn(() => ({ jwtToken: 'mockedToken' }))
}))

describe('UserInfo', () => {
  let wrapper:any

  beforeEach(() => {
    wrapper = mount(UserInfo)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('saves user info when save button is clicked', async () => {
    wrapper.vm.email = 'newemail@example.com'
    wrapper.vm.profilePictureBase64 = 'newBase64String'

    await wrapper.find('.save-button').trigger('click')

    expect(updateUserInfo).toHaveBeenCalledWith(
      'mockedToken',
      'newemail@example.com',
      'newBase64String'
    )
  })
})
