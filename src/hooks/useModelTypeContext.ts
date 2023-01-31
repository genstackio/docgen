import { useContext } from 'react';
import ModelTypeContext from '../contexts/ModelTypeContext';

export function useModelTypeContext() {
    return useContext(ModelTypeContext);
}

export default useModelTypeContext;
