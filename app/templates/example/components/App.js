import React, { Component } from 'react';
import <%= moduleName %> from '<%= moduleName %>';


class App extends Component {
  render() {
    return (
      <p>
        {<%= moduleName %>()}
      </p>
    );
  }
}


export default App;
