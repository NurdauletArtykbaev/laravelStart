<template>
    <div class="container">
        <div v-if="!$gate.isAdminOrAuthor()"><not-found></not-found></div>

        <div class="row mt-5" v-if="$gate.isAdminOrAuthor()">
            <div class="col-md-12">
<!--                <div class="card" v-if="$gate.isAdmin()">-->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" @click="newModal">
                                Add New <i class="fas fa-user-plus fa-fw"></i>
                            </button>

                        </div>
                    </div>
                    <!-- /.box-header -->
                    <div class="card-body table-responsive no-padding">
                        <table class="table table-hover">
                            <tbody><tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Registered At</th>
                                <th>Modify</th>
                            </tr>
                            <tr v-for="user in users.data" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td><span class="label label-success">{{ user.type | upText }}</span></td>
                                <td>{{ user.created_at | myDate }}</td>
                                <td>
                                    <a href="#" @click="editModal(user)"><i class="fa fa-edit"></i> </a>
                                    /
                                    <a href="#" @click="deleteUser(user.id)"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            </tbody></table>
                    </div>
                    <div class="card-footer" style="position:center;">
                        <pagination :data="users" @pagination-change-page="getResults"></pagination>

                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="AddNew" tabindex="-1" role="dialog" aria-labelledby="AddNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="!editMode" id="AddNewLabel">Create User</h5>
                        <h5 class="modal-title" v-show="editMode" id="AddNewLabel">Update Info Users</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode ? updateUser() : createUser()">

                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" type="text" class="form-control" id="name"
                                   name="name"
                                   :class="{ 'is-invalid': form.errors.has('name') }"
                                   placeholder="Name">
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.email" type="email" class="form-control" id="email"
                                   name="email"
                                   :class="{ 'is-invalid': form.errors.has('email') }"
                                   placeholder="Email Address">
                            <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.bio" type="text" class="form-control" id="bio"
                                   name="bio"
                                   :class="{ 'is-invalid': form.errors.has('bio') }"
                                      placeholder="Short bio for user (Optional)"></textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>

                        <div class="form-group">
                            <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="author">Author</option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.password" type="password" class="form-control" id="password"
                                   name="password"
                                   :class="{ 'is-invalid': form.errors.has('password') }"
                                   placeholder="Password">
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" v-show="!editMode" class="btn btn-primary">Create</button>
                        <button type="submit" v-show="editMode" class="btn btn-success">Update</button>
                    </div>

                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                editMode: false,
                users: {},
                search:'',
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: '',
                })
            }

        },

        methods: {
            searching(){

            },
            getResults(page = 1) {
                axios.get('api/user?page=' + page)
                    .then(response => {
                        // console.log(response.data)
                        this.users = response.data;
                    });
            },
            updateUser(){
                this.$Progress.start();
                this.form.put('api/user/' + this.form.id)
                    .then(()=> {
                        eventHub.$emit('AfterCreate');
                            $('#AddNew').modal('hide');

                            swal.fire(
                                'Updated!',
                                'Information been updated.',
                                'success'
                            );
                            this.$Progress.finish()
                    })
                    .catch(() =>  this.$Progress.fail()
                    )
            },
            editModal(user){
                this.editMode = true;
                this.form.reset();

                $('#AddNew').modal('show');
                this.form.fill(user)

            },
            newModal(){
                this.editMode = false;
                this.form.reset();
                $('#AddNew').modal('show');
            },
            loadUsers(){
                // if (this.$gate.isAdmin() || this.$gate.isAuthor())
                if (this.$gate.isAdminOrAuthor()) {
                    axios.get('api/user').then(({data}) => (this.users = data));
                }
            },

            createUser(){
                this.$Progress.start();
                this.form.post('api/user')
                .then(() =>
                    {eventHub.$emit('AfterCreate');

                    $('#AddNew').modal('hide');
                    toast.fire({
                        icon: 'success',
                        title: 'Create User in successfully'
                    });

                    this.$Progress.finish();}
                )
                .catch(this.$Progress.fail());


            },
            deleteUser(id){
                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.form.delete('api/user/' + id)
                            .then(() =>
                                eventHub.$emit('AfterCreate'),
                                swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            )
                            .catch(() =>
                                swal.fire(
                                    'error',
                                    'Oops...',
                                    'error'
                                )
                            )
                    }
                })

            },
        },
        created() {
            this.loadUsers();
            eventHub.$on('AfterCreate',() =>{
                this.loadUsers()});
            // setInterval(() => this.loadUsers(), 3000)

            eventHub.$on('searching', ()=> {
                    let query = this.$parent.search;
                    axios.get('api/findUser?q=' + query)
                        .then((data) => {
                            this.users = data.data;
                            console.log('sss')
                        })
                        .catch(() => {
                            console.log('error')
                        });
                    console.log('searching:', this.search)
                }
            )
        }


    }
</script>

<style scoped>

</style>
