import { Test, } from '@nestjs/testing'
import { AddressService, } from 'address/address.service'
import { AuthService, } from 'auth/auth.service'
import { ProfileService, } from 'profile/profile.service'
import { CreateUserDto, } from 'user/types/create-user.dto'
import { SignInUserDto, } from 'user/types/signIn-user.dto'
import { UserDto, } from 'user/types/user.dto'
import { UserController, } from 'user/user.controller'
import { UserService, } from 'user/user.service'
import JWT from '../mocks/jwt'
import MySQL2 from '../mocks/mysql2'

describe('[Controller] User', () => {
  // Vars
  let userController: UserController
  let userService: UserService

  // Mocked data
  const mockedSignInUser: SignInUserDto = { username: 'test', password: 'my-pwd', }
  const mockedUser: UserDto = {
    id: 1,
    username: 'test',
    password: 'my-pwd',
    name: 'Tester',
    cityId: 1,
    address: 'Address',
  }
  const mockedCreateUser: CreateUserDto = {
    username: 'test',
    password: 'my-pwd',
    address: 'Address',
    name: 'Tester',
    cityId: 1,
  }

  // Setup
  beforeEach(async () => {
    // Mock Auth module
    const authModule = await Test.createTestingModule({
      imports: [ JWT.register(), ],
      providers: [ AuthService, ],
    }).compile()

    const authService = authModule.get<AuthService>(AuthService)

    // Mock Profile module
    const profileModule = await Test.createTestingModule({
      providers: [
        MySQL2.simpleConnection(),
        ProfileService,
      ],
    }).compile()

    const profileService = profileModule.get<ProfileService>(ProfileService)

    // Mock Address module
    const addressModule = await Test.createTestingModule({
      providers: [
        MySQL2.simpleConnection(),
        AddressService,
      ],
    }).compile()

    const addressService = addressModule.get<AddressService>(AddressService)

    // Mock User module
    const userModule = await Test.createTestingModule({
      controllers: [ UserController, ],
      providers: [
        MySQL2.simpleConnection(),
        { provide: 'AuthService', useValue: authService, },
        { provide: 'ProfileService', useValue: profileService, },
        { provide: 'AddressService', useValue: addressService, },
        UserService,
      ],
    }).compile()

    userController = userModule.get<UserController>(UserController)
    userService = userModule.get<UserService>(UserService)
  })

  it('Sign In', async () => {
    const userServiceSignInMock = jest.spyOn(userService, 'signIn').mockImplementation(() => Promise.resolve(mockedUser))

    const jwtToken = await userController.signIn(mockedSignInUser)

    expect(jwtToken).toBeTruthy()
    expect(userServiceSignInMock).toBeCalledWith(mockedSignInUser)
    expect(jwtToken).toHaveProperty('token_type')
    expect(jwtToken.token_type).toBeTruthy()
    expect(jwtToken).toHaveProperty('access_token')
    expect(jwtToken.access_token).toBeTruthy()
  })

  it('Create', async () => {
    const mockedUserId = 1
    const userServiceCreateMock = jest.spyOn(userService, 'create').mockImplementation(() => Promise.resolve(mockedUserId))

    const user = await userController.create(mockedCreateUser)

    const expectedUser: UserDto = {
      ...user,
      id: mockedUserId,
    }

    expect(user).toBeTruthy()
    expect(userServiceCreateMock).toHaveBeenCalledWith(mockedCreateUser)
    expect(user).toStrictEqual(expectedUser)
  })
})