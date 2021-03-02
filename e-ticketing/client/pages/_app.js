import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import HeaderComponent from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <HeaderComponent currentUser={currentUser}></HeaderComponent>
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // server will send the requests
  // we have to use ingress to route our request to a targeted pod
  // http://service.namespace.svc.cluster.local

  // kubectl get namespace
  // kubectl get services -n .kube-system

  // let res;

  // if we execute in server
  // https://stackoverflow.com/questions/63649508/how-does-cross-namespace-communication-works-in-minkube/65856721#65856721
  // kubectl expose deployment ingress-nginx-controller --target-port=80 --type=ClusterIP -n kube-system
  // if (typeof window === "undefined") {
  //   res = await axios.get(
  //     "http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/current-user",
  //     {
  //       headers: req.headers,
  //     }
  //   );
  // } else {
  //    we are on the browser
  //   res = await axios.get("/api/users/current-user");
  // }
  const client = buildClient(appContext.ctx);
  const res = await client.get("/api/users/current-user");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { ...res.data, pageProps };
};

export default AppComponent;
