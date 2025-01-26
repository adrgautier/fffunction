import { CHECKED_SYMBOL } from './constant';

export class Checked<TReturnType> {
  private [CHECKED_SYMBOL]: TReturnType;

  constructor(returnedValue: TReturnType) {
    this[CHECKED_SYMBOL] = returnedValue;
  }

  get() {
    return this[CHECKED_SYMBOL];
  }
}
