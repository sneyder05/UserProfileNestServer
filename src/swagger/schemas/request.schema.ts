import { GenericObject, } from 'types/generic'
import { IRequestResponse, } from 'types/request'
import { StatusCodes, } from 'http-status-codes'

const SwaggerRequestSchema = {
  successs: (statusCode?: number, data?: GenericObject): IRequestResponse<GenericObject> => {
    return {
      statusCode: statusCode || StatusCodes.OK,
      data: data || {},
      message: 'Success',
    }
  },
  error: (statusCode?: number): IRequestResponse<GenericObject> => {
    return {
      statusCode: statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'An error explanation',
      error: 'Error type',
    }
  },
}

export default SwaggerRequestSchema