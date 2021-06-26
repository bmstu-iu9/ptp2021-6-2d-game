![Node.js CI](https://github.com/ruffythepirate/ts-optional/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/ruffythepirate/ts-optional/branch/master/graph/badge.svg)](https://codecov.io/gh/ruffythepirate/ts-optional)

# Optional

This repository provides an optional type that allows for cleaner code when dealing with operations that would otherwise return undefined

## Features

Refer to the [API documentation](https://ruffythepirate.github.io/ts-optional/globals.html) to see available classes and their functions.

## Requirements

* Node and npm
* To build or develop you will benefit from having `npx` https://github.com/npm/npx. This allows invoking of the other global npm requirements in the repository (Typescript, Jest) without having to install them.

## Usage

You can install the package using

```bash
npm i -S @ruffy/ts-optional
```

You can then use the classes direct as:
```typescript
Optional.of(undefined) === None.nil
Optional.of(2) === new Some(2)
```

or you can use the provided helper functions for cleaner code:
```typescript
optional(undefined) === none
optional(2) === some(2)
```

## Contributing

Contributions, if they are in line with Monad logic are welcome. Requirements for pull requests are:
* All code is tested
* Naming is consistent with project naming
* Commits are squashed and contain commit messages according to [RFC: Commit Message Guidelines](https://gist.github.com/abravalheri/34aeb7b18d61392251a2)

## License

[MIT](./LICENSE)
