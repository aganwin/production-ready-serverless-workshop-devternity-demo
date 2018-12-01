let initialized = false

const init = async () => {
  if (initialized) {
    return
  }

  process.env.restaurants_api   = "https://cpln6fx8ka.execute-api.us-west-2.amazonaws.com/dev/restaurants"
  process.env.restaurants_table = "restaurants-dev-aganwin"
  process.env.AWS_REGION        = "us-west-2"
  
  initialized = true
}

module.exports = {
  init
}