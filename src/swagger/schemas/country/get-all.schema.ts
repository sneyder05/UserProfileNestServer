import SwaggerRequestSchema from '../request.schema'
import { StatusCodes, } from 'http-status-codes'

const GetAllCountriesSwaggerSchema = SwaggerRequestSchema.successs(StatusCodes.OK, [
  { id: 1, name: 'Andorra', },
  { id: 10, name: 'Argentina', },
])

export default GetAllCountriesSwaggerSchema