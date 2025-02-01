type Value<T> = {
    [key: string]: T;
};

type State<T> = {
    [key: string]: LWWRegister<T | null>["state"];
};

type RGB = [red: number, green: number, blue: number];