// 定义请求参数
const url = 'https://api.jihujiasuqi.com/api/wechat.php';
const userId = '2671320';
const params = [{
    mode: 'video_ad_test',
    puid: userId,
    wechatid: '1',
}, {
    mode: 'video_ad',
    puid: userId,
}
];

// 将参数转换为查询字符串
const query = [
    new URLSearchParams(params[0]).toString(),
    new URLSearchParams(params[1]).toString()
];

// 构建完整请求 URL
const requestUrl_ad_test = `${url}?${query[0]}`;
const requestUrl_ad = `${url}?${query[1]}`;

// 设置请求头信息
const headers = {
    'Host': 'api.jihujiasuqi.com',
    'Connection': 'keep-alive',
    'Charset': 'utf-8', // 注意将 'charset' 改为 'Charset' 以符合标准 HTTP 头部字段名称
    'User-Agent': 'Mozilla/5.0 (Linux; Android 13; 23013RK75C Build/TKQ1.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160117 MMWEBSDK/20231002 MMWEBID/2416 MicroMessenger/8.0.43.2480(0x28002B35) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip,compress,br,deflate',
    'Referer': 'https://servicewechat.com/wx1f23b1b150122281/4/page-frame.html',
};

// 使用 fetch 发起 GET 请求
function funData(requestUrl_ad_test, headers = {}) {
    return fetch(requestUrl_ad_test, {
        method: 'GET',
        headers,
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // 如果服务器返回 JSON 数据，则解析为 JSON 对象
    }).then(data => {
        return data;
    }).catch(error => {
        throw error;
    })
}

async function checkSuccessMessage() {
    let success_msg = "";
    const checkMessage = (msg) => {
        return msg === "您的时长大于4小时,请少于4小时再来！";
    };

    while (!checkMessage(success_msg)) {
        try {
            const data = await funData(requestUrl_ad_test, headers);
            // 成功获取数据后的处理逻辑
            if (data["debug_msg"] === "可以看广告") {
                const msg = await funData(requestUrl_ad, headers);
                console.log(new Date().toString() + " INFO:" + msg["msg"]);
                success_msg = msg["msg"].trim();
            } else {
                console.log(new Date().toString(), ' WARNING:', data["msg"]);
                success_msg = data["msg"].trim();
            }
        } catch (error) {
            console.error("An error occurred:", error);
            break;
        }
    }
}

checkSuccessMessage();
