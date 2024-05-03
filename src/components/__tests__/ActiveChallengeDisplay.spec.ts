import { mount } from '@vue/test-utils'
import ActiveChallengeDisplay from '@/components/challenge/ActiveChallengeDisplay.vue'
import { describe, it, expect } from 'vitest'

describe('ActiveChallengeDisplay', () => {
  it('emits challengeCompleted when complete button is clicked', async () => {
    const challenge = {
      challengeId: 1,
      challengeTitle: 'Test Challenge',
      challengeDescription: 'Description of test challenge',
      goalSum: 100,
      expirationDate: '2024-05-01'
    }

    const wrapper = mount(ActiveChallengeDisplay, {
      props: {
        challenge
      }
    })

    await wrapper.find('.complete-button').trigger('click')

    expect(wrapper.emitted('challengeCompleted')).toBeTruthy()
    expect(wrapper.emitted('challengeCompleted')?.[0]?.[0]).toBe(challenge.challengeId)
  })

  it('emits challengeDeleted when delete button is clicked', async () => {
    const challenge = {
      challengeId: 1,
      challengeTitle: 'Test Challenge',
      challengeDescription: 'Description of test challenge',
      goalSum: 100,
      expirationDate: '2024-05-01'
    }

    const wrapper = mount(ActiveChallengeDisplay, {
      props: {
        challenge
      }
    })

    await wrapper.find('.close-img').trigger('click')

    expect(wrapper.emitted('challengeDeleted')).toBeTruthy()
    expect(wrapper.emitted('challengeDeleted')?.[0]?.[0]).toBe(challenge.challengeId)
  })

  it('displays correct challenge information', () => {
    const challenge = {
      challengeId: 1,
      challengeTitle: 'Test Challenge',
      challengeDescription: 'Description of test challenge',
      goalSum: 100,
      expirationDate: '2024-05-01'
    }

    const wrapper = mount(ActiveChallengeDisplay, {
      props: {
        challenge
      }
    })

    expect(wrapper.text()).toContain(challenge.challengeTitle)
    expect(wrapper.text()).toContain(challenge.challengeDescription)
    expect(wrapper.text()).toContain('Utløpsdato: 01/05/2024')
    expect(wrapper.text()).toContain('Sparesum: 100kr')
  })
})
