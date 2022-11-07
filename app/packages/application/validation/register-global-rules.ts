import { defineRule } from 'vee-validate'
import AllRules from '@vee-validate/rules'

export function registerGlobalRules() {
  Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule])
  })
}