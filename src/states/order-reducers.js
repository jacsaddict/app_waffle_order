import uuid from 'uuid/v4';

const initOrderState = {
    item :["原味鬆餅","巧克力鬆餅","抹茶鬆餅","花生鬆餅"],
    quantity :[0,0,0,0],
    price : [25,30,30,30],
    present : []
};


export function order(state = initOrderState, action){
    switch(action.type){
        case '@ORDER/ADD':
            state.quantity[action.id] ++;
            return{
                ...state,
            };

        case '@ORDER/MINUS':
            state.quantity[action.id] --;
            return{
                ...state,
            };
        case '@ORDER/ADDTOCART':

          var UpdatPresent = state.present.filter(function(item){
            return item.name !== state.item[action.id];
          })

          if(state.quantity[action.id] > 0)
          {
            UpdatPresent.push({name:state.item[action.id],
                                quantity:state.quantity[action.id],
                              price:state.price[action.id]});
          }
            return{
              ...state,
              present : UpdatPresent
            };
         case '@ORDER/DELETEPANCAKE':
            var UpdatPresent = state.present.filter(function(item){
              return item.name !== action.item;
            })
            for (var i = 0; i < state.item.length; i++) {
              if(state.item[i] === action.item){
                state.quantity[i] = 0;
              }
            }
            return{
              ...state,
              present: UpdatPresent
            };
        case '@ORDER/CLEARPANCAKE':
            return{
              ...state,
              present : [],
              quantity : [0,0,0,0]
            }
        case '@ORDER/QORDERPANCAKE':
            var UpdatPresent = action.temp.filter(function(mixRecord){
          return state.item.indexOf(mixRecord.name) > -1;
        });
            return{
              ...state,
              present : UpdatPresent,
              quantity : [0,0,0,0]
            }
        default:
            return state;
    }
}





const initOrderState2 = {
    item2 : ["檸檬紅茶","冰淇淋紅茶","冬瓜檸檬茶","百香雙響炮","英式水果茶"],
    quantity2: [0,0,0,0,0],
    price2: [35,30,35,40,30],
    present2: []
};

export function order2(state = initOrderState2, action){
  switch(action.type){
      case '@ORDER2/ADD_DRINK':
          state.quantity2[action.id]++;
          return{
              ...state
          };
      case '@ORDER2/MINUS_DRINK':

          state.quantity2[action.id]--;
          return{
            ...state
          };
      case '@ORDER2/ADDTOCART_DRINK':

        var UpdatPresent = state.present2.filter(function(item){
          return item.name !== state.item2[action.id];
        })

        if(state.quantity2[action.id] > 0)
        {
          state.present2 = [...state.present2,
                              {name:state.item2[action.id],
                              quantity:state.quantity2[action.id],
                              price:state.price2[action.id]}];
        }

          return{
            ...state
          };
      case '@ORDER2/DELETEDRINK':
          var UpdatPresent = state.present2.filter(function(item){
            return item.name !== action.item;
          })
          for (var i = 0; i < state.item2.length; i++) {
            if(state.item2[i] === action.item){
              state.quantity2[i] = 0;
            }
          }
          return{
            ...state,
            present2: UpdatPresent
          };
      case '@ORDER2/CLEARDRINK':
        return{
            ...state,
            present2: [],
            quantity2: [0,0,0,0,0]
        };
      case '@ORDER/QORDERDRINK':
      var UpdatPresent = action.temp.filter(function(mixRecord){
          return state.item2.indexOf(mixRecord.name) > -1;
          });
          return{
            ...state,
            // console.log(action.temp);
            present2 : UpdatPresent,
            quantity : [0,0,0,0]
          }
      default:
          return state;
  }
}





const initRecordState = {
  records : [],
  // records2 : [],
  client :[]
};

export function record(state = initRecordState,action){
  switch(action.type){
    case '@RECORD/SUBMIT':
        if(action.p1.length !== 0 || action.p2.length !== 0){
          state.records = [...state.records,action.p1,action.p2];
        }
      return{
        ...state
      };
      case '@RECORD/QORDER':
        return{
            present: state.records[2*action.id],
            present2: state.records[2*action.id+1],
        };
    default:
        return state;
  }
}

const initIntro = {
  show_intro:1
};

export function Intro(state = initIntro,action){
  switch(action.type){
    case'@INTRO/INTROCLOSE':
      return{
        ...state,
        show_intro : 0
      };
    default:
      return state;
  }
}


const initMainButtonState = {
  display:true
};



export function MainButton(state = initMainButtonState,action){
  switch(action.type){
    case '@MAINBUTTON/MAINDISPLAY':
      return{
        ...state,
        display: !state.display

      };
    default:
        return state;
  }
}

const initIconState = {
  bounce: false
};

export function ShoppingCartIcon(state = initIconState,action) {
    switch (action.type) {
      case '@ICONFEEDBACK/BOUNCE':
        return{
          ...state,
          bounce: !state.bounce
        };
      default:
        return state;
    }
}
