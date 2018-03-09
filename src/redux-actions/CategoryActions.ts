import {ActionMeta, ActionSet} from "src/redux-actions/PostActions2";
import CategoryData from "src/data/models/CategoryData";
import {ActionsObservable, Epic} from "redux-observable";
import PayloadAction from "src/redux-actions/PayloadAction";
import {Observable} from "rxjs/Rx";
import CategoryConnector from "src/data/connectors/CategoryConnector";
import {CategoryPathToCategoryDataMap} from "src/components/readable/ReadableApplication";

class GetAll extends ActionMeta<void, CategoriesState> {
    epic = (action$: ActionsObservable<PayloadAction<void>>): Observable<PayloadAction<any>> => {
        return action$
            .mergeMap((action) => {
                return CategoryConnector.getAll()
                    .map((result) => {
                        return instance.getAllCompleted.factory(result);
                    });
            });
    }
}

class GetAllCompleted extends ActionMeta<CategoryData[], CategoriesState> {
    reducer(state: CategoriesState, action: PayloadAction<CategoryData[]>): CategoriesState {
        const categoriesArray = action.payload;

        const categories: CategoriesState = {};
        Object.values(categoriesArray).forEach((category) => {
            categories[category.path] = category;
        });

        return categories;
    }
}

type CategoriesState = CategoryPathToCategoryDataMap;

class CategoryActions extends ActionSet<"categories", CategoriesState> {
    getAll = new GetAll(this);
    getAllCompleted = new GetAllCompleted(this);
}

const instance = new CategoryActions("categories");

export default instance;