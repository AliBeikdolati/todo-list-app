<template>
    <div>
        <vs-button @click="showModal=true" color="dark" type="flat">
                    <span class="addtodo-btn__text">
                        افزودن کار
                        <plus-icon size="1x" class="custom-class"></plus-icon>
                    </span>
        </vs-button>
        <vs-popup dir="rtl" class="holamundo" :button-close-hidden="true"  title="افزودن کار جدید" :active.sync="showModal">
            <form @submit.prevent="() => showModal = addTodoWork(addTodos, payload)">
                <vs-input class="todo-input" label-placeholder="عنوان" v-model="payload.name"/>
                <vs-input class="todo-input" type="custom" label-placeholder="توضیحات" v-model="payload.description"/>
                <vs-select
                        class="todo-input"
                        label="وضعیت"
                        v-model="payload.status"
                        icon=""
                >
                    <vs-select-item :key="0" :value="0" text="شروع نشده" />
                    <vs-select-item :key="1" :value="1" text="در حال انجام" />
                    <vs-select-item :key="2" :value="2" text="تمام شده" />
                </vs-select>
                <div class="form-footer">
                    <vs-button @click="showModal=false" color="danger" type="filled">
                    <span class="addtodo-btn__text">
                        بازگشت
                    </span>
                    </vs-button>
                    <vs-button @click="() => showModal = addTodoWork(addTodos, payload)" color="success" type="border">
                    <span class="addtodo-btn__text">
                        افزودن کار
                    </span>
                    </vs-button>
                </div>

            </form>
        </vs-popup>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { PlusIcon } from 'vue-feather-icons';

    export default {
        name: "AddTodo",
        components: {
            PlusIcon
        },

        data() {
            return {
                showModal: false,
                payload: {
                    name: '',
                    description: '',
                    status: 0
                }
            }
        },

        methods: {
            ...mapActions([
                "addTodos"
            ]),

            addTodoWork: (addTodos, payload) => {
                console.log("1");
                console.log(payload);
                addTodos(payload);
                payload = {
                    name: '',
                    description: '',
                    status: 0
                };

                return false;
                // this.showModal = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .todo-input {
        width: 90%;
        margin: 35px auto;
    }

    .form-footer {
        width: 90%;
        text-align: center;

        button {
            margin: auto 5px;
        }
    }

</style>