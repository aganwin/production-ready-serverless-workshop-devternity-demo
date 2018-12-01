const APP_ROOT = '../../'
const _ = require('lodash')
const util = require('util')

const viaHandler = async (event, functionName) => {
  const handler = util.promisify(require(`${APP_ROOT}/functions/${functionName}`).handler)
  console.log(`invoking via handler function ${functionName}`)

  const context = {}
  const response = await handler(event, context)
  const contentType = _.get(response, 'headers.content-type', 'application/json');
  if (_.get(response, 'body') && contentType === 'application/json') {
    response.body = JSON.parse(response.body);
  }
  return response
}

const we_invoke_get_index = () => viaHandler({}, 'get-index')

const we_invoke_get_restaurants = () => viaHandler({}, 'get-restaurants')

const we_invoke_search_restaurants = theme => {
  let event = { 
    body: JSON.stringify({ theme })
  }
  return viaHandler(event, 'search-restaurants')
}

module.exports = {
  we_invoke_get_index,
  we_invoke_get_restaurants,
  we_invoke_search_restaurants
}