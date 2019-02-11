# @nju33/styled-components

[![github](https://badgen.net/badge//nju33,styled-components/000?icon=github&list=1)](https://github.com/nju33/styled-components)
[![npm:version](https://badgen.net/npm/v/@nju33/styled-components?icon=npm&label=)](https://www.npmjs.com/package/@nju33/styled-components)
[![typescript](https://badgen.net/badge/lang/typescript/0376c6?icon=npm)](https://www.typescriptlang.org/)
[![ci:status](https://badgen.net/circleci/github/nju33/nju33/styled-components)](https://circleci.com/gh/nju33/nju33/styled-components)
[![document:typedoc](https://badgen.net/badge/document/typedoc/9602ff)](https://docs--nju33/styled-components.netlify.com/)
[![license](https://badgen.net/npm/license/nju33/styled-components)](https://github.com/nju33/nju33/styled-components/blob/master/LICENSE)
[![code style:prettier](https://badgen.net/badge//prettier/ff69b3?label=code%20style)](https://github.com/prettier/prettier)

My styled-components helpers

## Usage

````js
/**
 * Before, To install this and styled-components
 * ```sh
 * yarn add @nju33/styled-components styled-components @types/styled-components
 * ```
 */
import {Mixin, RequiredAtomProps, createMedia} from '@nju33/styled-components';
````

## Example

```ts
const foo = 'foo' as 'foo';
const bar = 'bar' as 'bar';

type MixinName = typeof foo | typeof bar;
type CurrentComponentMixin = Mixin<MixinName>;

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
styled.div<RequiredAtomProps<MixinName>>`
  ${mixin.foo};
  ${mixin.bar};
`;
```

```ts
interface Sizes {
	desktop: number;
	tablet: number;
	phone: number;
}

const media = createMedia<Sizes>({
	desktop 992,
	tablet: 768,
	phone: 576
});

styled.div`
	color: blue;

	${media.desktop`
		color: orange;
	`};
`;
// color: blue;
// @media screen and (min-width: 992px) {
//   color: orange;
// }
```
