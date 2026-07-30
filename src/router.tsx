import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";

type RouterState = {
  pathname: string;
  navigate: (to: string, replace?: boolean) => void;
};
const RouterContext = createContext<RouterState | null>(null);
const ParamsContext = createContext<Record<string, string>>({});

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  const value = useMemo<RouterState>(
    () => ({
      pathname,
      navigate(to, replace = false) {
        if (to === pathname) return;
        window.history[replace ? "replaceState" : "pushState"]({}, "", to);
        setPathname(window.location.pathname);
        window.scrollTo({ top: 0, behavior: "instant" });
      },
    }),
    [pathname],
  );
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

function useRouter() {
  const value = useContext(RouterContext);
  if (!value) throw new Error("BrowserRouter is missing");
  return value;
}

export function useNavigate() {
  return useRouter().navigate;
}

export function useParams<T extends Record<string, string | undefined>>() {
  return useContext(ParamsContext) as T;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
};
export function Link({ to, onClick, ...props }: LinkProps) {
  const { navigate } = useRouter();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      props["aria-disabled"] === true
    )
      return;
    event.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handleClick} {...props} />;
}

export function NavLink({
  to,
  className,
  ...props
}: LinkProps & { end?: boolean }) {
  const { pathname } = useRouter();
  const end = props.end;
  const active = end
    ? pathname === to
    : pathname === to || pathname.startsWith(`${to}/`);
  const classes = [className, active ? "active" : ""].filter(Boolean).join(" ");
  const { end: _end, ...anchorProps } = props;
  return (
    <Link
      to={to}
      className={classes}
      aria-current={active ? "page" : undefined}
      {...anchorProps}
    />
  );
}

type RouteProps = { path: string; element: ReactElement };
export function Route(_props: RouteProps) {
  return null;
}

function matchRoute(pattern: string, pathname: string) {
  if (pattern === "*") return { params: {} };
  const route = pattern.split("/").filter(Boolean);
  const actual = pathname.split("/").filter(Boolean);
  if (route.length !== actual.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < route.length; i += 1) {
    if (route[i].startsWith(":"))
      params[route[i].slice(1)] = decodeURIComponent(actual[i]);
    else if (route[i] !== actual[i]) return null;
  }
  return { params };
}

export function Routes({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();
  for (const child of Children.toArray(children)) {
    if (!isValidElement<RouteProps>(child)) continue;
    const match = matchRoute(child.props.path, pathname);
    if (match)
      return (
        <ParamsContext.Provider value={match.params}>
          {child.props.element}
        </ParamsContext.Provider>
      );
  }
  return null;
}

export function Navigate({
  to,
  replace = true,
}: {
  to: string;
  replace?: boolean;
}) {
  const navigate = useNavigate();
  useEffect(() => navigate(to, replace), [navigate, replace, to]);
  return null;
}
