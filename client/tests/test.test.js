import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import App from '../App';

describe('App', () => {

})

it('starts the app', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Routing).exists(true)
})