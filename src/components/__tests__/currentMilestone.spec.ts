import { setActivePinia, createPinia } from 'pinia'
import { useMilestoneStore} from '../../stores/currentMilestone'
import { describe, it, expect, beforeEach } from 'vitest'

describe('currentMilestoneStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Changes milestone id', () => {
    const milestoneStore = useMilestoneStore()
    expect(milestoneStore.milestoneId).toBe(0)
    milestoneStore.setMilestoneId(5)
    expect(milestoneStore.milestoneId).toBe(5)
  })
})