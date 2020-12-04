// hoc used to load components asyncronously
import React from 'react';

const asyncComponent = (importComponent) => {
  return class extends React.Component {
    state = {
      component: null,
    };

    componentDidMount() {
      // importComponent() -function call -> returns a promise
      importComponent().then((cmpnt) => {
        this.setState({ component: cmpnt.default });
      });
    }
    render() {
      const Comp = this.state.component;
      // pass props down to the Comp component
      // conditionally render Comp if Comp has been set
      return Comp ? <Comp {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
