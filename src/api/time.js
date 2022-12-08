import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const list = {
    // 保存关卡进度
    save(params) {
        console.log(params)
        return axios.post(`/time/save`, qs.stringify(params));
    }
}

export default list;