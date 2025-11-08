import { Meta, Story } from '@storybook/angular';
import { ModalPokemonComponent } from './modal-pokemon.component';

export default {
  title: 'Components/ModalPokemon',
  component: ModalPokemonComponent,
  argTypes: {
    open: { control: 'boolean' },
    pokemon: { control: 'object' },
    close: { action: 'close' }
  },
} as Meta<ModalPokemonComponent>;

const examplePokemon = {
  name: 'bulbasaur',
  number: 1,
  typeColor: '#78C850',
  types: ['grass', 'poison'],
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  height: 0.7,
  weight: 6.9,
  abilities: ['Overgrow', 'Chlorophyll'],
  stats: [
    { label: 'hp', value: 45 },
    { label: 'attack', value: 49 },
    { label: 'defense', value: 49 },
    { label: 'special-attack', value: 65 },
    { label: 'special-defense', value: 65 },
    { label: 'speed', value: 45 }
  ]
};

const Template: Story<ModalPokemonComponent> = (args: ModalPokemonComponent) => ({
  component: ModalPokemonComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  open: true,
  pokemon: examplePokemon
};
