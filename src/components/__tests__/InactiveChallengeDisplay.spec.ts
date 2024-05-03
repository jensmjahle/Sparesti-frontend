import { mount } from '@vue/test-utils'
import InactiveChallengeDisplay from '@/components/challenge/InactiveChallengeDisplay.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('InactiveChallengeDisplay', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders challenge information correctly', () => {
    const challenge = {
      challengeId: 1,
      challengeTitle: 'Test Challenge',
      challengeDescription: 'Description of test challenge',
      goalSum: 100,
      expirationDate: '2024-05-01'
    }

    const wrapper = mount(InactiveChallengeDisplay, {
      propsData: {
        challenge // Pass challenge as propsData
      }
    })

    expect(wrapper.find('.title').text()).toBe(challenge.challengeTitle)
    expect(wrapper.find('.description').text()).toBe(challenge.challengeDescription)
    expect(wrapper.find('.sum').text()).toContain(challenge.goalSum)
    expect(wrapper.find('.info').text()).toContain('Utløpsdato:')
    expect(wrapper.find('.info').text()).toContain('Sparesum:')
  })
})
