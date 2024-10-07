import axios from "axios";
import { Component } from "react"
import MultiCard from "./MultiCard";
import RandomWeighted from "./RandomWeighted";
import RegularCard from "./RegularCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faSpinner);

class FlashCard extends Component{
    constructor() {
        super();
        this.apiHostPath = `https://aws-services.robertbunch.dev/services`;
        this.state = {
            flipClass : "",
            questionData : ""
        };
    }

    flip = (e) => {
        let newFlip = this.state.flipClass === "" ? "flip" : "";
        this.setState({
            flipClass : newFlip,
        });
    }

    newCard = () => {
        let path;
        const cardStyle = this.props.cardStyle;

        if ((cardStyle === 'Random') || (cardStyle === 'Regular')){
            path = this.apiHostPath + '/all';
        }
        else if (cardStyle === 'Weighted') {
            path = this.apiHostPath + '/weighted';
        }
        else {
            path = this.apiHostPath + '/multi';
        }

        axios.get(path).then((response) => {
            this.setState({
                questionData : response.data,
            });
            this.props.nowReady();
        })
    }

    render () {
        if(!this.props.ready){
            this.newCard();
            return(
                <div className="spinner-wrapper">
                    <FontAwesomeIcon icon="spinner" size="6x" spin/>
                </div>
            )
        }

        const cardStyle = this.props.cardStyle;
        let card;
        if(cardStyle === 'Multi'){
            card = <MultiCard questionData={this.state.questionData} />
        }
        else if(cardStyle === 'Regular'){
            card = <RegularCard questionData={this.state.questionData} />
        }
        else{
            card = <RandomWeighted questionData={this.state.questionData} />
        }

        return (
            <>
                <div className="row align-items-center card-holder">
                    <div className={`col-sm-6 offset-sm-3 card mb-3 ${this.state.flipClass}`} onClick={this.flip}>
                        {card}
                    </div>
                </div>
                <button onClick={this.newCard} className="btn btn-primary btn-lg">Next Question!</button>
            </>
        );
    }
}

export default FlashCard;