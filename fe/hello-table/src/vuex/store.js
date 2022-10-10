import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        tickets: []
    },
    mutation: {
        SET_TICKETS_TO_STATE: (state, tickets) => {
            state.tickets = tickets;
        }
    },
    actions: {
         GET_TICKETS_FROM_API({commit}){
            return  axios.get('http://localhost:3000/api/ticketsGet')
                .then((tickets) => {
                    commit('SET_TICKETS_TO_STATE', tickets.data);
                   
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    getters: {
        TICKETS(state) {
            return state.tickets;
        }
    }
    
});


export default store;