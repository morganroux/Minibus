import React from 'react'
import { Container, Header, Content, Card, CardItem, Body, Text, Button, CheckBox} from 'native-base';

class CardCheckable extends React.Component
{
    constructor(props) {
        super(props);
    }

    onPress = () => {
        if (this.props.multiSelect) {
            this.props.onCheck(this.props.run.id);
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
                    onLongPress={() => this.props.onLongPress(this.props.run.id)}>
                    <Body>
                        {this.props.multiSelect && 
                        <CheckBox 
                            onPress={this.onPress}
                            checked={!!this.props.checkboxs.find((item) => item === this.props.run.id)}/>
                        }
                        <Text>
                            {`${this.props.run.child} - ${this.props.run.type}`}
                        </Text>
                    </Body>
                    
                </CardItem>
            </Card>
        )
    }   
}

export default CardCheckable;