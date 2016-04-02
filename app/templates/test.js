import { expect } from 'chai';
import <%= camelModuleName %> from './';


describe('<%= camelModuleName %>', () => {
  it('should ', () => {
    expect(<%= camelModuleName %>('unicorns')).to.equal('unicorns & rainbows');
  });

  it('should ', async () => {

  });
});
