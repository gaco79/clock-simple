FROM python:3.12-bullseye

# Update the apt package index.
RUN apt-get update \
    && apt-get upgrade -y

# Install CLI utils.
RUN apt-get install -y zsh \
    && sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)" \
    && chsh -s $(which zsh) \
    && apt-get install -y git

# Instal NPM and Node.js.
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install Home Assistant.
RUN apt-get install -y python3 \
    python3-dev python3-venv python3-pip \
    libffi-dev libssl-dev libjpeg-dev zlib1g-dev autoconf \
    build-essential libopenjp2-7 libtiff5 libturbojpeg0 tzdata \
    && python3 -m pip install wheel \
    && pip3 install homeassistant \
    && mkdir -p /config \
    && ln -sf "/workspaces/clock-simple/.devcontainer/configuration.yaml" /config/configuration.yaml \
    && ln -sf "/workspaces/clock-simple/.devcontainer/ui-lovelace.yaml" /config/ui-lovelace.yaml
