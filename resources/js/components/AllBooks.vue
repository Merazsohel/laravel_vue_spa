<template>
    <div>
        <h3 class="text-center">All Books</h3><br/>

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="book in books" :key="book.id">
                <td>{{ book.name }}</td>
                <td>{{ book.author }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <router-link :to="{name: 'edit', params: { id: book.id }}" class="btn btn-primary">Edit
                        </router-link>
                       <!-- <button class="btn btn-danger" @click="deleteBook(book.id)">Delete</button>-->
                        <button class="btn btn-danger" @click="deleteBook(book.id)">Delete</button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                books: []
            }
        },
        created() {
            this.axios
                .get('http://localhost:8001/api/books')
                .then(response => {
                    this.books = response.data;
                });
        },
        methods: {
            /*deleteBook(id) {
                this.axios
                    .delete(`http://localhost:8001/api/book/delete/${id}`)
                    .then(response => {
                        let i = this.books.map(item => item.id).indexOf(id); // find index of your object
                        this.books.splice(i, 1);
                        this.$toastr.s("Successfully Deleted");
                    });
            },*/

            deleteBook(id) {
                this.$swal({
                    title: 'Are you sure?',
                    text: 'You can\'t revert your action',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes Delete it!',
                    cancelButtonText: 'No, Keep it!',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    if (result.value) {
                        this.axios.delete(`http://localhost:8001/api/book/delete/${id}`);
                        let i = this.books.map(item => item.id).indexOf(id); // find index of your object
                        this.books.splice(i, 1);

                        this.$swal('Deleted', 'Successfully deleted', 'success')
                    } else {
                        this.$swal('Cancelled', 'Your data is still available', 'info')
                    }
                })
            }
        }
    }
</script>
