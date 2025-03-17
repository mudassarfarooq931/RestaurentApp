import {User} from '@domain-models';
import {UserDto} from '@dto-models';
import {DomainMapper} from './domain-mapper';

export class UserDtoMapper extends DomainMapper<UserDto, User> {
  mapToDomainModel = (model: UserDto): User => {
    const firstName = this.domainSafeValue(model.firstName);
    const lastName = this.domainSafeValue(model.lastName);
    const fullName =
      firstName && lastName
        ? firstName + ' ' + lastName
        : firstName
        ? firstName
        : lastName;

    return {
      id: this.domainSafeValue(model.id),
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      email: this.domainSafeValue(model.email),
      roleId: this.domainSafeValue(model.roleId),
      roleName: this.domainSafeValue(model.roleName),
      city: this.domainSafeValue(model.city),
      area: this.domainSafeValue(model.area),
      address: this.domainSafeValue(model.address),
      authType: this.domainSafeValue(model.authType),
      mobile: this.domainSafeValue(model.mobile),
    };
  };

  mapToDomainList = (modelList?: Array<UserDto>): Array<User> =>
    modelList?.map(item => this.mapToDomainModel(item)) ?? new Array();
}
