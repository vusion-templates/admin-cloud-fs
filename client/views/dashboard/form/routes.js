import Form from './index.vue';
import Fields from './fields.vue';
import Validation from './validation.vue';

export default {
    path: 'form',
    component: Form,
    children: [
        { path: '', redirect: 'fields' },
        { path: 'fields', component: Fields },
        { path: 'validation', component: Validation },
    ],
};
