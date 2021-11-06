import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

RouteWithLayout.defaultProps = {
  component: () => null,
  layout: null,
  exact: true,
};

RouteWithLayout.propTypes = {
  component: PropTypes.func,
  layout: PropTypes.func,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

export default function RouteWithLayout({ component: Component, layout: Layout, exact, path }) {
  return (
    <Route {...{ exact, path }}>
      {Layout ? (
        <Layout>
          <Component />
        </Layout>
      ) : (
        <Component />
      )}
    </Route>
  );
}
