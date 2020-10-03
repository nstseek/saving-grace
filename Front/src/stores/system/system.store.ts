import SystemActionTypes from './system.action-types';
import { Reducer } from '../../utils/reduxTypes';

export enum LoadingState {
  Loading = 0,
  Success,
  Failed
}

export interface ModalWarning {
  title: string;
  text: string;
  type?: 'error' | 'warning' | 'success';
}

export interface SystemState {
  loading: LoadingState;
  warning?: ModalWarning;
}

const initialState: SystemState = {
  loading: LoadingState.Success,
  warning: null
};

const reducer: Reducer<SystemState, SystemActionTypes> = (
  state = { ...initialState },
  action: { type: SystemActionTypes; payload: Partial<SystemState> }
): SystemState => {
  switch (action.type) {
    case SystemActionTypes.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };
    case SystemActionTypes.UPDATE_WARNING:
      return {
        ...state,
        warning: action.payload.warning
      };
    case SystemActionTypes.CLEAR_LOADING:
      return {
        ...state,
        loading: initialState.loading
      };
    case SystemActionTypes.CLEAR_WARNING:
      return {
        ...state,
        warning: initialState.warning
      };
    default:
      return state;
  }
};

export default reducer;
