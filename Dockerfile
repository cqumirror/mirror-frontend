FROM node:fermium-buster-slim

RUN echo 'registry=https://registry.npm.taobao.org/ \
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ \
ELECTRON_BUILDER_BINARIES_MIRROR=https://pan.yasking.org/electron-builder/ \
strict-ssl=false' > ~/.npmrc && mkdir /app


WORKDIR /app

COPY . .

RUN yarn && yarn build

EXPOSE 3010

CMD ./start.sh
