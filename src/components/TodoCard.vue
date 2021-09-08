<template>
    <div>
<!--        <vs-button @click="showModal=true" type="flat">-->
            <button class="card-btn" @click="showModal = true">
                <vs-card @click="cardClickHandler">
                    <div slot="header">
                        <h3>
                            {{ todo.name }}
                        </h3>
                    </div>
                    <div>
                        <p>{{ todo.description }}</p>
                    </div>
                    <div slot="footer">
                        <vs-row vs-justify="flex-end">
                            <!--                <vs-button type="gradient" color="danger" icon="favorite"></vs-button>-->
                            <!--                <vs-button color="primary" icon="turned_in_not"></vs-button>-->
                            <!--                <vs-button color="rgb(230,230,230)" color-text="rgb(50,50,50)" icon="settings"></vs-button>-->
                        </vs-row>
                    </div>
                </vs-card>
            </button>

<!--        </vs-button>-->
        <vs-popup dir="rtl" class="holamundo" :button-close-hidden="true" title="ویرایش کار"
                  :active.sync="showModal">
            <form @submit.prevent="() => showModal = editTodoWork(editTodo, payload)" >
                <vs-input class="todo-input" label-placeholder="عنوان" v-model="payload.name"/>
                <vs-input class="todo-input" type="custom" label-placeholder="توضیحات" v-model="payload.description"/>
                <vs-select
                        class="todo-input"
                        label="وضعیت"
                        v-model="payload.status"
                        icon=""
                >
                    <vs-select-item :key="0" :value="0" text="شروع نشده"/>
                    <vs-select-item :key="1" :value="1" text="در حال انجام"/>
                    <vs-select-item :key="2" :value="2" text="تمام شده"/>
                </vs-select>
                <div class="form-footer">
                    <vs-button @click="showModal=false" color="danger" type="filled">
                    <span class="addtodo-btn__text">
                        بازگشت
                    </span>
                    </vs-button>
                    <vs-button @click="() => showModal = editTodoWork(editTodo, payload)" color="success" type="border">
                    <span class="addtodo-btn__text">
                        ویرایش
                    </span>
                    </vs-button>
                </div>

            </form>
        </vs-popup>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "TodoCard",
        props: ['todo'],

        data() {
            return {
                showModal: false,
                payload: {
                    id: this.todo.id,
                    name: this.todo.name,
                    description: this.todo.description,
                    status: this.todo.status
                }
            }
        },

        methods: {
            ...mapActions([
                'editTodo'
            ]),

            cardClickHandler: () => {
                console.log('yes');
            },

            editTodoWork: (editTodo, payload) => {
                editTodo(payload);
            }
        },

        computed: {}
    }
</script>

<style lang="scss" scoped>

    .card-btn {
        border: 0;
        width: 100%;
    }

    .card-btn:hover {
        cursor: pointer;
    }

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