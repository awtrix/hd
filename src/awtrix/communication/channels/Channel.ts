import Command from '../command'

export default interface Channel {
  open (): Promise<boolean>

  close (): Promise<void>

  /**
   * Sends the given message encoded for the correct channel.
   *
   * @param command
   */
  send(command: Command): Promise<boolean>
}
