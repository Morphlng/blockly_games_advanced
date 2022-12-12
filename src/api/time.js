import axios from "./http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].time > arr[j + 1].time) {
                var temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function tableformat(arr) {
    let result = [];
    for (var i = 0; i < arr.length; i++) {
        let row = arr[i];
        let item = {
            rank: i + 1,
            user: row.user.split("@")[0],
            time: row.time,
        };
        result.push(item);
    }
    return result;
}

const list = {
    async get(level) {
        let lvltrim = level.split("&")[0];
        let params = { level: lvltrim };
        let ranks;
        await axios.post("/time/ranklist", qs.stringify(params)).then((res) => {
            let data = res.data;
            ranks = data.result;
            ranks = bubbleSort(ranks);
            ranks = tableformat(ranks);
        });
        return ranks;
    },
    save(params) {
        console.log(params);
        return axios.post("/time/save", qs.stringify(params));
    },
};

export default list;
