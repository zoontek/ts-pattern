import { match, __ } from '../src';
import { Equal, Expect } from '../src/types/helpers';
import { State } from './types-catalog/utils';

describe('output type', () => {
  describe('exhaustive', () => {
    it('should return a single type if they are all compatible', () => {
      const f = (input: number) =>
        match(input)
          .with(1, () => 'ok')
          .with(2, () => 'test')
          .with(__, () => 'hello')
          .exhaustive();

      type o1 = Expect<Equal<ReturnType<typeof f>, string>>;

      const f2 = (input: number) =>
        match(input)
          .with(1, () => ({ x: 'ok' }))
          .with(2, () => ({ x: 'test' }))
          .with(__, () => ({ x: 'hello' }))
          .exhaustive();

      type o2 = Expect<Equal<ReturnType<typeof f2>, { x: string }>>;

      const f3 = (input: number) =>
        match(input)
          .with(1, () => [1, 2, null])
          .with(3, () => [1, 2])
          .with(__, () => [null, null])
          .exhaustive();

      type o3 = Expect<Equal<ReturnType<typeof f3>, (number | null)[]>>;
    });

    it('if the current inferred output is assignable to the new output, just pick the broader one', () => {
      const f1 = (input: number) =>
        match(input)
          .with(1, () => [1, 2])
          .with(__, () => [1, 2, null])
          .exhaustive();

      type o1 = Expect<Equal<ReturnType<typeof f1>, (number | null)[]>>;
    });

    it('It should still be possible specify a precise output type', () => {
      const f1 = (input: number) =>
        match<number, State>(input)
          .with(__, () => ({ status: 'idle' }))
          // @ts-expect-error
          .with(1, () => [1, 2])
          // @ts-expect-error
          .with(__, () => [1, 2, null])
          .exhaustive();

      type o1 = Expect<Equal<ReturnType<typeof f1>, State>>;
    });
  });

  describe('run', () => {
    it('should return a single type if they are all compatible', () => {
      const f = (input: number) =>
        match(input)
          .with(1, () => 'ok')
          .with(2, () => 'test')
          .with(__, () => 'hello')
          .run();

      type o1 = Expect<Equal<ReturnType<typeof f>, string>>;

      const f2 = (input: number) =>
        match(input)
          .with(1, () => ({ x: 'ok' }))
          .with(2, () => ({ x: 'test' }))
          .with(__, () => ({ x: 'hello' }))
          .run();

      type o2 = Expect<Equal<ReturnType<typeof f2>, { x: string }>>;

      const f3 = (input: number) =>
        match(input)
          .with(1, () => [1, 2, null])
          .with(3, () => [1, 2])
          .with(__, () => [null, null])
          .run();

      type o3 = Expect<Equal<ReturnType<typeof f3>, (number | null)[]>>;
    });

    it('if the current inferred output is assignable to the new output, just pick the broader one', () => {
      const f1 = (input: number) =>
        match(input)
          .with(1, () => [1, 2])
          .with(__, () => [1, 2, null])
          .run();

      type o1 = Expect<Equal<ReturnType<typeof f1>, (number | null)[]>>;
    });

    it('It should still be possible specify a precise output type', () => {
      const f1 = (input: number) =>
        match<number, State>(input)
          .with(__, () => ({ status: 'idle' }))
          // @ts-expect-error
          .with(1, () => [1, 2])
          // @ts-expect-error
          .with(__, () => [1, 2, null])
          .run();

      type o1 = Expect<Equal<ReturnType<typeof f1>, State>>;
    });
  });

  describe('otherwise', () => {
    it('should return a single type if they are all compatible', () => {
      const f = (input: number) =>
        match(input)
          .with(1, () => 'ok')
          .with(2, () => 'test')
          .with(__, () => 'hello')
          .otherwise(() => '');

      type o1 = Expect<Equal<ReturnType<typeof f>, string>>;

      const f2 = (input: number) =>
        match(input)
          .with(1, () => ({ x: 'ok' }))
          .with(2, () => ({ x: 'test' }))
          .with(__, () => ({ x: 'hello' }))
          .otherwise(() => ({ x: '' }));

      type o2 = Expect<Equal<ReturnType<typeof f2>, { x: string }>>;

      const f3 = (input: number) =>
        match(input)
          .with(1, () => [1, 2, null])
          .with(3, () => [1, 2])
          .with(__, () => [null, null])
          .otherwise(() => [0]);

      type o3 = Expect<Equal<ReturnType<typeof f3>, (number | null)[]>>;
    });

    it('if the current inferred output is assignable to the new output, just pick the broader one', () => {
      const f1 = (input: number) =>
        match(input)
          .with(1, () => [1, 2])
          .with(__, () => [1, 2, null])
          .otherwise(() => [0]);

      type o1 = Expect<Equal<ReturnType<typeof f1>, (number | null)[]>>;
    });

    it('It should still be possible specify a precise output type', () => {
      const f1 = (input: number) =>
        match<number, State>(input)
          .with(__, () => ({ status: 'idle' }))
          // @ts-expect-error
          .with(1, () => [1, 2])
          // @ts-expect-error
          .with(__, () => [1, 2, null])
          .otherwise(() => ({ status: 'idle' }));

      type o1 = Expect<Equal<ReturnType<typeof f1>, State>>;
    });
  });
});
