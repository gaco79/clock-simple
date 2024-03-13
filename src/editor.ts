/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, state } from 'lit/decorators';

import { GcclockSimpleCardConfig } from './types/config';

@customElement('gcclock-simple-editor')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GcclockWordsEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: GcclockSimpleCardConfig;

  public setConfig(config: GcclockSimpleCardConfig): void {
    this._config = config;
  }

  SCHEMA = [
    { name: 'show_card_background', selector: { boolean: {} } },
    { name: 'smooth_seconds', selector: { boolean: {} } },
    { name: 'theme', selector: { theme: {} } },
  ];

  private _computeLabel(schema): string {
    //console.log('schema', schema);

    switch (schema.name) {
      case 'show_card_background':
        return 'Show Card Background?';
      case 'smooth_seconds':
        return 'Smooth Second Hand?';
      case 'theme':
        return 'Theme';
    }

    return 'aubergine';
  }

  protected render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    //console.log('ev', ev);
    const config = ev.detail.value;
    fireEvent(this, 'config-changed', { config });
  }

  static styles: CSSResultGroup = css``;
}
