import { mount } from '@vue/test-utils';
import BadgeInfo from '@/components/profile/BadgeInfo.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

describe('Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders badges with correct data', async () => {
    const wrapper = mount(BadgeInfo, {
      props: { title: 'Test Title' }
    });

    await wrapper.vm.$nextTick();

    const badges = wrapper.findAll('.badge');

    badges.forEach((badge, index) => {
      const achievement = wrapper.vm.achievements[index];
      const img = badge.find('.badge-img');
      const title = badge.find('.badge-title');

      expect(img.attributes('src')).toBe(achievement.img);
      expect(img.attributes('alt')).toBe(achievement.title);
      expect(title.text()).toBe(achievement.title);
    });
  });
});
