import { setActivePinia, createPinia } from 'pinia'
import { FirstTimeAnswersStore } from '../../stores/FirstTimeAnswers'
import { describe, it, expect, beforeEach } from 'vitest'

describe('FirstTimeAnswersStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('Sets user answer at specific index', () => {
        const answersStore = FirstTimeAnswersStore()

        expect(answersStore.userResponses).toEqual([])
        answersStore.setUserAnswer(0, 'First answer')
        expect(answersStore.userResponses).toEqual(['First answer'])
        answersStore.setUserAnswer(1, 'Second answer')
        expect(answersStore.userResponses).toEqual(['First answer', 'Second answer'])
    })
})
