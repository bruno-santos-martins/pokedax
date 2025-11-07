import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { ShareModule } from '../../share.module';

export default {
  title: 'Share/Container',
  decorators: [moduleMetadata({ imports: [ShareModule] })]
} as Meta;

const Template: Story = (args) => ({ props: args, template: `<app-container><div style="padding:1rem">Conteúdo dentro do container</div></app-container>` });

export const Default = Template.bind({});
