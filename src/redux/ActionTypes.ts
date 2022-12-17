const DATA = '_DATA';
const UI = '_UI';

const TODO = 'TODO';

export const ActionTypes = {
    TODO: {
        DATA: {
            SET_TODOS: TODO + DATA + '_SET_TODOS',
        }, 
        UI: {
            SET_TODOS: TODO + UI + '_SET_TODOS',
        }
    }
};
