import { Provider, } from '@nestjs/common'

const MySQL2 = {
  simpleConnection: (): Provider => ({
    provide: 'NEST_MYSQL2_CONNECTION',
    useFactory: () => ({}),
  }),
}

export default MySQL2