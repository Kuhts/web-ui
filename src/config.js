
const SITE_KEY = 'characterastronomy'
const SITE_NAME = 'Character Astronomy'
const PROD_KEY = 'production'
const {
  NODE_ENV = PROD_KEY,
} = process.env
const PRODUCTION = NODE_ENV === PROD_KEY
const API_URL = PRODUCTION
  ? 'https://react-auth-twitter.herokuapp.com'
  : 'https://localhost:8080'

const PROVIDERS = [
  {
    provider: 'google',
    name: 'Google',
  },
  {
    provider: 'facebook',
    name: 'Facebook',
  },
  {
    provider: 'twitter',
    name: 'Twitter',
    disabled: true,
  },
  {
    provider: 'github',
    name: 'Github',
  },
  {
    provider: 'medium',
    name: 'Medium',
    post: true,
    disabled: true,
  },
  {
    provider: 'reddit',
    name: 'Reddit',
  }
]

export {
  PRODUCTION,
  SITE_NAME,
  NODE_ENV,
  API_URL,
  PROVIDERS,
  SITE_KEY,
}
