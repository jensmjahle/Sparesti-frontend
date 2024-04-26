import { shallowMount } from '@vue/test-utils';
import InfoComponent from '@/components/InfoComponent.vue'
import { describe, it, expect } from 'vitest'

//Needs to be updated when the info component gets dynamic data instead of static data
describe('InfoComponent', () => {
  it('renders the correct quote and total savings', () => {
    const wrapper = shallowMount(InfoComponent);

    const quote = wrapper.find('#Quote');
    const totalSavings = wrapper.find('#TotalSavings');

    expect(quote.text()).toBe('Sparetips: Sett av et jevnt beløp hver måned på sparekonto eller lignende.');

    expect(totalSavings.text()).toBe('Våre brukere har spart til sammen 5000 nok');
  });
});
