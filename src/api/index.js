/** 
 * api接口的统一出口
 */
// 文章模块接口
import list from './list';
import user from './user';
import record from './record';
import time from './time';
// 其他模块的接口……

// 导出接口
export default {
    list,
    user,
    record,
    time
    // ……
}