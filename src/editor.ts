import { css, html, LitElement } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators.js';

interface GcClockSimpleConfig {
  showCardBackground?: boolean;
  smoothMovement?: boolean;
  [key: string]: any;
}

@customElement('gcclock-simple-editor')
class GcClockSimpleEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  hass?: any;
  config?: GcClockSimpleConfig;

  setConfig(config: GcClockSimpleConfig): void {
    this.config = config;
  }

  configChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement & { configValue: string };
    if (!this.config || !this.hass) {
      return;
    }

    const newConfig: GcClockSimpleConfig = {
      ...this.config,
      [target.configValue]: target.checked !== undefined ? target.checked : target.value,
    };

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="switch-container">
          <ha-switch
            .checked=${this.config.showCardBackground || false}
            .configValue=${'showCardBackground'}
            @change=${this.configChanged}
          ></ha-switch>
          <span>Show Card Background</span>
        </div>
        <div class="switch-container">
          <ha-switch
            .checked=${this.config.smoothMovement || false}
            .configValue=${'smoothMovement'}
            @change=${this.configChanged}
          ></ha-switch>
          <span>Smooth Movement</span>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .switch-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `;
  }
}
