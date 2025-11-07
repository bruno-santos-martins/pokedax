import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { ShareModule } from '../../share.module';
import { InputComponent } from './input.component';

export default {
  title: 'Share/Input',
  component: InputComponent,
  decorators: [moduleMetadata({ imports: [ShareModule] })]
} as Meta<InputComponent>;

const Template: Story<InputComponent> = (args: InputComponent) => ({ component: InputComponent, props: args });

export const Text = Template.bind({});
Text.args = { label: 'Nome', type: 'text', labelSize: '1rem', inputSize: '240px' } as Partial<InputComponent>;

export const Search = Template.bind({});
Search.args = { label: 'Buscar', type: 'search', labelSize: '1rem', inputSize: '300px' } as Partial<InputComponent>;
