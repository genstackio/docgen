import { useContext } from 'react';
import ModelContext from '../contexts/ModelContext';

export function useModelContext() {
    return useContext(ModelContext);
}

export default useModelContext;
