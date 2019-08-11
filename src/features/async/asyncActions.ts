import { AsyncActionType } from './asyncConstants';

// async start
export interface AsyncStartAction {
  type: AsyncActionType.Start;
}

export const startAsyncAction = (): AsyncStartAction => ({
  type: AsyncActionType.Start
});

// async finish
export interface AsyncFinishAction {
  type: AsyncActionType.Finish;
}

export const finishAsyncAction = (): AsyncFinishAction => ({
  type: AsyncActionType.Finish
});

// async error

export interface AsyncErrorAction {
  type: AsyncActionType.Error;
}

export const errorAsyncAction = (): AsyncErrorAction => ({
  type: AsyncActionType.Error
});

// async action
export type AsyncAction =
  | AsyncStartAction
  | AsyncFinishAction
  | AsyncErrorAction;
