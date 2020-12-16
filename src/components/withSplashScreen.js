import React, {Component} from 'react';
import Footsteps from './Loaders/Footsteps'
function LoadingMessage() {
  return (
    <div className="d-flex h-100">
        <div className="align-self-center w-100">
            <h1 className="text-center pb-3">Hold on...Were just getting you app ready!</h1>
            <Footsteps />
        </div>
    </div>
  );
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500)
      } catch (err) {
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;