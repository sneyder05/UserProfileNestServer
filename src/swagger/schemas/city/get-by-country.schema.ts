import SwaggerRequestSchema from '../request.schema'
import { StatusCodes, } from 'http-status-codes'

const GetCitiesByCountrySwaggerSchema = SwaggerRequestSchema.successs(StatusCodes.OK, [
  { id: 94, name: 'Abra Pampa', },
  { id: 95, name: 'Abra Rica', },
])

export default GetCitiesByCountrySwaggerSchema