import React, { Component, Fragment,  } from "react";

import Select from "react-select";
import { colourOptions } from "./docs/data";

export default class SingleSelect extends Component {
  selectRef = null;

  clearValue = () => {
    this.selectRef.select.clearValue();
  };

  render() {
    return (
      <Fragment>
        <Select
          ref={ref => {
            this.selectRef = ref;
          }}
          className="basic-single"
          classNamePrefix="select"
          defaultValue={colourOptions[0]}
          name="color"
          options={colourOptions}
        />
        <button onClick={this.clearValue}>clear</button>
      </Fragment>
    );
  }
}
