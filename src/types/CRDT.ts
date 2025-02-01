interface CRDT<T, S> {
    value: T;
    state: S;
    merge(state: S): void;
}