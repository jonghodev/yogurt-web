import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { UserState } from './types';
import { RootState, AsyncStatus } from '../types';
import { getUser, getStudio } from '@/util/storage';

export const state: UserState = {
  user: getUser(),
  studio: getStudio(),
  users: {
    data: null,
    status: AsyncStatus.INIT,
  },
  userDetail: null,
};

const namespaced = true;

const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default user;
