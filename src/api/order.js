//developing
// const postBaseUrl = 'http://localhost:3000/api';
const postBaseUrl = 'http://172.20.137.183:3000/api';
//developing
//const postBaseUrl = 'http://waffle-dev.us-west-2.elasticbeanstalk.com/api';

export function CreateOrder(name, email, phone, time, products, products_pan, products_drinck,total_price) {
    let url = `${postBaseUrl}/orders`;

    console.log(`Making POST request to: ${url}`);
    var result = [name,'\n', email,'\n', phone, '\n', time,'\n'];
    for (let i = 0; i < products_pan.length; i++) {
      result.push(products_pan[i].name);
      result.push(" : ");
      result.push(products_pan[i].quantity);
      result.push('\n');
    }
    for (let i = 0; i < products_drinck.length; i++) {
      result.push(products_drinck[i].name);
      result.push(" : ");
      result.push(products_drinck[i].quantity);
      result.push('\n');
    }
    const message = result.join("");

    console.log(message);
    return fetch(url,{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        time,
        products,
        message,
        total_price
      })
    }).then(function(res) {
      if(res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    }).catch(function(err) {
        console.log(err);
    });
}
export function CreateUser(userid, name, email){
  let url = `${postBaseUrl}/user`;
  console.log(`Making POST request to: ${url}`);
  return fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({userid, name, email})
  }).then(function(res) {
      if(res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);
        return res.json();
  }).catch(function(err) {
      console.log(err);
  });
}

export function listOrder(userid, name, email){
    let url = `${postBaseUrl}/record`;
    console.log(`Making POST request to: ${url}`);
    return fetch(url, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid, name, email})
    }).then(res => {
        if(res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);
        console.log(res);
        return res.json();
    });
}
