import LWWRegister from "./LWWRegister.ts";

class LWWMap<T> {
    readonly id: string;
    #data = new Map<string, LWWRegister<T | null>>();

    constructor(id: string, state: State<T>) {
        this.id = id;

        // create a new register for each key in the initial state
        for (const [key, register] of Object.entries(state)) {
            this.#data.set(key, new LWWRegister(this.id, register));
        }
    }

    get value() {
        const value: Value<T> = {};

        // build up an object where each value is set to the value of the register at the corresponding key
        for (const [key, register] of this.#data.entries()) {
            if (register.value !== null) value[key] = register.value;
        }

        return value;
    }

    get state() {
        const state: State<T> = {};

        // build up an object where each value is set to the full state of the register at the corresponding key
        for (const [key, register] of this.#data.entries()) {
            if (register) state[key] = register.state;
        }

        return state;
    }

    has(key: string) {
        return this.#data.get(key)?.value !== null;
    }

    get(key: string) {
        return this.#data.get(key)?.value;
    }

    set(key: string, value: T) {
        // get the register at the given key
        const register = this.#data.get(key);

        // if the register already exists, set the value
        if (register) register.set(value);
        // otherwise, instantiate a new `LWWRegister` with the value
        else this.#data.set(key, new LWWRegister(this.id, [this.id, 1, value]));
    }

    delete(key: string) {
        // set the register to null, if it exists
        this.#data.get(key)?.set(null);
    }

    merge(state: State<T>) {
        // recursively merge each key's register with the incoming state for that key
        for (const [key, remote] of Object.entries(state)) {
            const local = this.#data.get(key);

            // if the register already exists, merge it with the incoming state
            if (local) local.merge(remote);
            // otherwise, instantiate a new `LWWRegister` with the incoming state
            else this.#data.set(key, new LWWRegister(this.id, remote));
        }
    }
}

export default LWWMap;