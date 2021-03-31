import Container from '../app/Container'

export default class Context {
  private static instance: Context

  private constructor( ) {}

  public static getInstance (): Context {
    if (!Context.instance) {
      Context.instance = new Context
    }

    return Context.instance
  }

  public container?: Container
  public database?: NonNullable<typeof Container.prototype.database>
}
