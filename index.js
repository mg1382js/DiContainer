export class DIContainer {
    constructor() {
        this.Services = new Map();
    }

    Register(Name, Dependencies, Implementation, IsSingleton = true) {
        this.Services.set(Name, { Dependencies: Dependencies, Implementation: Implementation, IsSingleton: IsSingleton, instance: null });
    }

    Get(Name) {
        const Target = this.Services.get(Name);

        if (!Target) {
            throw new Error(`Service not found: ${Name}`);
        }

        if (Target.IsSingleton && Target.instance) {
            return Target.instance;
        }

        Target.instance = this.Instantiate(Target);
        return Target.instance;
    }

    Instantiate(Target) {
        const Dependencies = Target.Dependencies.map(Dep => this.Get(Dep));

        if (typeof Target.Implementation === 'function' && !Target.Implementation.prototype) {
            // If implementation is a function without a prototype (e.g., arrow function)
            return Target.Implementation(...Dependencies);
        } else if (typeof Target.Implementation === 'object') {
            // If implementation is already an object
            return Target.Implementation;
        } else {
            // If implementation is a constructor function
            return new Target.Implementation(...Dependencies);
        }
    }
}
