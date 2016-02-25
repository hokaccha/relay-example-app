import Relay from 'react-relay';

export default class AppRotue extends Relay.Route {
}

AppRotue.path = '/';
AppRotue.queries = {
  app: () => Relay.QL`query { app }`,
};
AppRotue.routeName = 'AppRoute';
