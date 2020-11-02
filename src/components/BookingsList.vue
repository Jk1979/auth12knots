<template>
  <div>
       

        <section>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Request Date</th>
                        <th>On hold</th>
                        <th>Client</th>
                        <th>Operator</th>
                        <th>Boat Model</th>
                        <th>Name</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Country</th>
                        <th>Base</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Manager</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="book in bookings" :key="book.id">
                        <td>{{book.id}}</td>
                        <td>{{book.type}}</td>
                        <td>{{book.request_date|date}}</td>
                        <td>{{book.onhold_date|date}}</td>
                        <td>{{book.client.name}}</td>
                        <td>{{book.operator_name || book.operator_id}}</td>
                        <td>{{book.boat.model}}</td>
                        <td>{{book.boat.name}}</td>
                        <td>{{book.checkin|date}}</td>
                        <td>{{book.checkout|date}}</td>
                        <td>{{book.country}}</td>
                        <td>{{book.base}}</td>
                        <td>{{book.price|currency('EUR')}}</td>
                        <td>{{book.status}}</td>
                        <td>{{book.manager_name || book.manager_id}}</td>
                        <td>
                            <button class="btn-small btn" @click="$router.push('/detail/'+ book.id)" v-tooltip="book.client.name">
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
    name: 'bookingsList',
    props: {
      bookings: Array
    },
    data: () => ({
        
    }),
}
</script>