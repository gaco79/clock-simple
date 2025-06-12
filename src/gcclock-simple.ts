import './editor.js';

import { version } from '../package.json';

import { customElement } from 'lit/decorators.js';
import { css, html, LitElement, PropertyValues } from 'lit';

import { DEFAULT_CONFIG } from './const.js';

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

console.info(`%c gcclock-simple ${version}`, 'color: white; background-color: #C6B145; font-weight: 700;');

interface GcClockSimpleConfig {
  showCardBackground?: boolean;
  smoothMovement?: boolean;
  [key: string]: any;
}

@customElement('gcclock-simple')
export class GcClockSimple extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  hass?: any;
  config: GcClockSimpleConfig;
  animationFrameId: number | null;

  constructor() {
    super();
    this.config = { ...DEFAULT_CONFIG };
    this.animationFrameId = null;
  }

  setConfig(config: GcClockSimpleConfig): void {
    if (config.showCardBackground === undefined) {
      config.showCardBackground = DEFAULT_CONFIG.showCardBackground;
    }
    if (config.smoothMovement === undefined) {
      config.smoothMovement = DEFAULT_CONFIG.smoothMovement;
    }
    this.config = config;
    this.setupAnimation();
  }

  static get editorDefinition() {
    return {
      label: 'GC Clock Simple',
      editor: 'gcclock-simple-editor',
    };
  }

  static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('gcclock-simple-editor');
  }

  static getStubConfig(): GcClockSimpleConfig {
    return { ...DEFAULT_CONFIG };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setupAnimation();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopAnimation();
  }

  setupAnimation(): void {
    this.stopAnimation();
    this.performAnimation();
  }

  stopAnimation(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  performAnimation(): void {
    this.updateClock();
    this.animationFrameId = requestAnimationFrame(() => this.performAnimation());
  }

  updateClock(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    let hoursAngle: number, minutesAngle: number, secondsAngle: number;

    if (this.config.smoothMovement) {
      hoursAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;
      minutesAngle = (minutes + seconds / 60 + milliseconds / 60000) * 6;
      secondsAngle = (seconds + milliseconds / 1000) * 6;
    } else {
      hoursAngle = ((hours % 12) + minutes / 60) * 30;
      minutesAngle = minutes * 6;
      secondsAngle = seconds * 6;
    }

    if (this.shadowRoot) {
      const hourHand = this.shadowRoot.querySelector<HTMLElement>('.hour');
      const minuteHand = this.shadowRoot.querySelector<HTMLElement>('.min');
      const secondHand = this.shadowRoot.querySelector<HTMLElement>('.sec');

      if (hourHand) hourHand.style.transform = `rotateZ(${hoursAngle}deg)`;
      if (minuteHand) minuteHand.style.transform = `rotateZ(${minutesAngle}deg)`;
      if (secondHand) secondHand.style.transform = `rotateZ(${secondsAngle}deg)`;
    }
  }

  updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('config')) {
      this.setupAnimation();
    }
  }

  render() {
    return html`
      <ha-card class="gcclock-simple ${this.config.showCardBackground ? '' : 'hide'}">
        <div class="clock">
          <div class="hour"></div>
          <div class="min"></div>
          <div class="sec"></div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card.hide {
        background: none;
        border: none;
      }
      .clock {
        margin: 2rem;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--card-background-color) url('https://imvpn22.github.io/analog-clock/clock.png') center/cover
          no-repeat;
        border: 4px solid var(--card-background-color);
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.3);
      }
      .clock::before,
      .hour::before,
      .min::before,
      .sec::before {
        content: '';
        position: absolute;
        border-radius: 50%;
      }
      .clock::before {
        width: 0.75rem;
        height: 0.75rem;
        background-color: var(--primary-color);
        border: 2px solid var(--card-background-color);
        z-index: 2;
      }
      .hour,
      .min,
      .sec {
        position: absolute;
        display: flex;
        justify-content: center;
      }
      .hour {
        width: 10em;
        height: 40%;
      }
      .min {
        width: 12em;
        height: 60%;
      }
      .sec {
        width: 13em;
        height: 60%;
      }
      .hour::before,
      .min::before,
      .sec::before {
        bottom: 50%;
        background-color: var(--primary-text-color);
        border-radius: 6px;
      }
      .hour::before {
        height: 50%;
        width: 6px;
      }
      .min::before {
        height: 50%;
        width: 4px;
      }
      .sec::before {
        height: 60%;
        width: 2px;
        background-color: var(--primary-color);
      }
    `;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'gcclock-simple',
  name: 'Simple Analog Clock',
  description: 'A simple analog clock card',
  preview: true,
  documentationURL: 'https://github.com/Your_Username/gcclock-simple/blob/main/README.md',
});
