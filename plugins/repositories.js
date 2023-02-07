import createRepository from '/repositories/Repository';

import Vue from 'vue'
export default (ctx, inject) => {

  inject('uow', createRepository(ctx.$axios))
}
