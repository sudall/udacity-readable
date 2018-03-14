import CategoryData from "src/data/models/CategoryData";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {Observable} from "rxjs/Rx";
import CategoryConnector from "src/data/connectors/CategoryConnector";
import {ApplicationState, CategoryPathToCategoryDataMap} from "src/components/readable/ReadableApplication";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";

type Dependencies = {categoryConnector: CategoryConnector};

class GetAll extends ActionMeta<void, CategoriesState> {
    epic: FilteredEpic<PayloadAction<void>, ApplicationState, Dependencies> =
        (action$, store, {categoryConnector}, allAction$): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action) => {
                return categoryConnector.getAll()
                    .map((result) => {
                        return instance.getAllCompleted.factory(result);
                    });
            });
    }
}

class GetAllCompleted extends ActionMeta<CategoryData[], CategoriesState> {
    reducer(state: CategoriesState, action: PayloadAction<CategoryData[]>): CategoriesState {
        const categoriesArray = action.payload;
        return ReduxStateUtils.createNewStateMap(categoriesArray, "path");
    }
}

type CategoriesState = CategoryPathToCategoryDataMap;

class CategoryActions extends ActionSet<"categories", CategoriesState> {
    getAll = new GetAll(this);
    getAllCompleted = new GetAllCompleted(this);
}

const instance = new CategoryActions("categories");

export default instance;