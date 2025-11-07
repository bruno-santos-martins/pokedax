import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { ShareModule } from '../../share.module';
import { PokemonCardComponent } from './pokemon-card.component';

export default {
  title: 'Share/PokemonCard',
  component: PokemonCardComponent,
  decorators: [moduleMetadata({ imports: [ShareModule] })],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'normal',
          'fighting',
          'flying',
          'poison',
          'ground',
          'rock',
          'bug',
          'ghost',
          'steel',
          'fire',
          'water',
          'grass',
          'electric',
          'psychic',
          'ice',
          'dragon',
          'dark',
          'fairy',
          'stellar',
          'unknown',
        ],
      },
    },
  },
} as Meta<any>;

const Template: Story<any> = (args: any) => ({
  component: PokemonCardComponent,
  props: { data: args },
});

export const Default = Template.bind({});
Default.args = {
  number: 25,
  name: 'Pikachu',
  type: 'electric',
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  description: 'Um rato elétrico adorável.',
  stats: [
    { label: 'HP', value: 35 },
    { label: 'Attack', value: 55 },
    { label: 'Defense', value: 40 },
  ],
  evolutions: [
    {
      name: 'Pichu',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png',
    },
    {
      name: 'Pikachu',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    },
    {
      name: 'Raichu',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
    },
  ],
};
