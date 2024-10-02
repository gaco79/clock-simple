import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class GcClockSimpleEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  setConfig(config) {
    this.config = config;
  }

  configChanged(ev) {
    const target = ev.target;
    if (!this.config || !this.hass) {
      return;
    }

    const newConfig = {
      ...this.config,
      [target.configValue]:
        target.checked !== undefined ? target.checked : target.value,
    };

    const event = new CustomEvent("config-changed", {
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
            .checked=${this.config.show_card_background || false}
            .configValue=${"show_card_background"}
            @change=${this.configChanged}
          ></ha-switch>
          <span>Show Card Background</span>
        </div>
        <div class="switch-container">
          <ha-switch
            .checked=${this.config.smooth_movement || false}
            .configValue=${"smooth_movement"}
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

customElements.define("gcclock-simple-editor", GcClockSimpleEditor);
