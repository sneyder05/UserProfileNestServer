import SwaggerRequestSchema from '../request.schema'
import { StatusCodes, } from 'http-status-codes'

const UserCreatedSwaggerSchema = SwaggerRequestSchema.successs(StatusCodes.CREATED, {
  username: 'Username',
  password: 'Password',
  name: 'Name',
  address: 'Address',
  cityId: 0,
  id: 0,
})

export default UserCreatedSwaggerSchema