/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './editor';

import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import {
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  state,
  TemplateResult,
} from 'lit-element';

import { CARD_VERSION, DEFAULT_CONFIG } from './const';
import style from './style';
import { GcclockSimpleCardConfig } from './types/config';

/* eslint no-console: 0 */
console.info(`%c gcclock-simple ${CARD_VERSION}`, 'color: white; background-color: #C6B145; font-weight: 700;');

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'gcclock-simple',
  name: 'Simple Analogue Clock',
  description: 'Display the time on a simple analogue clock.',
});

@customElement('gcclock-simple')
export class GcClockSimple extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('gcclock-simple-editor');
  }

  @property({ attribute: false }) public _hass!: HomeAssistant;
  @state() private config!: GcclockSimpleCardConfig;

  dateTime = new Date();

  deg = 6;
  @state() timer!: NodeJS.Timeout;
  @state() hour!: HTMLElement;
  @state() minute!: HTMLElement;
  @state() second!: HTMLElement;

  /**
   * Called when the state of Home Assistant changes (frequent).
   * @param hass The new hass.
   */
  public set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  /**
   * The list of clickable actions
   */
  public get actions(): string[] {
    return ['more-info', 'url', 'navigate', 'toggle', 'call-service', 'fire-dom-event'];
  }

  /**
   * Called when the configuration change (rare).
   * @param config The new config.
   */
  public setConfig(config: GcclockSimpleCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration !');
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    //console.log('config', this.config);
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    this.hour = this.renderRoot.querySelector('.hour') as HTMLElement;
    this.minute = this.renderRoot.querySelector('.min') as HTMLElement;
    this.second = this.renderRoot.querySelector('.sec') as HTMLElement;

    changedProps;

    this.updateClock();
  }

  private updateClock(): void {
    if (!this.hour || !this.minute || !this.second) return;

    const day = new Date();

    const hh = day.getHours() * 30;
    const mm = day.getMinutes() * this.deg;

    let ss;
    if (this.config.smooth_seconds) {
      ss = (day.getSeconds() + day.getMilliseconds() / 1000) * this.deg;
    } else {
      ss = day.getSeconds() * this.deg;
    }

    this.hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    this.minute.style.transform = `rotateZ(${mm}deg)`;
    this.second.style.transform = `rotateZ(${ss}deg)`;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.timer = setInterval(() => this.updateClock(), this.config.smooth_seconds ? 50 : 1000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    clearInterval(this.timer);
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize(): number {
    return 7;
  }

  private get showCardBackground() {
    return this.config.show_card_background ? '' : 'hide';
  }

  /**
   * Rendering
   */
  protected render(): TemplateResult {
    return html`
      <ha-card class="gcclock-simple ${this.showCardBackground}">
        <div class="clock">
          <div class="hour"></div>
          <div class="min"></div>
          <div class="sec"></div>
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResult {
    return style;
  }
}
