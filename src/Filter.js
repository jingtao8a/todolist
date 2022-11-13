import React from "react";
import "./css/Filter.css"

class Filter extends React.Component {
    render() {
        return (
            <div className='Filter'>
                <button className="AllButton" onClick={() => this.props.modifyTypeOfState("All")}>All</button>
                <button className="TodoButton" onClick={ () => this.props.modifyTypeOfState("Todo")}>Todo</button>
                <button className="DoneButton" onClick={ () => this.props.modifyTypeOfState("Done")}>Done</button>
            </div>
        );
    }
}

export default Filter;