import React from 'react';

const Food = (props) => {
    return (
        <div>
            <div className={props.name} id="block" onClick={(event) => {
                props.onClickAdd(event)
            }}>
                <img className={props.name} alt={props.name} src={props.src}/>{props.name} <p>{props.price + " KGS"}</p>
            </div>
        </div>
    );
};

export default Food;