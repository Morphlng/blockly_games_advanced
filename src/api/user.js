/**
 * article模块接口列表
 */

import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const list = {
    // 注册
    register(params) {
        return axios.post(`/users/register`, qs.stringify(params))
    },
    // 登录
    login(params) {
        return axios.post(`/users/login`, qs.stringify(params))
    },
    // 查询某一用户
    findUser(params) {
        return axios.post('/users/find', qs.stringify(params));
    }
}

export default list;