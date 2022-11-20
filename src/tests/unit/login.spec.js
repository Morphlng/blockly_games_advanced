/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/login'
import VueRouter from 'vue-router'

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(VueRouter);

describe('login.vue', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Login, {
            localVue,
            stubs: ['loading']
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    // 测试内容：snapshot->概括的测试DOM结构
    // 如果组件内存在比较特殊的需要测试的DOM结构的话，可以单独测试（详见AppButton测试文件末尾）
    it('snapshot test', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
})