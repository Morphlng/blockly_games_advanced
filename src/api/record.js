import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const list = {
    // 加载关卡进度
    load(params) {
        return axios.post(`/record/load`, qs.stringify(params));
    },
    // 保存关卡进度
    save(params) {
        return axios.post(`/record/save`, qs.stringify(params));
    }
}

export default list;