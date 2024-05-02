import { shallowMount } from '@vue/test-utils';
import InfoComponent from '@/components/InfoComponent.vue';
import { describe, it, expect } from 'vitest';

describe('InfoComponent', () => {
  it('renders the correct quote and total savings', async () => {
    const wrapper = shallowMount(InfoComponent);

    // Simulate asynchronous data loading by waiting for the component to be mounted
    await wrapper.vm.$nextTick();

    const quote = wrapper.find('#Quote');
    const totalSavings = wrapper.find('#TotalSavings');

    expect(quote.text()).toBe('Velkommen til Sparesti! Sparesti er en applikasjon for å hjelp deg med å spare penger' +
      ' mot dine drømmer ved hjelp av en rekke spesialtilpassede utfordinger basert på ditt forbruk! Kan du hjelpe' +
      ' sparegrisen ned stien mot de store målene?');

    // Assuming totalSavings is a number, convert it to the expected string format for assertion
    const expectedTotalSavingsText = `Våre brukere har spart til sammen ${(wrapper.vm as any).totalSavings} nok`;
    expect(totalSavings.text()).toBe(expectedTotalSavingsText);
  });
});
