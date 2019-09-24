import React from 'react';

import './error-boundry.styles.scss';

class ErrorBoundry extends React.Component {
  state = {
    hasErrored: false
  };

  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className='error-image-overlay text-center'>
          <div className='error-image-container mt-4' />
          <h2 className='lead mt-4'>Sorry this page is broken</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
