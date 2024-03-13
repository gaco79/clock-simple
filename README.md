# Simple Analog Clock

![GitHub Release](https://img.shields.io/github/v/release/gaco79/clock-simple)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/gaco79/clock-simple)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/gaco79/clock-simple/cd.yml)
[<img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow">](https://www.buymeacoffee.com/gaco79)

<p align="center">A simple analog clock for Home Assistant.</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/gaco79/clock-simple/master/images/analogue-clock.png" />
</p>

## 💾 Install

:warning: This card is under active development and may still have bugs. Future versions may introduce breaking changes. Please create an issue if you encounter a bug or have a feature request.

### HACS (recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=gaco79&repository=clock-simple&category=plugin)

### Manual install

Not recommended.

1. Download and copy `gcclock-simple.js` from the [latest release](https://github.com/gaco79/clock-simple/releases/latest) into your `config/www` directory.
2. Add the resource reference inside your `configuration.yaml` with URL `/local/gcclock-simple.js` and type `module`.
3. Add the custom card to your panel and 🚀.

## 📐 Configuration

In Home Assistant click `Edit Dashboard`, then `Add Card` and scroll down to find "Custom: Simple Analogue Clock".

### Inspiration

This repository is inspired by [Vipin Yadav's Codepen](https://codepen.io/imvpn22/pen/RwPvOgQ) and was initially based on code and development environment from [uptime-card](https://github.com/dylandoamaral/uptime-card).
