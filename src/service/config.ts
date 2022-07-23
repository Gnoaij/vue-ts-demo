const devBaseURL = '/api'
const proBaseURL = 'http://152.136.185.210:4000'

const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

const TIME_OUT = 10000

export { BASE_URL, TIME_OUT }
