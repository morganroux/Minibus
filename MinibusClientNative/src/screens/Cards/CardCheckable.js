import React from 'react'
import { Container, Header, Content, Card, CardItem, Body, Text, Button, CheckBox} from 'native-base';

class CardCheckable extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            check: false
        }
    }

    onPress = () => {
        if (this.props.multiSelect) {
            this.setState((prevState) => ({
                check: !prevState.check
            }));
        }
        else {
            this.props.onSinglePress();
        }
    }
       
    render() {
        return (
            <Card>
                <CardItem button 
                    delayLongPress = {1000}
                    onPress={this.onPress}
                    onLongPress={this.props.onLongPress}>
                    <Body>
                        {this.props.multiSelect && 
                        <CheckBox 
                            onPress={this.onPress}
                            checked={this.state.check}/>
                        }
                        <Text>
                            {`${this.props.run.child} - ${this.props.run.type}`}
                        </Text>
                    </Body>
                    
                </CardItem>
            </Card>
        )}   
}

export default CardCheckable;