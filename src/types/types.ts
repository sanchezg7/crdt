import LWWRegister from "../domain/LWWRegister.ts";

export type Value<T> = {
    [key: string]: T;
};

export type State<T> = {
    [key: string]: LWWRegister<T | null>["state"];
};

export type RGB = [red: number, green: number, blue: number];