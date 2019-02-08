import {
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
