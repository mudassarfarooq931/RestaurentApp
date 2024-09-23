import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createAction,
} from '@reduxjs/toolkit';

export const PENDING = 'PENDING';
export const FULFILLED = 'FULFILLED';
export const REJECTED = 'REJECTED';

export interface LoadingState {
  loading: boolean;
  error: Error | null;
}

export interface LoadingActions<ActionState> {
  pending: ActionCreatorWithoutPayload;
  fulfilled: ActionCreatorWithPayload<ActionState, string>;
  rejected: ActionCreatorWithPayload<Error, string>;
}

export const createLoadingActions = <ActionState>(prefix: string) => {
  return {
    pending: createAction(`${prefix}/${PENDING}`),
    fulfilled: createAction(`${prefix}/${FULFILLED}`),
    rejected: createAction(`${prefix}/${REJECTED}`),
  } as LoadingActions<ActionState>;
};
