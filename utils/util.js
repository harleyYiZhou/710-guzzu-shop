// const API_PREFIX = 'https://mp-dev.guzzu.cn/mpapi/2/';
// const API_PREFIX = 'http://192.168.31.253:4020/mpapi/2/';
const API_PREFIX = 'https://mp.guzzu.cn/mpapi/2/';

function checkLogin () {
	console.log(1);
	if (!wx.getStorageSync('gsid')) {
		console.log(1);
		wx.navigateTo({
			url: '../login-again/login-again'
		});
	}
}

function callApi (url, params) {
	var gsid = wx.getStorageSync('gsid');
	return new Promise((resolve, reject) => {
		wx.request({
			url: `${API_PREFIX + url}`,
			data: params,
			header: {
				'x-guzzu-sessionid': gsid
			},
			method: 'POST',
			success: function(res) {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail (err) {
				reject(err);
			}
		});
	});
}

function formatNumber (n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
function formatTime (date, format) {
	var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
	var returnArr = [];

	returnArr.push(date.getFullYear());
	returnArr.push(formatNumber(date.getMonth() + 1));
	returnArr.push(formatNumber(date.getDate()));

	returnArr.push(formatNumber(date.getHours()));
	returnArr.push(formatNumber(date.getMinutes()));
	returnArr.push(formatNumber(date.getSeconds()));

	for (var i in returnArr) {
		format = format.replace(formateArr[i], returnArr[i]);
	}
	return format;
}

module.exports = {
	formatTime: formatTime,
	checkLogin: checkLogin,
	callApi: callApi
};
