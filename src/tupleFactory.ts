import { Checked } from './classes';
import {
  AnySignature,
  InferAcceptedArgs,
  InferImplementationTuple,
} from './types';

export const tupleFactory = <TSignatures extends AnySignature[]>(
  ...args: InferAcceptedArgs<TSignatures>
) =>
  [
    returnedValue => new Checked(returnedValue),
    ...args,
  ] as InferImplementationTuple<TSignatures>;
