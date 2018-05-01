class JsxUtils {
    static if<TResult, TElseResult>(condition: boolean, thenResult: TResult, elseResult: TElseResult | null = null) {
        if (condition) {
            return thenResult;
        } else {
            return elseResult;
        }
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

    static forCount<TResult>(count: number, operation: (index: number) => TResult): TResult[] {
        const result: TResult[] = [];

        for (let index = 0; index < count; index++) {
            result.push(operation(index));
        }

        return result;
    }

    static ifElseIf(conditionAndResults: {condition: boolean, result: any}[]) {
        conditionAndResults.forEach((conditionAndResult) => {
            if (conditionAndResult.condition) {
                return conditionAndResult.result;
            }
        });

        return null;
    }
}

export default JsxUtils;