import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /**@type {import('./models/Posts.js').Post[]} */
  posts: [],
  likeIds: [],
  currentPage: 0,
  totalPages: 0,
  postQuery: '',
  /**@type {import ('./models/Account.js').Account} */
  activeProfile: null,
  /**@type {import('./models/Ads.js').Ad[]} */
  ads: []
})

