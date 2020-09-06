import { ActionTree } from 'vuex';
import { StudioState } from './types';
import { getStudiosApi, saveStudioApi } from '@/api/studio';
import { RootState } from '../types';

const actions: ActionTree<StudioState, RootState> = {
  async getStudios({ commit }) {
    try {
      const { data } = await getStudiosApi();

      commit('saveStudios', data.data);
    } catch (err) {
      throw err;
    }
  },
  async saveStudio(none, payload) {
    try {
      await saveStudioApi(payload);
    } catch (err) {
      throw err;
    }
  },
};

export default actions;
