import type { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    enableBy() {
      let isReact18 = false;

      try {
        isReact18 = api.utils.semver.gte(require('react/package.json').version, '18.0.0');
      } catch (e) {
        /* nothing */
      }

      return isReact18;
    },
  })

  api.chainWebpack(memo => {
    memo.module
      .rule('js-in-node_modules')
      .use('dumi-react18-patch')
      .loader(require.resolve('./patchLoader'))
      .before('babel-loader');

    return memo;
  });
};
