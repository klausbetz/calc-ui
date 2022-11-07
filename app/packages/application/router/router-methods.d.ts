import 'vue-router'

declare module 'vue-router' {
  interface Router {
    pushSettings(): ReturnType<Router['push']>
    resolveSettings(): ReturnType<Router['resolve']>

    pushHome(): ReturnType<Router['push']>
    resolveHome(): ReturnType<Router['resolve']>
    replaceHome(): ReturnType<Router['replace']>
  }
}
