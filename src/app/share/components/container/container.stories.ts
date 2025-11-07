import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { ShareModule } from '../../share.module';
import { ContainerComponent } from './container.component';

export default {
  title: 'Share/Container',
  component: ContainerComponent,
  decorators: [moduleMetadata({ imports: [ShareModule] })]
} as Meta<ContainerComponent>;

const Template: Story<ContainerComponent> = () => ({
  component: ContainerComponent,
  template: `<app-container><div style="padding:1rem">Conteúdo dentro do container</div></app-container>`
});

export const Default = Template.bind({});
