import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { ShareModule } from '../../share.module';

export default {
  title: 'Share/Input',
  decorators: [moduleMetadata({ imports: [ShareModule] })]
} as Meta;

const Template: Story = (args) => ({ props: args });

export const Text = Template.bind({});
Text.args = { label: 'Nome', type: 'text', size: 'md', value: '' };

export const Search = Template.bind({});
Search.args = { label: 'Buscar', type: 'search', size: 'lg', value: '' };
