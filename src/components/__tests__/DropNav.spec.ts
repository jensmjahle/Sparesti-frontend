import { shallowMount } from '@vue/test-utils';
import DropNav from '@/components/navigation/DropNav.vue';
import { describe, it, expect } from 'vitest'

describe('DropNavComponent', () => {
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
