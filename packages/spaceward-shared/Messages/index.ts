interface BaseMessage {
  type: string
}

export interface RotateMessage extends BaseMessage {
  type: 'rotate'
  payload: {
    direction: 'left' | 'right'
  }
}

export interface SpeedMessage extends BaseMessage {
  type: 'speed'
  payload: {
    action: 'up' | 'down'
  }
}

export interface ServerMessage extends BaseMessage {
  type: 'servermsg'
  payload: {
    importance: 'low' | 'high'
    content: string
  }
}

export interface TeleportMessage extends BaseMessage {
  type: 'tp'
  payload: {
    x: number
    y: number
  }
}

export interface ShootMessage extends BaseMessage {
  type: 'shoot'
}

export type Message =
  | RotateMessage
  | SpeedMessage
  | ServerMessage
  | TeleportMessage
  | ShootMessage

export const readMessage = (data: any): string | Message => {
  try {
    const json = JSON.parse(data) as Message
    return json
  } catch (error) {
    return error.toString()
  }
}

export const createMessage = (msg: Message) => JSON.stringify(msg)
