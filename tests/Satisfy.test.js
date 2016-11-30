import React from 'react'
import test from 'tape'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'
import { spy } from 'sinon'
import Satisfy from '../src/Satisfy'

test('Does not render anything', (t) => {
  const markup = renderToString(<Satisfy action={ () => {} } />)
  t.equal(markup, '<!-- react-empty: 1 -->')
  t.end()
})

test('when no condition supplied, fires action on mount', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy action={ actionSpy } />)
  t.true(actionSpy.calledOnce)
  t.end()
})

test('when action is called, supplies additional props', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy action={ actionSpy } id={ 'testing' }/>)
  t.true(actionSpy.calledWith({ id: 'testing' }))
  t.end()
})

test('when no condition supplied and props change, action is re-fired', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy action={ actionSpy } id={ 'testing' }/>)
  component.setProps({ id: 'testing-changed' })
  t.true(actionSpy.calledTwice)
  t.end()
})

test('when action is called upon prop changes, supplies changed props', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy action={ actionSpy } id={ 'testing' }/>)
  actionSpy.reset();
  component.setProps({ id: 'testing-changed' })
  t.true(actionSpy.calledWith({ id: 'testing-changed' }))
  t.end()
})

test('when falsey condition supplied, fires action on mount', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy condition={ false } action={ actionSpy } />)
  t.true(actionSpy.calledOnce)
  t.end()
})

test('when falsey condition supplied, fires action on changed props', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy condition={ false } action={ actionSpy } id={ 'testing' } />)
  actionSpy.reset()
  component.setProps({ id: 'testing-changed' })
  t.true(actionSpy.calledOnce)
  t.end()
})

test('when truthy condition supplied, does NOT fire action on mount', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy condition={ true } action={ actionSpy } />)
  t.false(actionSpy.called)
  t.end()
})

test('when truthy condition supplied, does NOT fire action on changed props', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy condition={ true } action={ actionSpy } id={ 'testing' } />)
  component.setProps({ id: 'testing-changed' })
  t.false(actionSpy.called)
  t.end()
})

test('when condition becomes falsey, action is fired', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy condition={ true } action={ actionSpy } id={ 'testing' } />)
  component.setProps({ condition: false })
  t.true(actionSpy.calledOnce)
  t.end()
})

test('when condition becomes truthy, action is NOT fired', (t) => {
  const actionSpy = spy()
  const component = mount(<Satisfy condition={ false } action={ actionSpy } id={ 'testing' } />)
  actionSpy.reset();
  component.setProps({ condition: true })
  t.false(actionSpy.called)
  t.end()
})
