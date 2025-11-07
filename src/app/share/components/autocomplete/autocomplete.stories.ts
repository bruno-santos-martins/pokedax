import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { ShareModule } from '../../share.module';
import { AutocompleteComponent } from './autocomplete.component';

export default {
  title: 'Share/Autocomplete',
  component: AutocompleteComponent,
  decorators: [moduleMetadata({ imports: [ShareModule] })]
} as Meta<AutocompleteComponent>;

const Template: Story<AutocompleteComponent> = (args: AutocompleteComponent) => ({ component: AutocompleteComponent, props: args });

export const Default = Template.bind({});
Default.args = { label: 'Pesquisar Pokémon', options: [
  { label: 'Pikachu', value: 'pikachu' },
  { label: 'Charmander', value: 'charmander' },
  { label: 'Squirtle', value: 'squirtle' }
] };
