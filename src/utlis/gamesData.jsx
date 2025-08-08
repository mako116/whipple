// Assets
import number1 from '../assets/images/games/dfd0983d-43cb-479f-bd09-6da48a29a8dd.webp';
import virtualcoins from '../assets/images/games/coinflip.jpg';
import cube from '../assets/images/games/cube.png';
import spin from '../assets/images/games/spin2win.png';
import color from '../assets/images/games/spinningcolo.avif';
import choose from '../assets/images/games/soccerbg.avif';
import mystry from '../assets/images/games/mys.jpg';
import spins from  '../assets/images/games/Rectangle 98.png';
import colors from  '../assets/images/games/colod.png';
import SpinDaWheel from  '../assets/images/games/spinDaWheel.png';
 

export const  popularGames = [

  {
    title: 'Dice Roll',
    image: cube,
    description: 'Roll dice and bet on outcomes.',
    variants: ['Single Die', 'Double Die'],
   to: "/dice-roll",
  },
  {
    title: 'Color Roulette',
    image: color,
    description: 'Four colors (Red, Blue, Green, Yellow); two prominent colors published.',
    variants: ['Four Colors'],
   to: "/games/colorRoulette",
  },
  {
    title: 'One Number Spin',
    image: spins,
    description: 'Spin a wheel with numbers 1-10, one prominent number published.',
    variants: ['One Number Wheel'],
   to: "/one-number",
  },
];
export const topGames = [ 
  {
    title: 'Lucky Number',
    image: number1,
    description: 'Players select numbers from a range. Winners match the drawn number(s).',
    variants: ['Category A (1-3, 1-5)', 'Category B (2 from 1-5)', 'Category C (5, 10, or 1 from 1-100)'],
     to: "/lucky-numbers",
  },
  {
    title: 'Virtual Coin Flip',
    image: virtualcoins,
    description: 'Simple heads or tails game with animated coin flip.',
    variants: ['Heads or Tails'],
    to: "/coin-flip",

  },
 
  {
    title: 'Goal Challenge',
    image: choose,
    description: 'Virtual ball shot into goal (right, left, middle).',
    variants: ['Standard Goal'],
    to: "/goal-challenge",

  },
];

export const  quickGames = [
  {
    title: 'Wheel Spin',
    image: spin,
    description: 'Spin a wheel with numbers 1-10, three prominent numbers published.',
    variants: ['Standard Wheel'],
   to: "/wheel-spin",

  },
  {
    title: 'Mystery Box Game',
    image: mystry,
    description: 'Three boxes; one chosen as the winning box.',
    variants: ['Three Boxes'],
   to: "/mystery-box",

  },
   {
    title: 'Color Roulette2',
    image: colors,
    description: 'Four colors (Red, Blue, Green, Yellow); one prominent color published.',
    variants: ['Four Colors'],
   to: "/color-roulette2",

  },
   {
    title: 'Spin da Bottle',
    image: SpinDaWheel,
    description: 'Spin the bottle.  choose either up or down',
    variants: ['two sections','up or down'],
   to: "/spin-bottle",

  },
];
export const allGames = [...popularGames, ...topGames, ...quickGames];
