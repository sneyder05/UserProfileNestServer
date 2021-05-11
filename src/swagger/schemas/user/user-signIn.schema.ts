import SwaggerRequestSchema from '../request.schema'

const UserSignInSwaggerSchema = SwaggerRequestSchema.successs(null, {
  token_type: 'Bearer',
  access_token: 'JWT Token',
})

export default UserSignInSwaggerSchema