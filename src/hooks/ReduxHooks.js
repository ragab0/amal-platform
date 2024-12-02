import { useDispatch, useSelector, useStore } from "react-redux";

// instanciate the RootState and AppDispatch types from each instance whenever we use;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const useAppStore = useStore.withTypes();
