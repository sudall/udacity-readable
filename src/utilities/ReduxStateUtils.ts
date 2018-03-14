interface IReduxDataItem {
    id: string;
}

interface ReduxDataMap<TDataItem> {
    [id: string]: TDataItem;
}

class ReduxStateUtils {
    static updateItemInStateByIdKey<TDataItem extends {id: string}>(newDataItem: TDataItem, oldState: {[id: string]: TDataItem}) {
        return this.updateItemsInStateByIdKey([newDataItem], oldState);
    };

    static updateItemsInStateByIdKey<TDataItem extends {id: string}>(newDataItems: TDataItem[], oldState: {[id: string]: TDataItem}) {
        return this.createNewStateMapByIdKey(newDataItems, oldState);
    };

    static createNewStateMapByIdKey<TDataItem extends {id: string}>(newDataItems: TDataItem[],
        oldState: {[dataItemKeyValue: string]: TDataItem} = {}): {[dataItemKeyValue: string]: TDataItem} {
        return this.createNewStateMap(newDataItems, "id", oldState);
    }

    static createNewStateMap<TDataItem, TDataItemKey extends keyof TDataItem>(newDataItems: TDataItem[],
        // getDataItemKeyValue: (dataItem: TDataItem) => string,
        dataItemKey: TDataItemKey,
        oldState: {[dataItemKeyValue: string]: TDataItem} = {}): {[dataItemKeyValue: string]: TDataItem} {

        // copy the old state
        const result = {
            ...oldState
        };

        // add the new items to the result state
        newDataItems.forEach((item) => {
            const dataItemKeyValue = item[dataItemKey];

            if (typeof dataItemKeyValue !== "string") {
                throw new Error("dataItemKeyValue must be a string");
            }

            result[dataItemKeyValue] = item;
        });

        return result;
    }
}

export default ReduxStateUtils;