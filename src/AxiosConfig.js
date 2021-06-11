

//cau hinh axios
const instance = require('axios').default;
instance.interceptors.request.use(async function (config) {
    // Do something before request is sent
    var token = localStorage.getItem("token");
    if (token != null) {
        instance.defaults.headers['Authorization'] = localStorage.getItem("token");
    };
    console.log(config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
instance.interceptors.response.use((response) => {
    return response
}, async error => {
    var user = localStorage.getItem("token");
    if (error.response != null && error.response.status == 401 && user != null) {
        localStorage.removeItem("token");
        alert('Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại')
        window.location.pathname = '';
    } else {
        return Promise.reject(error)
    }
    return Promise.reject(error)
})

export default instance
