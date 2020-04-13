<template>
  <div>
       

        <section>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Price</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Open</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="book in bookings" :key="book.id">
                        <td>{{book.id}}</td>
                        <td>{{book.amount|currency('EUR')}}</td>
                        <td>{{book.description}}</td>
                        <td>{{book.date|date}}</td>
                        <td>{{book.category.title}}</td>
                        <td>
                            <button class="btn-small btn" @click="$router.push('/detail/'+ book.id)" v-tooltip="book.description">
                                <i class="material-icons">open_in_new</i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script>
export default {
    name: 'bookingsHistory',
    props: {
      bookings: Array
    },
    data: () => ({
        
    }),
}
</script>