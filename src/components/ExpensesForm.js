import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import * as MyAPI from '../utils/MyAPI'
import Comparison from './Comparison'
import './ExpenseForm.css'

// semantic-ui
import { Container, Form, Input, Button, Grid } from 'semantic-ui-react'

class ExpensesForm extends Component {
//grab user key to associate with form
//hidden field
    state = {
        housing: null,
        utilities: null,
        transportation: null,
        food: null,
        entertainment: null,
        debt: null,
        personal: null,
        savings: null,
        showgraph: false
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
      }

    onSubmit = () => {

      const {housing, utilities, transportation, food, entertainment, debt, personal, savings } = this.state
      const params = {housing: housing, utilities: utilities, transportation: transportation , food: food, 
        entertainment:entertainment, debt: debt, personal: personal, savings: savings}

      MyAPI.expenses(params)
      .then((data) => {

        return new Promise((resolve, reject) => {
  
          if (data.status !== 'success'){
            let error_text = 'Error';
            if (data.detail){
              error_text = data.detail
            }
            reject(error_text)
  
          
          }
        })
      })
      .catch((err) => {
        console.log("err:", err)

      })
      this.setState ({showgraph: true});
    }
      render() {

        return(
          <div className="wallpaper">          
          <Container text className='create_acount_form'>  
         <div className="box3">
          <h3>Customize your budget plan</h3>
          <p><b>Fill in the below information and submit!</b></p>
         </div>
          
            <Form onSubmit={this.onSubmit} style={{marginTop:60}}>
              <Grid>

              <Grid.Column textAlign='left' width={16}>
                  <label>Income</label>
                  <Input
                    style={{width: '100%'}}
                    name='income'
                    onChange={this.handleChange}
                    placeholder='yearly income' />
                </Grid.Column>

                <Grid.Column textAlign='left' width={16}>
                  <label>Housing</label>
                  <Input
                    style={{width: '100%'}}
                    name='housing'
                    onChange={this.handleChange}
                    placeholder='rent/mortgage payments' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Utilities</label>
                  <Input
                    style={{width: '100%'}}
                    name='utilities'
                    onChange={this.handleChange}
                    placeholder='utilities' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Transportation</label>
                  <Input
                    style={{width: '100%'}}
                    name='transportation'
                    onChange={this.handleChange}
                    placeholder='Gas, insurance, metropass and taxis ' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Food</label>
                  <Input
                    style={{width: '100%'}}
                    name='food'
                    onChange={this.handleChange}
                    placeholder='annual income' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Entertainment</label>
                  <Input
                    style={{width: '100%'}}
                    name='entertainment'
                    onChange={this.handleChange}
                    placeholder='Movies, concerts, etc.' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Debt</label>
                  <Input
                    style={{width: '100%'}}
                    name='debt'
                    onChange={this.handleChange}
                    placeholder='Monthly debt payments' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Personal</label>
                  <Input
                    style={{width: '100%'}}
                    name='personal'
                    onChange={this.handleChange}
                    placeholder='Clothing, Cosmetics, etc.' />
                </Grid.Column>

                 <Grid.Column textAlign='left' width={16}>
                  <label>Savings</label>
                  <Input
                    style={{width: '100%'}}
                    name='savings'
                    onChange={this.handleChange}
                    placeholder='savings' />
                </Grid.Column>

                <Grid.Column  width={16}>
                  <Button
                    style={{width: '100%'}}
                    type='submit'>Submit</Button>
                </Grid.Column>
    
              </Grid>
                 
            </Form>

            {this.state.showgraph ?            
            <Comparison 
            income = {this.state.income}
            housing = {this.state.housing}
            utilities = {this.state.utilities}
            transportation = {this.state.transportation}
            food = {this.state.food}
            entertainment = {this.state.entertainment}
            debt = {this.state.debt}
            personal= {this.state.personal}
            savings = {this.state.savings}
            /> : null}
          </Container>
          </div>
        )
    }
}
// react-redux
function mapStateToProps ( {user} ) {
  return {
    user
  }
}

export default withRouter( connect( mapStateToProps)(ExpensesForm));
