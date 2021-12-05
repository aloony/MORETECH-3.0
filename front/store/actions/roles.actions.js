import { createActionFactory } from '../../common/store/helpers';

const factory = createActionFactory('ROLES');

export const getUserOwnRoles = factory.create('GET_USER_OWN_ROLES');
export const getUserOwnRolesAsync = factory.createAsync('GET_USER_OWN_ROLES_ASYNC');

export const createRole = factory.create('CREATE_ROLE');
export const createRoleAsync = factory.createAsync('CREATE_ROLE_ASYNC');

export const editRole = factory.create('EDIT_ROLE');
export const editRoleAsync = factory.createAsync('EDIT_ROLE_ASYNC');

export const deleteRole = factory.create('DELETE_ROLE');
export const deleteRoleAsync = factory.createAsync('DELETE_ROLE_ASYNC');

export const clearAllRolesError = factory.create('CLEAR_ALL_ERRORS');
export const clearAllRolesErrorAsync = factory.createAsync('CLEAR_ALL_ERRORS_ASYNC');