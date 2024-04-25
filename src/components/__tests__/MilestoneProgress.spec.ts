import { mount } from '@vue/test-utils'
import MilestoneProgress from '@/components/MilestonePath/MilestoneProgress.vue'
import { describe, it, expect } from 'vitest'

describe('ProgressBar.vue', () => {
  it('renders props.totalSaved and props.totalToSave when passed', () => {
    const totalSaved = 50
    const totalToSave = 100
    const wrapper = mount(MilestoneProgress, {
      props: { totalSaved, totalToSave }
    })

    expect(wrapper.text()).toMatch(`${totalSaved} / ${totalToSave} NOK`)
  })
})
