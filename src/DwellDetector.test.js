import React from 'react';
import renderer, { act } from 'react-test-renderer';
import DwellDetector from '../index';

const simpleSetupFixture = () => {
  const DWELLING_TIME = 500;
  const mockDwellHandler = jest.fn();
  const mockChildHoverHandler = jest.fn();
  const childProps = { aKey: 'aValue', onMouseOver: mockChildHoverHandler };
  const child = <div {...childProps} />;
  let component;
  act(() => {
    component = renderer.create(
      <DwellDetector onDwell={mockDwellHandler}>{child}</DwellDetector>
    );
  });
  return {
    DWELLING_TIME,
    child,
    childProps,
    component,
    mockChildHoverHandler,
    mockDwellHandler,
  };
};

const multiChildSetupFixture = () => {
  const DWELLING_TIME = 500;
  const mockDwellHandler = jest.fn();
  const mockChildHoverHandler = jest.fn();
  const childOneProps = {
    aKey: 'childOne',
    onMouseOver: mockChildHoverHandler,
  };
  const childTwoProps = {
    aKey: 'childOne',
    onMouseOver: mockChildHoverHandler,
  };
  const childOne = <div {...childOneProps} />;
  const childTwo = <div {...childTwoProps} />;
  let component;
  act(() => {
    component = renderer.create(
      <DwellDetector onDwell={mockDwellHandler}>
        {childOne}
        {childTwo}
      </DwellDetector>
    );
  });
  return {
    DWELLING_TIME,
    childOne,
    childTwo,
    childOneProps,
    childTwoProps,
    component,
    mockChildHoverHandler,
    mockDwellHandler,
  };
};

describe('DwellDetector', () => {
  it('calls onDwell after dwelling time elapses', done => {
    const { component, mockDwellHandler, DWELLING_TIME } = simpleSetupFixture();

    act(() => component.root.findByType('div').props.onMouseOver());

    setTimeout(() => {
      expect(mockDwellHandler).toBeCalled();
      done();
    }, DWELLING_TIME);
  });

  it("doesn't call onDwell before dwelling time elapses", done => {
    const { component, mockDwellHandler, DWELLING_TIME } = simpleSetupFixture();
    // Can't push wait time too close to DWELLING_TIME or test will become flaky
    const waitTimeBeforeAsserting = DWELLING_TIME / 2;
    act(() => component.root.findByType('div').props.onMouseOver());
    setTimeout(() => {
      expect(mockDwellHandler).not.toBeCalled();
      done();
    }, waitTimeBeforeAsserting);
  });

  it('calls onDwell with elemProp data when called', done => {
    const {
      DWELLING_TIME,
      childProps,
      component,
      mockDwellHandler,
    } = simpleSetupFixture();

    act(() => component.root.findByType('div').props.onMouseOver());

    setTimeout(() => {
      expect(mockDwellHandler.mock.calls[0][1]).toStrictEqual(childProps);
      done();
    }, DWELLING_TIME);
  });

  it("doesn't call onDwell if mouse leaves before dwelling time elapses", () => {
    const { component, mockDwellHandler } = simpleSetupFixture();

    act(() => {
      component.root.findByType('div').props.onMouseOver();
      component.root.findByType('div').props.onMouseOut();
    });
    expect(mockDwellHandler).not.toHaveBeenCalled();
  });

  it('calls child mouse events even if there is no dwell', () => {
    const { component, mockChildHoverHandler } = simpleSetupFixture();

    act(() => {
      component.root.findByType('div').props.onMouseOver();
      component.root.findByType('div').props.onMouseOut();
    });
    expect(mockChildHoverHandler).toHaveBeenCalled();
  });

  it("doesn't error if no onDwell prop is provided", () => {
    const mockChildHoverHandler = jest.fn();
    const childProps = { aKey: 'aValue', onMouseOver: mockChildHoverHandler };
    const child = <div {...childProps} />;
    const component = renderer.create(<DwellDetector>{child}</DwellDetector>);

    act(() => {
      component.root.findByType('div').props.onMouseOver();
      component.root.findByType('div').props.onMouseOut();
    });

    expect(mockChildHoverHandler).toHaveBeenCalled();
  });

  it('propagates correct data when there are multiple children', () => {
    const {
      DWELLING_TIME,
      component,
      mockDwellHandler,
      childOneProps,
      childTwoProps,
    } = multiChildSetupFixture();
    // Hover over first child
    const firstChildElement = component.root.findAllByType('div')[0];
    act(() => firstChildElement.props.onMouseOver());

    setTimeout(() => {
      // Check first call called with correct data
      const propsArgOfFirstCall = mockDwellHandler.mock.calls[0][1];
      expect(propsArgOfFirstCall).toStrictEqual(childOneProps);

      // Hover over second child
      const secondChildElement = component.root.findAllByType('div')[1];
      act(() => secondChildElement.props.onMouseOver());
      setTimeout(() => {
        // Check second call called with correct data
        const propsArgOfSecondCall = mockDwellHandler.mock.calls[1][1];
        expect(propsArgOfSecondCall).toStrictEqual(childTwoProps);
      }, DWELLING_TIME);
    }, DWELLING_TIME);
  });

  it('only calls onDwell for dwelled hovers', done => {
    const {
      DWELLING_TIME,
      component,
      mockDwellHandler,
      childTwoProps,
    } = multiChildSetupFixture();
    // Hover over first child but leave immedietely
    const firstChildElement = component.root.findAllByType('div')[0];
    // Hover over second element
    const secondChildElement = component.root.findAllByType('div')[1];
    act(() => {
      firstChildElement.props.onMouseOver();
      firstChildElement.props.onMouseOut();
      secondChildElement.props.onMouseOver();
    });

    // Wait for DWELLING_TIME before asserting
    setTimeout(() => {
      expect(mockDwellHandler.mock.calls[0][1]).toStrictEqual(childTwoProps);
      done();
    }, DWELLING_TIME);
  });
});
