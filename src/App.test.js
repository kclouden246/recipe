import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';

test('toggleAddRecipeForm() modifies isAddRecipeFormDisplayed state value to toggle visibility of a form on the page ', () => {
  const wrapper = shallow(<App />)
  wrapper.instance().toggleAddRecipeForm()

  wrapper.update()
  expect(wrapper.state().isAddRecipeFormDisplayed).toBeTruthy()
  expect(wrapper.exists("#recipe-form")).toEqual(true)

  wrapper.instance().toggleAddRecipeForm()
  expect(wrapper.exists("#recipe-form")).toEqual(false)
  expect(wrapper.state().isAddRecipeFormDisplayed).toBeFalsy()

});
test('the Add Recipe button onClick calls the toggleAddRecipeForm method', () => {
  const wrapper = shallow(<App />)
  wrapper.instance().toggleAddRecipeForm = jest.fn()
  wrapper.instance().forceUpdate() 
  // forceUpdate needs to be used because the wrapper instance that has already been rendered is not using the mock function, 
  // so React does not automatically detect that the method definition has been changed
  const button = wrapper.find('#add-recipe')

  button.simulate('click')

  expect(wrapper.instance().toggleAddRecipeForm).toHaveBeenCalled()
});
test('submitting the form calls the submitRecipe method', () => {
  const wrapper = shallow(<App />)
  wrapper.setState({isAddRecipeFormDisplayed: true})
  wrapper.instance().submitRecipe = jest.fn()
  wrapper.instance().forceUpdate()

  wrapper.find('#recipe-form').simulate("submit")
  expect(wrapper.instance().submitRecipe).toHaveBeenCalled()
});

test('submitRecipe() modifies the recipes value in state', () => {
  const wrapper = shallow(<App />)
  const recipeName = "Hot Pockets"
  const recipeInstructions = "microwave for 60 seconds"
  wrapper.setState({
    isAddRecipeFormDisplayed: true,
    newRecipeName: recipeName,
    newRecipeInstructions: recipeInstructions
  })
  const submittedRecipe = { name: recipeName, instructions: recipeInstructions }

  const mockPreventDefault = jest.fn()

  wrapper.find('#recipe-form').simulate("submit", { 
    preventDefault: mockPreventDefault 
  })
  expect(mockPreventDefault).toHaveBeenCalled()
  expect(wrapper.state().recipes).toEqual([submittedRecipe])
})