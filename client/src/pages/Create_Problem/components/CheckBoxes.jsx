import React from 'react';

const CheckBoxes = ({ register }) => {
    
    return (
        <div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="basic" value="basic" {...register("difficulty" , { required: true })} />
            <label className="form-check-label" htmlFor="basic">Basic</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="easy" value="easy" {...register("difficulty" , { required: true })} />
            <label className="form-check-label" htmlFor="easy">Easy</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="medium" value="medium" {...register("difficulty" , { required: true })} />
            <label className="form-check-label" htmlFor="medium">Medium</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="hard" value="hard" {...register("difficulty" , { required: true })} />
            <label className="form-check-label" htmlFor="hard">Hard</label>
        </div>
    </div>
    );
};

export default CheckBoxes;
