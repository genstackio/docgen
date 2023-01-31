import useModelTypeContext from "./useModelTypeContext";

export function useModelType() {
    return useModelTypeContext().type;
}

export default useModelType;
