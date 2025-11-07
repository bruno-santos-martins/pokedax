import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { ShareModule } from '../../share.module';

export default {
  title: 'Share/Autocomplete',
  decorators: [moduleMetadata({ imports: [ShareModule] })]
} as Meta;

const Template: Story = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = { label: 'Pesquisar Pokémon', options: [
  { label: 'Pikachu', value: 'pikachu' },
  { label: 'Charmander', value: 'charmander' },
  { label: 'Squirtle', value: 'squirtle' }
] };
