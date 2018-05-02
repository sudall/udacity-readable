class JsxUtils {
    static if<TThenResult, TElseResult>(condition: boolean, thenResult: TThenResult, elseResult: TElseResult | null = null) {
        if (condition) {
            return thenResult;
        } else {
            return elseResult;
        }
    }

    static forCount<TResult>(count: number, operation: (index: number) => TResult): TResult[] {
        const result: TResult[] = [];

        for (let index = 0; index < count; index++) {
            result.push(operation(index));
        }

        return result;
    }

    static for<TResult>(endCondition: () => boolean,
        afterEach: () => void,
        operation: (index: number) => TResult): TResult[] {

        const result: TResult[] = [];

        for (let index = 0; endCondition(); afterEach()) {
            result.push(operation(index));
            index++;
        }

        return result;
    }

    static switchIf<TResult>(cases: {condition: boolean,
        result: TResult | (() => TResult)}[],
        defaultResult: TResult | null = null) {

        const trueCase = cases.find((switchCase) => {
            return switchCase.condition;
        });

        if (trueCase != null) {
            if (typeof trueCase.result === "function") {
                return trueCase.result();
            }

            return trueCase.result;
        }

        return null;
    }

    static switch<TSwitchValue, TResult>(switchValue: TSwitchValue,
        cases: {value: TSwitchValue, result: TResult | ((value: TSwitchValue) => TResult)}[],
        defaultResult: TResult | null = null) {

        const newCases = cases.map((switchCase) => {
            let newResult: TResult | (() => TResult) = switchCase.result as TResult;

            if (typeof switchCase.result === "function") {
                newResult = () => {
                    const resultFunction = switchCase.result as ((value: TSwitchValue) => TResult);
                    return resultFunction(switchCase.value);
                };
            }

            return {
                condition: switchCase.value === switchValue,
                result: newResult
            }
        });

        return this.switchIf(newCases, defaultResult);
    }
}

export default JsxUtils;