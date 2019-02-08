import styled, {css} from 'styled-components';
import {Mixin} from './helpers';

test('types', () => {
  const foo = 'foo' as 'foo';
  const bar = 'bar' as 'bar';

  type CurrentComponentMixin = Mixin<typeof foo | typeof bar>;

  const mixin: CurrentComponentMixin = (mixinName => (
    first,
    ...interpolations
  ) => css`
    &.${mixinName} {
      ${css(first, ...interpolations)}
    }
  `) as CurrentComponentMixin;

  mixin[foo] = mixin(foo)`
    font-size: 15px;
  `;

  mixin[bar] = mixin(bar)`
    font-size: 13;
  `;

  // tslint:disable-next-line:no-unused-expression
  styled.div`
    ${mixin.foo};
    ${mixin.bar};
  `;

  expect(1).toBe(1);
});
