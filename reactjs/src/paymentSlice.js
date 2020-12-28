const initialState = {}

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case 'payment/paymentSet': {
      //console.log(action.payload)
      return action.payload;
    }
    case 'payment/paymentEdited': {
      var c = {...state};
      var field = action.payload[0];
      var value = action.payload[1];
      c[field] = value;
      if(field=="rate"||field=="duration"){
        c.amount=parseInt(c.rate)*parseInt(c.duration)
        //var x = [];
        //x.push("amount");
        //console.log(parseInt(reduxPayment.rate))
        //console.log(parseInt(reduxPayment.duration))
        //var amount = parseInt(reduxPayment.rate)*parseInt(reduxPayment.duration)
        //x.push(amount)
        //dispatch({type:'payment/paymentEdited', payload:x})
      }
      //console.log(c);
      return c;
    }
    default:
      return state
  }
}
