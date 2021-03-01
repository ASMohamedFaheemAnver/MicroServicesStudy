import buildClient from "../api/build-client";

const Index = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? (
    <h1>you are logged in</h1>
  ) : (
    <h1>you are not logged in</h1>
  );
};

Index.getInitialProps = async (context) => {
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
  const client = buildClient(context);
  const res = await client.get("/api/users/current-user");
  return res.data;
};

export default Index;
