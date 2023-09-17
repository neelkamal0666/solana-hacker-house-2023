import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./app-slice";
import homeSlice from "./home-slice";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const rootPersistConfig = {
	key: "root",
	storage,
	blacklist: ["home"],
};

const homePersistConfig = {
	key: "home",
	storage,
	blacklist: ["selectedSidebarOption"],
};

const appPersistConfig = {
	key: "app",
	storage,
};

const rootReducer = combineReducers({
	app: persistReducer(appPersistConfig, appSlice.reducer),
	home: persistReducer(homePersistConfig, homeSlice.reducer),
});

const store = configureStore({
	reducer: persistReducer(rootPersistConfig, rootReducer),
});

const persistor = persistStore(store);

export default store;
export { persistor };
