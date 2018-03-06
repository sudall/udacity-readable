import Enum from "src/enums/Enum";

class SortMethod<TComparisonType> extends Enum<SortMethod<TComparisonType>> {
    constructor(public readonly sortCompareFunction: (a: TComparisonType, b: TComparisonType) => number) {
        super();
    }

    static readonly NumberLowestToHighest = new SortMethod<number>((a, b) => {
        return a - b;
    });

    static readonly NumberHighestToLowest = new SortMethod<number>((a, b) => {
        return b - a;
    });
}

export default SortMethod;