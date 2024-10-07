import React from 'react';

function RandomWeighted(props) {
    console.log(props.questionData);
    const question = props.questionData;

    return(
        <>
            <div className="card-back">
                {question.service}
            </div>
            <div className="card-front">
                <div>{question.des}</div>
                <div>{question.cat}</div>
            </div>
        </>
    )
}

export default RandomWeighted;