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

fetch("https://51.250.6.131/api/v1/offer", {
"headers": {
"accept": "_/_",
"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
"authorization": "Token 50a5c57735b3b0707a61622b9cd72dc475beea41",
"content-type": "application/json;charset=UTF-8",
"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
"sec-ch-ua-mobile": "?0",
"sec-ch-ua-platform": "\"Windows\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site"
},
"referrer": "http://localhost:8080/",
"referrerPolicy": "strict-origin-when-cross-origin",
"body": "{\"id\":\"\",\"created_at\":\"\",\"counterparty\":5,\"exploration_date\":\"\",\"end_customer\":\"\",\"company\":2,\"offer_products\":[{\"id\":1,\"price\":\"100\",\"discount\":0,\"count\":1,\"cost\":\"100\",\"offer\":null,\"product\":null}],\"total_cost\":\"\",\"supply_terms\":\"\",\"was_send\":\"\",\"send_datetime\":\"\",\"tech_docs_format\":\"pdf\"}",
"method": "POST",
"mode": "cors",
"credentials": "include"
});
