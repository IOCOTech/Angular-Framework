export function GuardNullOrUndefined<T>(obj: T | null | undefined, errorMessage: string = "Value must be defined"): asserts obj is T  {
    if (!obj) {
        throw new Error(errorMessage);
    }
}

