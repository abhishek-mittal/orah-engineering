import React, { Context } from "react";
import { createAction } from "./createAction";
import rootReducer, { initialState } from "./reducers/rootReducer";

type StaffAppContextType = {
    state: typeof initialState;
    dispatch: React.Dispatch<ReturnType<typeof createAction>>;
};



let StaffAppContext: Context<StaffAppContextType>;
const { Provider } = (StaffAppContext = React.createContext<StaffAppContextType>({
    state: initialState,
    dispatch: f => f
}));

const StaffAppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(rootReducer, initialState);
    return (
        <Provider value={{ 
            state, dispatch
         }}>
            <>
                {children}
            </>
        </Provider>
    );
};

export { StaffAppContext, StaffAppContextProvider };
