import React from 'react';
//import './App.css';

class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false,
    recipes: [],
    newRecipeName: "",
    newRecipeInstructions: ""
  }
  
  toggleAddRecipeForm = () => {
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    
    this.setState({[name]: target.value});
  }
  
  submitRecipe = (event) => {
    event.preventDefault()
    let obj = {
      name: this.state.newRecipeName, 
      instructions: this.state.newRecipeInstructions
    }
    this.state.recipes.push(obj)
    this.setState(this.state.recipes)
    /*this.setState({recipes: [
      {
        name: this.state.newRecipeName, 
        instructions: this.state.newRecipeInstructions
      }
    ]})*/
  }

  render(){
    const addNewRecipeForm = (
      <form id="recipe-form" onSubmit={this.submitRecipe}>
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text" name="newRecipeName" onChange={this.handleChange} value={this.state.newRecipeName} />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea name="newRecipeInstructions" 
                  placeholder="write recipe instructions here..." 
                  onChange={this.handleChange} 
                  value={this.state.newRecipeInstructions} />
        <input type="submit" />
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
          this.state.isAddRecipeFormDisplayed 
          ? addNewRecipeForm 
          : <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
        }
        {
          this.state.recipes.length > 0 ?
          <ul>
              {
              this.state.recipes.map((rep, index) => (
                <div>
                  <li>{ rep.name } </li>
                  <p>{ rep.instructions } </p>
                </div>
              ))
            }
          </ul> :
          <p>There are no recipes to list.</p>
        }
        
      </div>
    )
  }
}

export default App;
