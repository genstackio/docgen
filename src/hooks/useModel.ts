import useModelContext from "./useModelContext";

export function useModel() {
    return useModelContext().model;
}

export default useModel;
