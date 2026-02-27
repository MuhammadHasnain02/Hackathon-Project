declare module "react" {
  export type ReactNode = any;

  export interface FC<P = {}> {
    (props: P & { children?: ReactNode }): ReactNode | null;
  }

  export interface ChangeEvent<T = any> {
    target: T;
  }

  export interface SyntheticEvent<T = Element, E = Event> {
    target: T;
    nativeEvent: E;
    preventDefault: () => void;
  }

  export interface FormEvent<T = Element> extends SyntheticEvent<T> {}

  export function useState<S>(
    initialState: S | (() => S)
  ): [S, (newState: S) => void];

  export function useEffect(
    effect: () => void | (() => void),
    deps?: unknown[]
  ): void;

  export function useContext<T>(context: any): T;

  export function createContext<T>(
    defaultValue: T
  ): {
    Provider: FC<{ value: T }>;
    Consumer: FC<{ children: (value: T) => ReactNode }>;
  };

  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
}

