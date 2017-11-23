// export const api = token => ({
//   get: (url, options={headers: {}}) => {
//     options.mode = 'cors'
//     options.headers.Authorization = token
//     return fetch(url, options)
//   }
// })

const base_url_plays = 'https://stable-jukebox-analytic.scaffold-workers-test-us.dev.cld.touchtunes.com/v2/operators/100/jukeboxes/plays/detail?startDate=2017-11-01T10%3A54%3A15&endDate=2017-11-14T16%3A54%3A27'
export const getPlays = fetch(`${base_url_plays}`, {
  method: 'GET',    
  headers: {
    'Authorization': 'bearer ' + 'e82b0533-cbae-475f-af00-fdb4bfcb0b3c'
  }
})


 