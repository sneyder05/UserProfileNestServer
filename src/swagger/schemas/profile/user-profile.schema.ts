import SwaggerRequestSchema from '../request.schema'
import { StatusCodes, } from 'http-status-codes'

const UserProfileSwaggerSchema = SwaggerRequestSchema.successs(StatusCodes.CREATED, {
  id: 7,
  name: 'User\'s name',
  address: {
      street: 'Street',
      city: 'City name',
      country: 'Country name',
  },
})

export default UserProfileSwaggerSchema