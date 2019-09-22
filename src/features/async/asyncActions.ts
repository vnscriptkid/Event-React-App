import { AsyncActionType } from './asyncConstants';

// async action payload
export interface AsyncActionPayload {
  actionName: string;
  actionId?: string;
}

// async start
export interface AsyncStartAction {
  type: AsyncActionType.Start;
  payload: AsyncActionPayload;
}

export const startAsyncAction = (
  payload: AsyncActionPayload
): AsyncStartAction => ({
  type: AsyncActionType.Start,
  payload
});

// async finish
export interface AsyncFinishAction {
  type: AsyncActionType.Finish;
  payload: AsyncActionPayload;
}

export const finishAsyncAction = (
  payload: AsyncActionPayload
): AsyncFinishAction => ({
  type: AsyncActionType.Finish,
  payload
});

// async error

export interface AsyncErrorAction {
  type: AsyncActionType.Error;
  payload: AsyncActionPayload;
}

export const errorAsyncAction = (
  payload: AsyncActionPayload
): AsyncErrorAction => ({
  type: AsyncActionType.Error,
  payload
});

// async action
export type AsyncAction =
  | AsyncStartAction
  | AsyncFinishAction
  | AsyncErrorAction;
