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
  let wrapper

  beforeEach(() => {
    wrapper = mount(UserInfo)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('fetches user info on mount', async () => {
    expect.assertions(3)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.username).toBe('mockedUsername')
    expect(wrapper.vm.email).toBe('mockedEmail')
    expect(wrapper.vm.profilePictureBase64).toBe('mockedProfilePictureBase64')
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

  it('validates email correctly', async () => {
    wrapper.vm.email = 'invalidemail'

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.error-message').text()).toBe('Ikke gyldig e-post adresse!')
    expect(wrapper.find('.input').classes()).toContain('error')
  })

  // Add more tests as needed
})
