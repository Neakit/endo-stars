# endo-stars

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Frontend staging

| BRANCH |                                STAGE URL                                | Deployment service |
| ------ | :---------------------------------------------------------------------: | ------------------ |
| master | https://618fbb74f11ca8e6aa03c223--pedantic-shockley-f1b4f4.netlify.app/ | Netlify            |

```
const template = `
<div>
  <vue-bootstrap-typeahead
    class="mb-4"
    v-model="query"
    :data="users"
    :serializer="item => item.login"
    @hit="selectedUser = $event"
    placeholder="Search GitHub Users"
  />

 <h3>Selected User JSON</h3>
 <pre>{{ selectedUser | stringify }}</pre>
</div>
`

new Vue({
  template,
  components: {
    VueBootstrapTypeahead
  },
  data() {
    return {
      query: '',
      selectedUser: null,
      users: []
    }
  },
  watch: {
    // When the query value changes, fetch new results from
    // the API - in practice this action should be debounced
    query(newQuery) {
      axios.get(`https://api.github.com/search/users?q=${newQuery}`)
        .then((res) => {
          this.users = res.data.items
        })
    }
  },
  filters: {
    stringify(value) {
      return JSON.stringify(value, null, 2)
    }
  },
}).$mount('#app')
```
