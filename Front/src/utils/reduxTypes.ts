export interface ActionData<T, U = any> {
  payload?: U;
  type: T;
}

export type Reducer<StoreType, ActionTypes> = (
  state: StoreType,
  actionData: ActionData<ActionTypes>
) => StoreType;
