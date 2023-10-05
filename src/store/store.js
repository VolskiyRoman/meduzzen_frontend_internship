import { createStore } from 'vuex';
import testModule from './modules/testModule';

export default createStore({
    modules: {
        testModule,
    },
});
