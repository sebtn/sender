export const api = token => ({
  get: (url, options={headers: {}}) => {
    options.mode = 'cors'
    options.headers.Authorization = token
    return fetch(url, options)
  }
})
