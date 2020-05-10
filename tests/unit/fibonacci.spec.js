import { shallowMount } from '@vue/test-utils'
import Fibonaccier from '@/components/Fibonaccier.vue'

describe('Fibonaccier.vue', () => {
  it('calculated fibonacci number', () => {
    const wrapper = shallowMount(Fibonaccier, {stubs: ['router-link']})
    expect(wrapper.vm.fibonacci(0)).toBe(1);
    expect(wrapper.vm.fibonacci(1)).toBe(1);
    expect(wrapper.vm.fibonacci(6)).toBe(13);
    expect(wrapper.vm.fibonacci(8)).toBe(34);
  })
})
