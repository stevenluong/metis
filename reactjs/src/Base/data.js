import apiConfig from './athena.config';
import moment from 'moment';

export default {
  getCustomers: function(cb){
    //var news = rows;
    //news.push({})
    //var start = new Date(currentDate);
    //console.log("e:"+e);
    //var q = "https://apollo-loopback.slapps.fr/api/News?filter[where][and][0][datetime][gt]="+s+"&filter[where][and][1][datetime][lt]="+e
    var q = apiConfig.server+apiConfig.dbUrl+"/customers";
    console.log(q)
    fetch(q)
        .then(result=>result?result.json():[])
        .then(customers=>{
            //console.log(titles);
            //this.setState({titles:titles});
            var tmp = []
            tmp = customers.map(n=>{
              return {
                ...n,
                //link:n.link.replace("http:","https:"),
                //image_link:n.image_link?n.image_link.replace("http:","https:"):"",
                //time:moment(n.datetime).format("HH:mm"),
                //title:n.title.trim().charAt(0).toUpperCase() + n.title.trim().slice(1)
              }
            });
            //news = titles;
            cb(tmp);
        });
    //return news;
  },
  getBookings: function(cb){
    //var news = rows;
    //news.push({})
    //var start = new Date(currentDate);
    //console.log("e:"+e);
    //var q = "https://apollo-loopback.slapps.fr/api/News?filter[where][and][0][datetime][gt]="+s+"&filter[where][and][1][datetime][lt]="+e
    var q = apiConfig.server+apiConfig.dbUrl+"/bookings";
    //console.log(q)
    fetch(q)
        .then(result=>result?result.json():[])
        .then(bookings=>{
            //console.log(titles);
            //this.setState({titles:titles});
            var tmp = []
            tmp = bookings.map(n=>{
              return {
                ...n,
                //link:n.link.replace("http:","https:"),
                //image_link:n.image_link?n.image_link.replace("http:","https:"):"",
                //time:moment(n.datetime).format("HH:mm"),
                //title:n.title.trim().charAt(0).toUpperCase() + n.title.trim().slice(1)
              }
            });
            //news = titles;
            cb(tmp);
        });
    //return news;
  },
  getPayments: function(cb){
    //var news = rows;
    //news.push({})
    //var start = new Date(currentDate);
    //console.log("e:"+e);
    //var q = "https://apollo-loopback.slapps.fr/api/News?filter[where][and][0][datetime][gt]="+s+"&filter[where][and][1][datetime][lt]="+e
    var q = apiConfig.server+apiConfig.dbUrl+"/payments";
    //console.log(q)
    fetch(q)
        .then(result=>result?result.json():[])
        .then(payments=>{
            //console.log(titles);
            //this.setState({titles:titles});
            var tmp = []
            tmp = payments.map(n=>{
              return {
                ...n,
                //link:n.link.replace("http:","https:"),
                //image_link:n.image_link?n.image_link.replace("http:","https:"):"",
                //time:moment(n.datetime).format("HH:mm"),
                //title:n.title.trim().charAt(0).toUpperCase() + n.title.trim().slice(1)
              }
            });
            //news = titles;
            cb(tmp);
        });
    //return news;
  },
  getInterests: function(cb){
    //var news = rows;
    //news.push({})
    //var start = new Date(currentDate);
    //console.log("e:"+e);
    //var q = "https://apollo-loopback.slapps.fr/api/News?filter[where][and][0][datetime][gt]="+s+"&filter[where][and][1][datetime][lt]="+e
    var q = apiConfig.server+apiConfig.dbUrl+"/interests";
    //console.log(q)
    fetch(q)
        .then(result=>result?result.json():[])
        .then(interests=>{
            //console.log(titles);
            //this.setState({titles:titles});
            var tmp = []
            tmp = interests.map(n=>{
              return {
                ...n,
                //link:n.link.replace("http:","https:"),
                //image_link:n.image_link?n.image_link.replace("http:","https:"):"",
                //time:moment(n.datetime).format("HH:mm"),
                //title:n.title.trim().charAt(0).toUpperCase() + n.title.trim().slice(1)
              }
            });
            //news = titles;
            cb(tmp);
        });
    //return news;
  },
  editCustomer:function(c,cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/customers/"+c._key;
    //var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
    //console.log(q)
    fetch(q,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(c),
    })
        .then(result=>result.json())
        .then(o=>{
            //console.log(u);
            console.log("Customer updated");
            cb(o)
        });
  },
  addCustomer:function(c,cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/customers";
    //var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
    //console.log(q)
    //console.log(q)
    fetch(q,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(c),
    })
        .then(result=>result.json())
        .then(o=>{
            //console.log(o);
            console.log("Customer created");
            cb(o)
            //cb(Object.assign(user,u));
        });
  },
  editInterest:function(i,cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/interests/"+i._key;
    //var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
    //console.log(q)
    fetch(q,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(i),
    })
        .then(result=>result.json())
        .then(o=>{
            //console.log(u);
            console.log("Interest updated");
            cb(o)
        });
  },
  addInterest:function(i,cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/interests";
    //var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
    //console.log(q)
    //console.log(q)
    fetch(q,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(i),
    })
        .then(result=>result.json())
        .then(o=>{
            ///console.log(o);
            console.log("Interest created");
            cb(o)
            //cb(Object.assign(user,u));
        });
  },
  editBooking:function(b,cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/bookings/"+b._key;
    //var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
    //console.log(q)
    fetch(q,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(b),
    })
        .then(result=>result.json())
        .then(o=>{
            //console.log(u);
            console.log("Booking updated");
            cb(o)
        });
  },
  addBooking:function(b,cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/bookings";
    //var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
    //console.log(q)
    //console.log(q)
    fetch(q,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(b),
    })
        .then(result=>result.json())
        .then(o=>{
            ///console.log(o);
            console.log("Booking created");
            cb(o)
            //cb(Object.assign(user,u));
        });
  },
  editPayment:function(p,cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/payments/"+p._key;
    //var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
    //console.log(q)
    fetch(q,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    })
        .then(result=>result.json())
        .then(o=>{
            //console.log(u);
            console.log("Payments updated");
            cb(o)
        });
  },
  addPayment:function(p,cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/payments";
    //var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user._key
    //console.log(q)
    //console.log(q)
    fetch(q,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    })
        .then(result=>result.json())
        .then(o=>{
            ///console.log(o);
            console.log("Payments created");
            cb(o)
            //cb(Object.assign(user,u));
        });
  },
}
