module.exports = {
  core: {
      builder: 'webpack5',
  },
  framework: '@storybook/angular',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
    typescript: { reactDocgen: false },
    angularOptions: {
      enableIvy: true
    }
};
