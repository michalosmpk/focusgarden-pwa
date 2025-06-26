# Setup

### Used node version

> v20.19.3

## One command setup:

```
export NODE_OPTIONS=--openssl-legacy-provider && cp .env.template .env && yarn && yarn watch
```

## Manual setup:

### Before launching the project run:

```
export NODE_OPTIONS=--openssl-legacy-provider
```

### Install dependencies

```
yarn
```

### Create .env file

```
cp .env.template .env
```

### Start local devevlopment

```
yarn watch
```

#

Product schema package is located in `packages/pwa-schema-product`

#

Documentation for Magento PWA Studio packages is located at [https://developer.adobe.com/commerce/pwa-studio/](https://developer.adobe.com/commerce/pwa-studio/).
