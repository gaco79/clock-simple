import { LovelaceCardConfig, Theme } from 'custom-card-helpers';

export interface GcclockSimpleCardConfig extends LovelaceCardConfig {
  show_card_background?: boolean;
  smooth_seconds?: boolean;
  theme?: Theme;
}
