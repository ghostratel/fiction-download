import axios from 'axios'
const baseURL = 'http://localhost:9527'

axios.interceptors.response.use(function (response) {
	return response.data.code === 1 ? response.data : new Error('request error')
}, function (error) {
	return Promise.reject(error);
});


export /**
 * 根据性别返回对应的小说分类，默认返回所有分类
 *
 * @param {String} sex boy girl
 * @returns Promise
 */
const getCategories = (sex) => {
	return axios.get(baseURL + '/novel/categories' + (sex ? '?sex=' + sex : ''))
}


export /**
 * 根据小说分类获取小说
 *
 * @param {String} category
 * @param {number} [startPage=0]
 * @returns Promise
 */
const getNovelsByCategory = (category, startPage = 0) => {
	return axios.get(baseURL + '/novel/booklist/' + category + '?page=' + startPage)
}
