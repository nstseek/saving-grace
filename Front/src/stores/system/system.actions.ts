import { ActionData } from '../../utils/reduxTypes';
import SystemActionTypes from './system.action-types';
import { SystemState, LoadingState, ModalWarning } from './system.store';

const defaultActionCreator = (
  type?: any,
  payload?: any
): ActionData<SystemActionTypes, Partial<SystemState>> => ({ type, payload });

interface UpdateLoading {
  (type: SystemActionTypes.CLEAR_LOADING): ActionData<
    SystemActionTypes,
    Partial<SystemState>
  >;
  (
    type: SystemActionTypes.UPDATE_LOADING,
    payload: { loading: LoadingState }
  ): ActionData<SystemActionTypes, Partial<SystemState>>;
}

interface UpdateWarning {
  (type: SystemActionTypes.CLEAR_WARNING): ActionData<
    SystemActionTypes,
    Partial<SystemState>
  >;
  (
    type: SystemActionTypes.UPDATE_WARNING,
    payload: { warning: ModalWarning }
  ): ActionData<SystemActionTypes, Partial<SystemState>>;
}

/**
 * Uses an `Action Creator` to build an `Action` ready to be dispatched
 *
 * This `Action` changes the status on `StageStore` using the `Action Type`, not needing a payload
 *
 * @param type One of the available `Action Types` to be interpreted by the `Reducer`
 *
 * @returns An `Action` ready to be dispatched
 */
export const updateLoading: UpdateLoading = defaultActionCreator;

export const updateWarning: UpdateWarning = defaultActionCreator;
