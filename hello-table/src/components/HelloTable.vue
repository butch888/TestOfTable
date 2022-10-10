<template>
  <div class="hello">
    <div class="select">
        <select v-model="columnFilter" v-on:change="$emit('selected', columnFilter)">
          <option  value="column">column</option>
          <option value="condition">condition</option>
          <option value="fieldOfValue">fieldOfValue</option>
        </select>
        <select
          v-model="columnName"
          v-if="columnFilter == 'column'" 
          v-on:change="$emit('selected', columnName)">
            <option value="name">name</option>
            <option value="qty">qty</option>
            <option value="distance">distance</option>
        </select>
        <select 
            v-model="conditionFilter" 
            v-if="columnFilter == 'condition'"
            v-on:change="$emit('selected', conditionFilter)">
            <option value="1">{{'='}}</option>
            <option value="2">{{'содержит'}}</option>
            <option value="3">{{">"}}</option>
            <option value="4">{{'<'}}</option>
        </select>
        <input 
            v-model="myInput"
            v-if="columnFilter == 'condition' || columnFilter == 'fieldOfValue' "
            @input="event => myInput = event.target.value"
            v-on:keyup="getLength()"
          />
    </div>
    <div class="table">
        <table>
          <thead>
            <tr>
              <th>date</th>
              <th>name</th>
              <th>qty</th>
              <th>distance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in filteredList[pageNumber]"
                :key="ticket.id"
              >
                <td>{{ticket.date}}</td>
                <td>{{ticket.name}}</td>
                <td>{{ticket.qty}}</td>
                <td>{{ticket.distance}}</td>
            </tr>
          </tbody>
        </table>
      </div>    
      <div>
        <button 
            :disabled="pageNumber === 0"
            v-on:click="prevPage()"
            >
            Previous
        </button>
        <button 
            :disabled="pageNumber === filteredList.length - 1"
            v-on:click="nextPage()"
            >
            Next
        </button>
      </div>
      <div>
        <button 
            v-on:click="addData()"
            >
            add data
        </button>
      </div>
  </div>
</template>


<style>
    #filter.first-child {
      margin-left: 10px;
    }
    .table,
    .select {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    table, th, td {
      border: 1px solid black;
    }
    th, td {
      padding: 10px;
    }
    
</style>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
import {uniqueNamesGenerator, names} from 'unique-names-generator'

export default {
  name: 'HelloTable',
  data() {
    return {
      tickets: [],
      columnFilter: '',
      columnName: '',
      conditionFilter: '',
      myInput: '',
      pageNumber: 0
    };
  },
  computed: {
    ...mapGetters([
      'TICKETS'
    ]),
    filteredList() {
      let dataTable = this.tickets
      switch (this.columnName) {
        case 'name':
           dataTable = dataTable.sort((a, b) => a.name > b.name ? 1 : -1)
           break
        case 'qty':
           dataTable = dataTable.sort((a, b) => a.qty > b.qty ? 1 : -1)
           break
        case 'distance':
           dataTable = dataTable.sort((a, b) => a.distance > b.distance ? 1 : -1)
           break
      }

      switch (this.conditionFilter) {
        case '1':
           dataTable = dataTable.filter((value) => value.qty === +this.myInput) 
           break
        case '2':
          dataTable = dataTable.filter((value) => {
            let valueInput

            for (let field in value) {
              if (field == 'id' || field == "date") continue
              if (value[field].toString().includes(this.myInput)) {
                valueInput = value
              }
            }
           
            return valueInput
          })
          break
        case '3':
           dataTable = dataTable.filter((value) => value.qty > +this.myInput) 
           break
        case '4':
           dataTable = dataTable.filter((value) => value.qty < +this.myInput) 
           break
      }

      if (this.columnFilter == 'fieldOfValue') {
        dataTable = dataTable.filter((value) => {
            let valueInput

            for (let field in value) {
              if (field == 'id' || field == "date") continue
              if (value[field].toString().includes(this.myInput)) {
                valueInput = value
              }
            }
           
            return valueInput
          })
      }

      
      let pagination = []
      let arr = []
      for (let index in dataTable) {
        arr.push(dataTable[index])
        if (arr.length == 5 || dataTable.length == +index + 1) {
          pagination.push(arr)
          arr = []
        }
      }
      
      return pagination
    },
  },
  methods: {
    ...mapActions([
    'GET_TICKETS_FROM_API'
    ]),
    getLength () {
      this.filteredList
    },
    nextPage(){
        this.pageNumber++;
    },
    prevPage(){
      this.pageNumber--;
    },
    async addData(){
      for (let i = 0; i <= 100; i++){
        const distance = Math.round(Math.random() * 100)
        const qty = Math.round(Math.random() * 10)
        const randomName = uniqueNamesGenerator({ dictionaries: [names] })
        const date = new Date(Math.floor(Math.random() * Date.now()))
        const dataRequest = {
          distance: distance,
          qty: qty,
          name: randomName,
          date: date.toDateString()
        }
        await axios.post('http://localhost:3000/api/ticketsPost',  dataRequest).then((res) => console.log(res))
      }
      await axios.get('http://localhost:3000/api/ticketsGet')
      .then((response) => this.tickets = response.data) 
    }
  },
  async mounted() {
    const headers = {
        'Content-Type': 'text/plain'
    };
    await axios.get('http://localhost:3000/api/ticketsGet', {headers})
    .then((response) => this.tickets = response.data)         
  }
}
</script>

