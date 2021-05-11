import { ApiResponseOptions, } from '@nestjs/swagger'
import { GenericObject, } from 'src/types/generic'

const SwaggerLiteApiResponse = (httpCode: number, description: string, example?: GenericObject): ApiResponseOptions => {
  const schema: GenericObject = {}

  if (example) {
    schema.example = example
  }

  const options: GenericObject = {
    status: httpCode,
    description,
  }

  if (Object.keys(schema).length) {
    options.schema = schema
  }

  return options
}

export default SwaggerLiteApiResponse