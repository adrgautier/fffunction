import { OUTPUT_SYMBOL } from './constant';

export class FFFOutput<TOutput> {
  private [OUTPUT_SYMBOL]: TOutput;

  constructor(output: TOutput) {
    this[OUTPUT_SYMBOL] = output;
  }
  get() {
    return this[OUTPUT_SYMBOL];
  }
}

export class FFFArgument<TInput extends unknown, TOutput extends unknown> {
  public input: TInput;
  public output = (output: TOutput) => new FFFOutput(output);

  constructor(input: TInput) {
    this.input = input;
  }
}
