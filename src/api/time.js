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
function removenotpassed(arr){
    let result = [];
    for (let i in arr){
        let row = arr[i];
        let time;
        if (row.passed===true){
            time = row.time
        }
        else{
            time = "99:99:99:99"
        }
        let item = {
            user: row.user,
            time: time,
            passed:row.passed
        };
        result.push(item);
    }
    return result;
}
function tableformat2(arr) {
    let result = [];
    for (var i = 0; i < arr.length; i++) {
        let row = arr[i];
        let item = {
            rank: i + 1,
            user: row.user.split("@")[0],
            time: row.time,
            passed:row.passed
        };
        result.push(item);
    }
    return result;
}

const list = {
    async gettotal(){
        let data;
        await axios.get("/time/total").then((res) => {
            data = res.data;
        });
        let result = data.result;
        result = removenotpassed(result);
        result = bubbleSort(result);
        result = tableformat2(result);
        return result;
    },
    async getchapter(chapte){
        let params = { chapter: chapte };
        let data;
        await axios.post("/time/chapter", qs.stringify(params)).then((res) => {
            data = res.data;
        });
        let result = data.result;
        result = removenotpassed(result);
        result = bubbleSort(result);
        result = tableformat2(result);
        return result;
    },
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
        return axios.post("/time/save", qs.stringify(params));
    },
};

export default list;
