export function add(id){
  return {
        type: '@ORDER/ADD',
        id
  };
}


export function minus(id){
  return {
        type: '@ORDER/MINUS',
        id
  };
}

export function add_to_cart(id){
  return {
        type: '@ORDER/ADDTOCART',
        id
  };
}

export function delete_from_cart_pancake(item){
  return {
        type: '@ORDER/DELETEPANCAKE',
        item
  };
}
export function clear_pancake(){
    return{
        type: '@ORDER/CLEARPANCAKE'
    }
}

export function q_order_pancake(temp){
  return {
        type: '@ORDER/QORDERPANCAKE',
        temp
  };
}




////////////////   drink     /////////////////
export function add_drink(id){
    return{
      type: '@ORDER2/ADD_DRINK',
      id
    };
}
export function minus_drink(id){
    return{
        type: '@ORDER2/MINUS_DRINK',
        id
    };
}
export function add_to_cart_drink(id){
    return{
      type: '@ORDER2/ADDTOCART_DRINK',
      id
    }
}
export function delete_from_cart_drink(item){
  return {
        type: '@ORDER2/DELETEDRINK',
        item
  };
}
export function clear_drink(){
    return{
        type : '@ORDER2/CLEARDRINK'
    };
  }
export function q_order_drink(temp){
  return {
        type: '@ORDER/QORDERDRINK',
        temp
  };
}






////////////////    Record     //////////////

export function q_order(id){
    return{
        type: '@RECORD/QORDER',
        id
    }
}


export function submit(p1,p2,name,phone,email,time){
    return{
        type: '@RECORD/SUBMIT',
        p1,
        p2,
        name,
        phone,
        email,
        time
    }
}


/////////////    Intro          //////////////
export function intro_close(){
    return{
      type: '@INTRO/INTROCLOSE'
    }
}


/////////////    MainButton     //////////////

export function main_display(){
    return{
      type: '@MAINBUTTON/MAINDISPLAY'
    }
}
