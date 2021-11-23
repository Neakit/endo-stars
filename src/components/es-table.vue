<template>
  <div>
    <b-table
      sticky-header="50vh"
      :items="items"
      :fields="fields"
      responsive="sm"
      ref="selectableTable"
    >
        <template #head(selected)="data">
            <b-form-checkbox
                id="checkbox-head"
                @input="selectAllItems(data)"
            />
        </template>
        <template #cell(selected)="{ item, index }">
            <b-form-checkbox
                :id="`checkbox-${index}`"
                @input="selectItem(index, item)"
            />
        </template>
    </b-table>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        modes: ['multi', 'single', 'range'],
        fields: ['selected', 'isActive', 'age', 'first_name', 'last_name'],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
        ],
        selectMode: 'multi',
        selected: []
      }
    },
    methods: {
        selectItem(index, item) {
            const _item = { id: index, ...item };
            const searchIndex = this.selected.findIndex(i => i.id === _item.id);
            if(searchIndex === -1) {
                this.selected.push(_item);
            } else {
                this.selected.splice(searchIndex, 1);
            }
        },
      onRowSelected(items) {
        this.selected = items
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      selectAllItems(data) {
          console.log('asda', data);
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },
      selectRow(item, index) {
        console.log(item, index)
        // Rows are indexed from 0, so the third row is index 2
        this.$refs.selectableTable.selectRow(index)
      },
      // unselectThirdRow() {
      //   // Rows are indexed from 0, so the third row is index 2
      //   this.$refs.selectableTable.unselectRow(2)
      // }
    }
  }
</script>