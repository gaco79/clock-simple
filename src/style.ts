import { css } from 'lit-element';

const style = css`
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
    background-color: var(--mdc-theme-background);
    background-image: url('https://imvpn22.github.io/analog-clock/clock.png');
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    border: 4px solid var(--mdc-theme-background);
    box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05), inset 0 -15px 15px rgba(255, 255, 255, 0.05),
      0 15px 15px rgba(0, 0, 0, 0.3), inset 0 15px 15px rgba(0, 0, 0, 0.3);
    transition: all ease 0.2s;
  }
  .clock:before {
    content: '';
    height: 0.75rem;
    width: 0.75rem;
    background-color: var(--mdc-theme-primary);
    border: 2px solid var(--mdc-theme-background);
    position: absolute;
    border-radius: 50%;
    z-index: 1000;
    transition: all ease 0.2s;
  }
  .hour,
  .min,
  .sec {
    position: absolute;
    display: flex;
    justify-content: center;
    border-radius: 50%;
  }
  .hour {
    height: 40%;
    width: 10em;
  }
  .hour:before {
    content: '';
    position: absolute;
    height: 50%;
    width: 6px;
    background-color: var(--primary-text-color);
    border-radius: 6px;
  }
  .min {
    height: 50%;
    width: 12em;
  }
  .min:before {
    content: '';
    height: 50%;
    width: 4px;
    background-color: var(--primary-text-color);
    border-radius: 4px;
  }
  .sec {
    height: 60%;
    width: 13em;
  }
  .sec:before {
    content: '';
    height: 60%;
    width: 2px;
    background-color: var(--mdc-theme-primary);
    border-radius: 2px;
  }
`;

export default style;
