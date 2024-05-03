declare module '@/components/service/eventBus.js' {
  import mitt from 'mitt'
  const eventBus: mitt.Emitter
  export default eventBus
}
