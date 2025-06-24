import { DependencyContext } from "./DependencyContext";

export function DependencyProvider({ children, services }) {
    return (
        <DependencyContext.Provider value={services}>
            {children}
        </DependencyContext.Provider>
    );
}