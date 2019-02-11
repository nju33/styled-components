import styled, {css} from 'styled-components';
import {Mixin, createMedia} from './helpers';

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

test('createMedia', () => {
  const media = createMedia<{
    desktop: number;
    tablet: number;
    phone: number;
  }>({
    desktop: 992,
    tablet: 768,
    phone: 576,
  });

  const div = styled.div`
    ${media.desktop`
      color: #fff;
    `};
    ${media.tablet`
      color: #888;
    `};
  `;

  const style = (div as any).componentStyle.rules.join('');
  expect(style).toMatch('min-width: 992px');
  expect(style).toMatch('min-width: 768px');
});
