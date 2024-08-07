# DIContainer

`DIContainer` is a simple and flexible Dependency Injection container for JavaScript. It allows you to register and resolve services with dependencies, supporting both singleton and transient lifetimes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Registering Services](#registering-services)
    - [Resolving Services](#resolving-services)
- [Examples](#examples)
    - [Registering a Singleton Service](#registering-a-singleton-service)
    - [Registering a Transient Service](#registering-a-transient-service)
    - [Registering a Service with Dependencies](#registering-a-service-with-dependencies)
- [License](#license)

## Installation

You can add `DIContainer` to your project by copying the `DIContainer` class into your project.

## Usage

### Registering Services

To register a service, use the `Register` method. You need to provide:
- `Name`: The name of the service.
- `Dependencies`: An array of service names that this service depends on.
- `Implementation`: The implementation of the service. It can be a constructor function, a factory function, or an existing object.
- `IsSingleton` (optional): A boolean indicating if the service should be a singleton. Default is `true`.

### Resolving Services

To resolve a service, use the `Get` method with the service name. This will return an instance of the service, with all its dependencies resolved.

## Examples

### Registering a Singleton Service

```js
const container = new DIContainer();

class MyService {
    constructor() {
        this.name = 'MyService';
    }
}

container.Register('MyService', [], MyService);

const myServiceInstance = container.Get('MyService');
console.log(myServiceInstance.name); // Output: MyService
```

### Registering a Transient Service

```js
const container = new DIContainer();

class MyTransientService {
    constructor() {
        this.timestamp = Date.now();
    }
}

container.Register('MyTransientService', [], MyTransientService, false);

const instance1 = container.Get('MyTransientService');
const instance2 = container.Get('MyTransientService');
console.log(instance1.timestamp !== instance2.timestamp); // Output: true

```

### Registering a Service with Dependencies

```js
const container = new DIContainer();

class Logger {
    log(message) {
        console.log(message);
    }
}

class UserService {
    constructor(logger) {
        this.logger = logger;
    }

    getUser() {
        this.logger.log('Getting user');
        return { name: 'John Doe' };
    }
}

container.Register('Logger', [], Logger);
container.Register('UserService', ['Logger'], UserService);

const userService = container.Get('UserService');
const user = userService.getUser(); // Logs: Getting user
console.log(user.name); // Output: John Doe
```
