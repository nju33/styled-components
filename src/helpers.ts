import {
  css,
  FlattenSimpleInterpolation,
  CSSObject,
  SimpleInterpolation,
} from 'styled-components';

export interface RequiredAtomProps<MixinName extends string = string> {
  className?: MixinName;
}

/**
 * MixinName (= class) スコープなセレクタを作成する関数の型
 */
export type MixinFunction<Props extends RequiredAtomProps> = (
  mixinName: Props['className'],
) => (
  first: TemplateStringsArray | CSSObject,
  ...interpolations: SimpleInterpolation[]
) => FlattenSimpleInterpolation;

export type Mixin<MixinName extends string = string> = MixinFunction<
  RequiredAtomProps<MixinName>
> &
  Record<MixinName, FlattenSimpleInterpolation>;

// const sizes: {[index: string]: number} = {
//   desktop: 992,
//   tablet: 768,
//   phone: 576,
// };

export type CreateMediaResult<Sizes extends {[index: string]: number}> = Record<
  keyof Sizes,
  (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => SimpleInterpolation
>;

export function createMedia<
  Sizes extends {[index: string]: number},
  Result extends CreateMediaResult<Sizes> = CreateMediaResult<Sizes>
>(sizes: Sizes): Result {
  return Object.keys(sizes).reduce(
    (acc, label) => {
      acc[label] = (
        first: TemplateStringsArray | CSSObject,
        ...interpolations: SimpleInterpolation[]
      ) => css`
        @media screen and (min-width: ${sizes[label]}px) {
          ${css(first, ...interpolations)}
        }
      `;

      return acc;
    },
    {} as Result,
  );
}
