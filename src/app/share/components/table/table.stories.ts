import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { ShareModule } from '../../share.module';
import { TableComponent } from './table.component';

export default {
  title: 'Share/TableAsCards',
  component: TableComponent,
  decorators: [moduleMetadata({ imports: [ShareModule] })]
} as Meta<TableComponent>;

const Template: Story<TableComponent> = (args: TableComponent) => ({ component: TableComponent, props: args });

const mockPokemons = new Array(6).fill(0).map((_, i) => ({
  name: `pokemon-${i+1}`,
  number: i+1,
  type: 'normal',
  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`,
  stats: [ { label: 'HP', value: 50 } ]
}));

export const Grid = Template.bind({});
Grid.args = { data: mockPokemons, pageSize: 6, count: 6 };
