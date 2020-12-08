import { CA_ID, MT_ID } from '../constants';
import colors from '../scss/colors.module.scss';
import colorsSomething from '../scss/colors.something.module.scss';

export const {
  TEAL,
  TEAL_300,
  TEAL_200,
  TEAL_100,
  TEAL_50,

  PURPLE,
  PURPLE_300,
  PURPLE_200,
  PURPLE_100,
  PURPLE_50,

  BLACK,
  BLACK_90,
  GREY,
  GREY_900,
  GREY_700,
  GREY_600,
  GREY_500,
  GREY_400,
  GREY_300,
  GREY_100,
  GREY_50,
  WHITE,
  WHITE_50,
  WHITE_10,

  BLUE,
  BLUE_800,
  BLUE_600,
  BLUE_500,
  BLUE_400,
  BLUE_300,
  BLUE_250,
  BLUE_200,
  BLUE_100,
  BLUE_50,

  GREEN,
  GREEN_300,
  GREEN_200,
  GREEN_100,
  GREEN_50,

  RED,
  RED_500,
  RED_300,
  RED_200,
  RED_100,
  RED_50,

  BROWN,
  BROWN_300,
  BROWN_200,
  BROWN_100,
  BROWN_50,

  ORANGE,
  ORANGE_500,
  ORANGE_300,
  ORANGE_200,
  ORANGE_100,
  ORANGE_50,

  YELLOW,
  YELLOW_300,
  YELLOW_200,
  YELLOW_100,
  YELLOW_50,

  PINK,
  PINK_300,
  PINK_200,
  PINK_100,
  PINK_50,

  CRAYOLA,
  CRAYOLA_100,
  LIGHT_CRAYOLA,
} = CA_ID === MT_ID ? colorsSomething : colors;

export const BACK_GROUND = BLUE_50;
export const PRIMARY = CA_ID === 17 ? BLUE_400 : BLUE_400;
export const SECONDARY = CA_ID === 17 ? ORANGE : ORANGE;
