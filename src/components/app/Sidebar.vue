<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
        <router-link 
           v-for="link in links" :key="link.url"
           tag="li"
           :to="link.url"
           active-class="active"
          :exact="link.exact" 
        >
        <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
        </router-link>
    </ul>
</template>

<script>
export default {
    props: [
        'value'
    ],
    data: ()=> (
        {
            links: [
                { title: 'Bill', url: '/', exact: true},
                { title: 'History', url: '/history'},
                { title: 'New booking', url: '/addbooking'},
                { title: 'Categories', url: '/categories'}
            ]
        })
}
</script>