class InstanceCounter {
    static activeInstances = 0;

    constructor() {
        InstanceCounter.activeInstances++;
        console.log(`New instance created. Active instances: ${InstanceCounter.activeInstances}`);
    }

    static getActiveInstances() {
        return InstanceCounter.activeInstances;
    }
}


const instance1 = new InstanceCounter();
const instance2 = new InstanceCounter();

console.log(`Current active instances: ${InstanceCounter.getActiveInstances()}`);


const instance3 = new InstanceCounter();

console.log(`Current active instances: ${InstanceCounter.getActiveInstances()}`);