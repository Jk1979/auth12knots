<template>
  <div>
        <div class="page-title">
            <h3>Booking history</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <section>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Open</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="book in bookings" :key="book.id">
                        <td>{{book.id}}</td>
                        <td>{{book.amount}}</td>
                        <td>{{book.date|date}}</td>
                        <td>{{book.category.title}}</td>
                        <td>
                            <button class="btn-small btn">
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