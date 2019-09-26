import BootstrapVue from 'bootstrap-vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import FallbackImage from '@/components/utils/FallbackImage';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.spyOn(FallbackImage, 'mounted');

describe('utils/FallbackImage.vue', () => {
	it('FallbackImage component loaded', () => {
		const wrapper = shallowMount(FallbackImage, {
			stubs: { BImg: true },
		});

		wrapper.setData({ imageFound: true });

		expect(wrapper.name()).toBe('ImageFallback');
		expect(wrapper).toMatchSnapshot();
	});

	it('should display an image when "imageFound"', () => {
		const wrapper = shallowMount(FallbackImage, {
			stubs: { BImg: true },
		});

		wrapper.setData({ imageFound: true });

		localVue.nextTick(() => {
			expect(wrapper.findAll('bimg-stub').isVisible()).toBe(true);
			expect(wrapper.findAll('i').exists()).toBe(false);
		});
	});

	it('should display an icon when not "imageFound"', () => {
		const wrapper = shallowMount(FallbackImage);

		wrapper.setData({ imageFound: false });

		localVue.nextTick(() => {
			expect(wrapper.findAll('i.text-dark').isVisible()).toBe(true);
			expect(wrapper.find('img').exists()).toBe(false);
		});
	});
});
