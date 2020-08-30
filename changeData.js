function changeData(restaurant, requestBody) {
  if (requestBody.name) {
    restaurant.name = requestBody.name
  } else {
    restaurant.name = restaurant.name
  }

  checkData(restaurant.category, requestBody.category)
  checkData(restaurant.image, requestBody.image)
  checkData(restaurant.location, requestBody.location)
  checkData(restaurant.phone, requestBody.phone)
  checkData(restaurant.rating, requestBody.rating)
  checkData(restaurant.description, requestBody.description)

}

function checkData(restaurant, requestBody) {
  if (requestBody) {
    restaurant = requestBody
  } else if (restaurant) {
    restaurant = restaurant
  } else {
    restaurant = ''
  }
}

module.exports = changeData