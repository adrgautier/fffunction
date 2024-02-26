# ![fffunction](./fffuntion.png)
 ![typescript](https://img.shields.io/badge/written%20for-typescript-3178c6?style=flat-square) [![codecov](https://img.shields.io/codecov/c/github/adrgautier/fffunction?style=flat-square&token=IPTGBDRRJE)](https://codecov.io/gh/adrgautier/fffunction) ![prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4?style=flat-square) [![npm](https://img.shields.io/npm/v/fffunction?style=flat-square)](https://www.npmjs.com/package/fffunction)

**fffunction** is a tool which simplifies **polymorphic** functions declaration and adds **type constraints** to the implemention function.

> This module is experimental: use it at you own risk. 

## Motivation

It starts from an observation : it is not possible in TypeScript (using native tools) to declare polymorphic functions while ensuring consistency of implementation.

This module tries to adresses this problem, while keeping a simple API.

## Quick example

Here is an example of a function which return either a random `number` or a random `string` according to its input value:

```ts
const random = fffunction
    /* first declaration */
    .f<"number", number>()
    /* second declaration */
    .f<"string", string>()
    /* implementation */
    .f(({ input, output }) => {
      if (input === "number") {
        return output(Math.random());
      }
      return output(uuid.v4());
    });
```

If the string `"number"` is provided, a random number will be returned.

```ts
console.log(random("number")); // 0.024689827372012196
```

If the string `"string"` is provided, an uuid will be returned.
```ts
console.log(random("string")); // 425dd1a0-cfc0-4eac-a2d7-486860d9bdd4
```

## API 

### Signature declaration

Declaring a function signature is done by calling the f() method with no argument and using the generic arguments as follow:

```ts
fffunction
   .f<InputType, OutputType>()
```

Signature declarations are queued like this:

```ts
fffunction
   .f<InputType1, OutputType1>()
   .f<InputType2, OutputType2>()
```

#### Input overlapping

Input types can overlap each others, however the more specific input types must be declared first:

```ts
fffunction
   .f<{ id: number, name: string }, A>()
   .f<{ id: number }, B>()
```

**fffunction** prevents declaring signatures in the wrong order:

```ts
fffunction
   .f<{ id: number }, B>() 
   .f<{ id: number, name: string }, A>() // Type 'A' does not satisfy the constraint 'never'. - ts(2344)
```

Literals cannot overlap each others:
```ts
fffunction
   .f<true, B>() 
   .f<boolean, A>() // Type 'A' does not satisfy the constraint 'never'. - ts(2344)
```


## Troubleshoot

### ts(2344)

> `Type '...' does not satisfy the constraint 'never'.``

That means input of two signature are conflicting. See the **input overlapping** section above.
