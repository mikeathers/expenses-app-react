import React from "react";

class OtherExpenseForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      description: props.expenseType ? ( props.expenseType === "travel" ? "" : props.description ) : ( "" ),
      totalCost: props.totalCost ? (props.totalCost / 100).toString() : "",
      notes: props.notes ? props.notes : "",
      expenseType: props.expenseType
    };
  };  

  updateState = (state, data) => {
    this.setState({ [state]: data }, () => { this.onHandleData(); });
  };

  onChange = (e) => {
    const data = e.target.value;
    const id = e.target.id;

    switch (id) {
      case "description":
        return this.updateState("description", data);
      case "totalCost":
        if (!data || data.match(/^\d{1,}(\.\d{0,2})?$/)){
          this.updateState("totalCost", data);
        }       
       break;
      case "notes":
        return this.updateState("notes", data);
      default: 
        return;
    }
  }
  
  onHandleData = () => {
    this.props.onHandleData({
      description: this.state.description,
      totalCost: parseFloat(this.state.totalCost, 10) * 100,
      notes: this.state.notes
    });
  }
  render() {
    return (
      <div>       
      <div className="input-group__item">
        <label>Description:
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            className="text-input text-input__other"
            value={this.state.description}
            onChange={this.onChange}
          />
          </label> 
          </div>
          <div className="input-group__item">  
          <label>Amount:
          <input
            type="number"
            id="totalCost"
            placeholder="Enter amount"
            className="text-input text-input__other"
            value={this.state.totalCost}
            onChange={this.onChange}
          />
          </label>  
          </div>
          <div className="input-group__item">
          <label>Notes:
          <textarea
            type="text"
            id="notes"
            placeholder="Enter notes"
            className="text-input text-input__other--notes"
            value={this.state.notes}
            onChange={this.onChange}
          />
          </label>  
          </div>
      </div>
    );
  }
}


export default OtherExpenseForm;