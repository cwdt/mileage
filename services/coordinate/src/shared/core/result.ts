export class Result<T> {
    public readonly success: boolean;

    private readonly _error?: string;
    private readonly _value?: T;

    private constructor(success: boolean, error?: string, value?: T) {
        this.success = success;

        if (success && error) {
            throw new Error('Successful result can not contain an error')
        }

        if (!success && !error) {
            throw new Error('Error result must contain a message');
        }

        this._error = error;
        this._value = value;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    public static fail<U>(error?: string): Result<U> {
        return new Result<U>(false, error);
    }

    public error(): string {
        if (this.success) {
            throw new Error('Can not retrieve error result from successful result');
        }

        return this._error as string;
    }

    public value(): T {
        if (!this.success) {
            throw new Error('Can not retrieve value from error result');
        }

        return this._value as T;
    }
}
