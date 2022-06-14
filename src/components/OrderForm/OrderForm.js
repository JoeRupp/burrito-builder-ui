import React, { Component } from "react";
import apiCalls from "../../apiCalls";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleIngredientChange = (event) => {
    event.preventDefault();
    if (
      this.state.ingredients.find((ingredient) => {
        return event.target.name === ingredient;
      })
    ) {
      console.log("already added ingredient");
    } else {
      this.setState({
        ingredients: [event.target.name, ...this.state.ingredients],
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name || this.state.ingredients.length === 0) {
      console.log("you havent filled out the form completely");
      this.clearInputs();
    } else {
      const newOrder = {
        name: this.state.name,
        ingredients: this.state.ingredients,
      };

      apiCalls.makeOrder(newOrder).then(() => this.props.addNewOrder());
      this.clearInputs();
    }
  };

  clearInputs = () => {
    this.setState({ name: "", ingredients: [] });
  };

  render() {
    const possibleIngredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          className="ingredientBtn"
          onClick={(e) => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleNameChange(e)}
        />

        {ingredientButtons}

        <p>Order: {this.state.ingredients.join(", ") || "Nothing selected"}</p>

        <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
      </form>
    );
  }
}

export default OrderForm;
