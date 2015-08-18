import React, { Component } from 'react';
import <%= camelModuleName %> from '<%= moduleName %>';


class App extends Component {
  render() {
    return (
      <p>
        {<%= camelModuleName %>()}
      </p>
    );
  }
}


export default App;
