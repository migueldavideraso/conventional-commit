# Conventional commit manager 

Installation
```js
npm install @migueleraso/conventional-commit -D
```

Config at file convetional_commit.config.js
```js
import { setSettings } from '@migueleraso/conventional-commit/settings.js'

export default setSettings(settings => {
  settings.types.push({
    name: 'Custom Type 📅',
    description: 'This is a custom type',
  })

  settings.scopes.push({
    name: 'Custom Scope 📅',
    description: 'This is a custom scope',
  })

  return settings
})
```

Usage
```json
"scripts": {
    "commit": "@migueleraso/conventional-commit"
 },
```