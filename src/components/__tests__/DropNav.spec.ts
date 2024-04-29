import { shallowMount } from '@vue/test-utils';
import DropNav from '@/components/navigation/DropNav.vue';
import { describe, it, expect, vi , afterEach, beforeEach } from 'vitest'

afterEach(() => {
  vi.clearAllMocks
})

const mockRoutePush = vi.fn()

beforeEach(() => {
  vi.mock('vue-router', async () => {
    return {
      RouterView: {},
      useRouter: () => {
        return {
          push: mockRoutePush
        }
      }
    }
  })
})


describe('DropNavComponent', () => {
  it('navigates to home', async () => {

    const wrapper = shallowMount(DropNav);

    const button = wrapper.find('[data-testid="home-button"]');

    await button.trigger('click');

    await wrapper.vm.$nextTick();

    expect(mockRoutePush).toHaveBeenCalled()
    expect(mockRoutePush).toHaveBeenCalledWith('/homepage/home');

  })

  it('navigates to discover', async () => {

    const wrapper = shallowMount(DropNav);

    const button = wrapper.find('[data-testid="discover-button"]');

    await button.trigger('click');

    await wrapper.vm.$nextTick();

    expect(mockRoutePush).toHaveBeenCalled()
    expect(mockRoutePush).toHaveBeenCalledWith('/homepage/discover');

  })

  it('navigates to milestones', async () => {

    const wrapper = shallowMount(DropNav);

    const button = wrapper.find('[data-testid="milestone-button"]');

    await button.trigger('click');

    await wrapper.vm.$nextTick();

    expect(mockRoutePush).toHaveBeenCalled()
    expect(mockRoutePush).toHaveBeenCalledWith('/homepage/milestone');

  })

  it('navigates to challenges', async () => {

    const wrapper = shallowMount(DropNav);

    const button = wrapper.find('[data-testid="challenge-button"]');

    await button.trigger('click');

    await wrapper.vm.$nextTick();

    expect(mockRoutePush).toHaveBeenCalled()
    expect(mockRoutePush).toHaveBeenCalledWith('/homepage/challenge');

  })

  it('navigates to economy', async () => {

    const wrapper = shallowMount(DropNav);

    const button = wrapper.find('[data-testid="economy-button"]');

    await button.trigger('click');

    await wrapper.vm.$nextTick();

    expect(mockRoutePush).toHaveBeenCalled()
    expect(mockRoutePush).toHaveBeenCalledWith('/homepage/economy');

  })

  it('navigates to profile', async () => {

    const wrapper = shallowMount(DropNav);

    const button = wrapper.find('[data-testid="profile-button"]');

    await button.trigger('click');

    await wrapper.vm.$nextTick();

    expect(mockRoutePush).toHaveBeenCalled()
    expect(mockRoutePush).toHaveBeenCalledWith('/homepage/profile');

  })

  it('renders buttons with correct labels and icons', () => {
    const wrapper = shallowMount(DropNav);

    const buttons = wrapper.findAll('.menu-button');
    expect(buttons).toHaveLength(6);

    expect(buttons[0].find('.button-label').text()).toBe('Hjem');
    expect(buttons[1].find('.button-label').text()).toBe('Sparetips');
    expect(buttons[2].find('.button-label').text()).toBe('Sparemål');
    expect(buttons[3].find('.button-label').text()).toBe('Utfordringer');
    expect(buttons[4].find('.button-label').text()).toBe('Forbruk');
    expect(buttons[5].find('.button-label').text()).toBe('Profil');

    expect(buttons[0].find('img').attributes('src')).toBe('/src/components/icons/navigation/house-chimney.svg');
    expect(buttons[1].find('img').attributes('src')).toBe('/src/components/icons/navigation/lightbulb-on.svg');
    expect(buttons[2].find('img').attributes('src')).toBe('/src/components/icons/navigation/piggy-bank.svg');
    expect(buttons[3].find('img').attributes('src')).toBe('/src/components/icons/navigation/challenge.svg');
    expect(buttons[4].find('img').attributes('src')).toBe('/src/components/icons/navigation/economy.svg');
    expect(buttons[5].find('img').attributes('src')).toBe('/src/components/icons/navigation/user.svg');
  });
});
